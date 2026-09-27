import { describe, expect, it } from "vitest";
import {
  calculateIngredientRequirements,
  projectInventory,
  recommendPurchases,
} from "@/domain/operations";
import {
  buildInventoryPositionFromLedger,
  calculateOnHand,
  type InventoryMovement,
} from "@/domain/inventory";
import { planProduction } from "@/domain/production";
import {
  calculateProductEconomics,
  calculateRecipeIngredientCost,
} from "@/domain/economics";
import { detectOperationalRisks } from "@/domain/risks";
import type {
  Order,
  Product,
  Recipe,
} from "@/domain/model";

const product: Product = {
  id: "product-bowl",
  organizationId: "org-1",
  name: "Chicken Bowl",
  recipeId: "recipe-bowl",
  portionsPerUnit: 1,
  sellingPrice: { amount: 16, currency: "USD" },
};

const recipe: Recipe = {
  id: "recipe-bowl",
  organizationId: "org-1",
  name: "Chicken Bowl Recipe",
  yieldQuantity: 10,
  lines: [
    { ingredientId: "chicken", quantity: 5 },
    { ingredientId: "rice", quantity: 3 },
  ],
};

const order: Order = {
  id: "order-1",
  organizationId: "org-1",
  locationId: "kitchen-1",
  placedAt: "2026-09-27T08:00:00-04:00",
  lines: [{ productId: product.id, quantity: 100 }],
};

describe("demand and purchasing rules", () => {
  it("translates product demand into ingredient requirements", () => {
    const requirements = calculateIngredientRequirements(
      [order],
      [product],
      [recipe],
    );

    expect(requirements).toEqual(
      expect.arrayContaining([
        { ingredientId: "chicken", quantity: 50 },
        { ingredientId: "rice", quantity: 30 },
      ]),
    );
  });

  it("protects safety stock and rounds purchasing to supplier pack size", () => {
    const inventory = projectInventory(
      [{ ingredientId: "chicken", quantity: 50 }],
      [{
        ingredientId: "chicken",
        onHand: 20,
        incoming: 10,
        safetyStock: 4,
      }],
    );

    expect(inventory[0]).toMatchObject({
      availableAfterSafetyStock: 26,
      shortage: 24,
    });

    const purchases = recommendPurchases(inventory, [{
      ingredientId: "chicken",
      supplierId: "supplier-1",
      packSize: 10,
    }]);

    expect(purchases[0]).toMatchObject({
      shortage: 24,
      packs: 3,
      recommendedQuantity: 30,
    });
  });
});

describe("inventory ledger", () => {
  const movements: InventoryMovement[] = [
    {
      id: "m1",
      organizationId: "org-1",
      locationId: "kitchen-1",
      ingredientId: "chicken",
      kind: "receive",
      quantity: 60,
      occurredAt: "2026-09-26T09:00:00-04:00",
    },

    {
      id: "m2",
      organizationId: "org-1",
      locationId: "kitchen-1",
      ingredientId: "chicken",
      kind: "consume",
      quantity: 10,
      occurredAt: "2026-09-26T12:00:00-04:00",
    },
    {
      id: "m3",
      organizationId: "org-1",
      locationId: "kitchen-1",
      ingredientId: "chicken",
      kind: "waste",
      quantity: 2,
      occurredAt: "2026-09-26T14:00:00-04:00",
    },
    {
      id: "m4",
      organizationId: "org-1",
      locationId: "kitchen-1",
      ingredientId: "chicken",
      kind: "adjust_in",
      quantity: 1,
      occurredAt: "2026-09-26T15:00:00-04:00",
    },
  ];

  it("derives on-hand stock from immutable movements", () => {
    expect(calculateOnHand(movements, "chicken", "kitchen-1")).toBe(49);
  });

  it("builds an inventory position from the ledger", () => {
    expect(
      buildInventoryPositionFromLedger({
        movements,
        ingredientId: "chicken",
        locationId: "kitchen-1",
        incoming: 10,
        safetyStock: 4,
      }),
    ).toEqual({
      ingredientId: "chicken",
      onHand: 49,
      incoming: 10,
      safetyStock: 4,
    });
  });
});

describe("production and economics", () => {
  it("rounds production into valid batches", () => {
    const smallOrder = { ...order, lines: [{ productId: product.id, quantity: 17 }] };
    const plan = planProduction(
      [smallOrder],
      [product],
      [{ productId: product.id, batchSize: 8 }],
    );

    expect(plan[0]).toMatchObject({
      orderedUnits: 17,
      batches: 3,
      plannedUnits: 24,
      excessUnits: 7,
    });
  });

  it("calculates recipe and product contribution economics", () => {
    const ingredientCosts = [
      { ingredientId: "chicken", costPerUnit: 2 },
      { ingredientId: "rice", costPerUnit: 1 },
    ];

    expect(calculateRecipeIngredientCost(recipe, ingredientCosts)).toBe(13);

    const economics = calculateProductEconomics({
      product,
      recipe,
      ingredientCosts,
      operatingCosts: {
        productId: product.id,
        packaging: 0.8,
        paymentFees: 0.5,
        productionLabor: 1.6,
        fulfillment: 0.7,
      },
    });

    expect(economics.ingredientCost).toBeCloseTo(1.3);
    expect(economics.totalCost).toBeCloseTo(4.9);
    expect(economics.contribution).toBeCloseTo(11.1);
    expect(economics.contributionMargin).toBeCloseTo(0.69375);
  });

  it("raises a critical risk when a shortage has no supplier path", () => {
    const risks = detectOperationalRisks({
      inventory: [{
        ingredientId: "chicken",
        required: 50,
        availableAfterSafetyStock: 20,
        shortage: 30,
      }],
      purchases: [],
    });

    expect(risks[0]).toMatchObject({
      code: "SHORTAGE_WITHOUT_SUPPLIER",
      severity: "critical",
      subjectId: "chicken",
    });
  });
});
