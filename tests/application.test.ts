import { describe, expect, it } from "vitest";
import { createOperatingPlan } from "@/application/create-operating-plan";
import type { Order, Product, Recipe } from "@/domain/model";

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

describe("createOperatingPlan", () => {
  it("turns demand into one complete operating decision package", () => {
    const plan = createOperatingPlan({
      orders: [order],
      products: [product],
      recipes: [recipe],
      inventoryPositions: [
        {
          ingredientId: "chicken",
          onHand: 20,
          incoming: 10,
          safetyStock: 4,
        },
        {
          ingredientId: "rice",
          onHand: 40,
          incoming: 0,
          safetyStock: 5,
        },
      ],
      supplierItems: [
        {
          ingredientId: "chicken",
          supplierId: "supplier-1",
          packSize: 10,
        },
      ],
      productionRules: [
        {
          productId: product.id,
          batchSize: 24,
        },
      ],
      ingredientCosts: [
        { ingredientId: "chicken", costPerUnit: 2 },
        { ingredientId: "rice", costPerUnit: 1 },
      ],
      productOperatingCosts: [
        {
          productId: product.id,
          packaging: 0.8,
          paymentFees: 0.5,
          productionLabor: 1.6,
          fulfillment: 0.7,
        },
      ],
    });

    expect(plan.requirements).toEqual(
      expect.arrayContaining([
        { ingredientId: "chicken", quantity: 50 },
        { ingredientId: "rice", quantity: 30 },
      ]),
    );

    expect(plan.inventory.find((item) => item.ingredientId === "chicken"))
      .toMatchObject({ shortage: 24 });

    expect(plan.purchases).toEqual([
      expect.objectContaining({
        ingredientId: "chicken",
        packs: 3,
        recommendedQuantity: 30,
      }),
    ]);

    expect(plan.production[0]).toMatchObject({
      orderedUnits: 100,
      batches: 5,
      plannedUnits: 120,
      excessUnits: 20,
    });

    expect(plan.economics[0]).toMatchObject({
      productId: product.id,
      sellingPrice: 16,
    });

    expect(plan.coverage).toEqual({
      products: 1,
      productsWithEconomics: 1,
    });

    expect(plan.risks).toEqual([
      expect.objectContaining({
        code: "INVENTORY_SHORTAGE",
        subjectId: "chicken",
      }),
    ]);
  });
});
