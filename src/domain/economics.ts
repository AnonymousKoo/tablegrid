import type {
  CostBreakdown,
  Id,
  ItemEconomics,
  Product,
  Recipe,
} from "./model";

export interface IngredientUnitCost {
  ingredientId: Id;
  costPerUnit: number;
}

export interface ProductOperatingCosts {
  productId: Id;
  packaging: number;
  paymentFees: number;
  productionLabor: number;
  fulfillment: number;
}

export interface ProductEconomicsResult extends ItemEconomics {
  productId: Id;
  ingredientCost: number;
}

export function calculateRecipeIngredientCost(
  recipe: Recipe,
  costs: IngredientUnitCost[],
): number {
  const costByIngredient = new Map(
    costs.map((cost) => [cost.ingredientId, cost.costPerUnit]),
  );

  return recipe.lines.reduce((total, line) => {
    const unitCost = costByIngredient.get(line.ingredientId);
    if (unitCost === undefined) {
      throw new Error(`Missing ingredient cost: ${line.ingredientId}`);
    }
    return total + line.quantity * unitCost;
  }, 0);
}

export function calculateProductEconomics(input: {
  product: Product;
  recipe: Recipe;
  ingredientCosts: IngredientUnitCost[];
  operatingCosts?: ProductOperatingCosts;
}): ProductEconomicsResult {
  if (!input.product.sellingPrice) {
    throw new Error(`Missing selling price: ${input.product.id}`);
  }
  if (input.recipe.yieldQuantity <= 0) {
    throw new Error(`Recipe yield must be positive: ${input.recipe.id}`);
  }

  const recipeCost = calculateRecipeIngredientCost(
    input.recipe,
    input.ingredientCosts,
  );

  const ingredientCost =
    (recipeCost / input.recipe.yieldQuantity) * input.product.portionsPerUnit;

  const other = input.operatingCosts ?? {
    productId: input.product.id,
    packaging: 0,
    paymentFees: 0,
    productionLabor: 0,
    fulfillment: 0,
  };

  const costs: CostBreakdown = {
    ingredients: ingredientCost,
    packaging: other.packaging,
    paymentFees: other.paymentFees,
    productionLabor: other.productionLabor,
    fulfillment: other.fulfillment,
  };

  const totalCost =
    costs.ingredients +
    costs.packaging +
    costs.paymentFees +
    costs.productionLabor +
    costs.fulfillment;
  const sellingPrice = input.product.sellingPrice.amount;
  const contribution = sellingPrice - totalCost;

  return {
    productId: input.product.id,
    ingredientCost,
    sellingPrice,
    totalCost,
    contribution,
    contributionMargin: sellingPrice === 0 ? 0 : contribution / sellingPrice,
  };
}
