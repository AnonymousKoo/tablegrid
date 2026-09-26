export type Id = string;
export type IsoDateTime = string;

export type UnitCode =
  | "each"
  | "oz"
  | "lb"
  | "g"
  | "kg"
  | "ml"
  | "l";

export interface Money {
  amount: number;
  currency: string;
}

export interface Organization {
  id: Id;
  name: string;
}

export interface Location {
  id: Id;
  organizationId: Id;
  name: string;
}

export interface Ingredient {
  id: Id;
  organizationId: Id;
  name: string;
  unit: UnitCode;
}

export interface RecipeLine {
  ingredientId: Id;
  quantity: number;
}

export interface Recipe {
  id: Id;
  organizationId: Id;
  name: string;
  yieldQuantity: number;
  lines: RecipeLine[];
}

export interface Product {
  id: Id;
  organizationId: Id;
  name: string;
  recipeId: Id;
  portionsPerUnit: number;
  sellingPrice?: Money;
}

export interface OrderLine {
  productId: Id;
  quantity: number;
}

export interface Order {
  id: Id;
  organizationId: Id;
  locationId: Id;
  placedAt: IsoDateTime;
  lines: OrderLine[];
}

export interface IngredientRequirement {
  ingredientId: Id;
  quantity: number;
}

export interface InventoryPosition {
  ingredientId: Id;
  onHand: number;
  incoming: number;
  safetyStock: number;
}

export interface InventoryProjection {
  ingredientId: Id;
  required: number;
  availableAfterSafetyStock: number;
  shortage: number;
}

export interface SupplierItem {
  ingredientId: Id;
  supplierId: Id;
  packSize: number;
  packCost?: Money;
}

export interface PurchaseRecommendation {
  ingredientId: Id;
  supplierId: Id;
  shortage: number;
  recommendedQuantity: number;
  packs: number;
}

export interface CostBreakdown {
  ingredients: number;
  packaging: number;
  paymentFees: number;
  productionLabor: number;
  fulfillment: number;
}

export interface ItemEconomics {
  sellingPrice: number;
  totalCost: number;
  contribution: number;
  contributionMargin: number;
}
