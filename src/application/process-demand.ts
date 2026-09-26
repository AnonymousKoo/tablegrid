import {
  calculateIngredientRequirements,
  projectInventory,
  recommendPurchases,
} from "@/domain/operations";
import type { OperatingDataPort } from "./ports";

export async function processDemand(data: OperatingDataPort) {
  const [orders, products, recipes, positions, supplierItems] =
    await Promise.all([
      data.getOrders(),
      data.getProducts(),
      data.getRecipes(),
      data.getInventoryPositions(),
      data.getSupplierItems(),
    ]);

  const requirements = calculateIngredientRequirements(
    orders,
    products,
    recipes,
  );

  const inventoryProjection = projectInventory(requirements, positions);

  const purchaseRecommendations = recommendPurchases(
    inventoryProjection,
    supplierItems,
  );

  return {
    requirements,
    inventoryProjection,
    purchaseRecommendations,
  };
}
