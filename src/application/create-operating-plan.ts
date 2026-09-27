import {
  calculateIngredientRequirements,
  projectInventory,
  recommendPurchases,
} from "@/domain/operations";
import {
  calculateProductEconomics,
  type IngredientUnitCost,
  type ProductEconomicsResult,
  type ProductOperatingCosts,
} from "@/domain/economics";
import {
  planProduction,
  type ProductionRule,
} from "@/domain/production";
import {
  detectOperationalRisks,
  type OperationalRisk,
} from "@/domain/risks";
import type {
  InventoryPosition,
  Order,
  Product,
  Recipe,
  SupplierItem,
} from "@/domain/model";

export interface CreateOperatingPlanInput {
  orders: Order[];
  products: Product[];
  recipes: Recipe[];
  inventoryPositions: InventoryPosition[];
  supplierItems: SupplierItem[];
  productionRules?: ProductionRule[];
  ingredientCosts?: IngredientUnitCost[];
  productOperatingCosts?: ProductOperatingCosts[];
  lowMarginThreshold?: number;
}

export interface OperatingPlan {
  requirements: ReturnType<typeof calculateIngredientRequirements>;
  inventory: ReturnType<typeof projectInventory>;
  purchases: ReturnType<typeof recommendPurchases>;
  production: ReturnType<typeof planProduction>;
  economics: ProductEconomicsResult[];
  risks: OperationalRisk[];
  coverage: {
    products: number;
    productsWithEconomics: number;
  };
}

export function createOperatingPlan(
  input: CreateOperatingPlanInput,
): OperatingPlan {
  const requirements = calculateIngredientRequirements(
    input.orders,
    input.products,
    input.recipes,
  );

  const inventory = projectInventory(
    requirements,
    input.inventoryPositions,
  );

  const purchases = recommendPurchases(
    inventory,
    input.supplierItems,
  );

  const production = planProduction(
    input.orders,
    input.products,
    input.productionRules,
  );

  const recipeById = new Map(
    input.recipes.map((recipe) => [recipe.id, recipe]),
  );
  const costByIngredient = new Map(
    (input.ingredientCosts ?? []).map((cost) => [
      cost.ingredientId,
      cost,
    ]),
  );
  const operatingCostByProduct = new Map(
    (input.productOperatingCosts ?? []).map((cost) => [
      cost.productId,
      cost,
    ]),
  );

  const economics: ProductEconomicsResult[] = [];

  for (const product of input.products) {
    if (!product.sellingPrice) continue;

    const recipe = recipeById.get(product.recipeId);
    if (!recipe) continue;

    const recipeCosts = recipe.lines.map((line) =>
      costByIngredient.get(line.ingredientId),
    );
    if (recipeCosts.some((cost) => !cost)) continue;

    economics.push(
      calculateProductEconomics({
        product,
        recipe,
        ingredientCosts: recipeCosts.filter(
          (cost): cost is IngredientUnitCost => Boolean(cost),
        ),
        operatingCosts: operatingCostByProduct.get(product.id),
      }),
    );
  }

  const risks = detectOperationalRisks({
    inventory,
    purchases,
    economics,
    lowMarginThreshold: input.lowMarginThreshold,
  });

  return {
    requirements,
    inventory,
    purchases,
    production,
    economics,
    risks,
    coverage: {
      products: input.products.length,
      productsWithEconomics: economics.length,
    },
  };
}
