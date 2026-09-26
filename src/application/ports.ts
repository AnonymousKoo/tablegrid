import type {
  InventoryPosition,
  Order,
  Product,
  Recipe,
  SupplierItem,
} from "@/domain/model";

export interface OperatingDataPort {
  getOrders(): Promise<Order[]>;
  getProducts(): Promise<Product[]>;
  getRecipes(): Promise<Recipe[]>;
  getInventoryPositions(): Promise<InventoryPosition[]>;
  getSupplierItems(): Promise<SupplierItem[]>;
}

export interface OperatingResultPort {
  saveDemandProjection(input: unknown): Promise<void>;
  savePurchaseRecommendations(input: unknown): Promise<void>;
}

export interface ClockPort {
  now(): Date;
}
