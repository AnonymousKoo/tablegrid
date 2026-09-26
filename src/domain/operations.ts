import type {
  CostBreakdown,
  IngredientRequirement,
  InventoryPosition,
  InventoryProjection,
  ItemEconomics,
  Order,
  Product,
  PurchaseRecommendation,
  Recipe,
  SupplierItem,
} from "./model";

export function calculateIngredientRequirements(
  orders: Order[],
  products: Product[],
  recipes: Recipe[],
): IngredientRequirement[] {
  const productById = new Map(products.map((product) => [product.id, product]));
  const recipeById = new Map(recipes.map((recipe) => [recipe.id, recipe]));
  const totals = new Map<string, number>();

  for (const order of orders) {
    for (const line of order.lines) {
      const product = productById.get(line.productId);
      if (!product) throw new Error(`Unknown product: ${line.productId}`);

      const recipe = recipeById.get(product.recipeId);
      if (!recipe) throw new Error(`Unknown recipe: ${product.recipeId}`);
      if (recipe.yieldQuantity <= 0) throw new Error(`Recipe yield must be positive: ${recipe.id}`);

      const yieldMultiplier =
        (line.quantity * product.portionsPerUnit) / recipe.yieldQuantity;

      for (const recipeLine of recipe.lines) {
        const current = totals.get(recipeLine.ingredientId) ?? 0;
        totals.set(
          recipeLine.ingredientId,
          current + recipeLine.quantity * yieldMultiplier,
        );
      }
    }
  }

  return [...totals.entries()].map(([ingredientId, quantity]) => ({
    ingredientId,
    quantity,
  }));
}

export function projectInventory(
  requirements: IngredientRequirement[],
  positions: InventoryPosition[],
): InventoryProjection[] {
  const positionByIngredient = new Map(
    positions.map((position) => [position.ingredientId, position]),
  );

  return requirements.map((requirement) => {
    const position = positionByIngredient.get(requirement.ingredientId) ?? {
      ingredientId: requirement.ingredientId,
      onHand: 0,
      incoming: 0,
      safetyStock: 0,
    };

    const availableAfterSafetyStock =
      position.onHand + position.incoming - position.safetyStock;

    return {
      ingredientId: requirement.ingredientId,
      required: requirement.quantity,
      availableAfterSafetyStock,
      shortage: Math.max(requirement.quantity - availableAfterSafetyStock, 0),
    };
  });
}

export function recommendPurchases(
  projections: InventoryProjection[],
  supplierItems: SupplierItem[],
): PurchaseRecommendation[] {
  const supplierByIngredient = new Map(
    supplierItems.map((item) => [item.ingredientId, item]),
  );

  return projections.flatMap((projection) => {
    if (projection.shortage <= 0) return [];

    const supplierItem = supplierByIngredient.get(projection.ingredientId);
    if (!supplierItem) return [];
    if (supplierItem.packSize <= 0) {
      throw new Error(`Supplier pack size must be positive: ${projection.ingredientId}`);
    }

    const packs = Math.ceil(projection.shortage / supplierItem.packSize);

    return [{
      ingredientId: projection.ingredientId,
      supplierId: supplierItem.supplierId,
      shortage: projection.shortage,
      recommendedQuantity: packs * supplierItem.packSize,
      packs,
    }];
  });
}

export function calculateItemEconomics(
  sellingPrice: number,
  costs: CostBreakdown,
): ItemEconomics {
  const totalCost =
    costs.ingredients +
    costs.packaging +
    costs.paymentFees +
    costs.productionLabor +
    costs.fulfillment;

  const contribution = sellingPrice - totalCost;

  return {
    sellingPrice,
    totalCost,
    contribution,
    contributionMargin: sellingPrice === 0 ? 0 : contribution / sellingPrice,
  };
}
