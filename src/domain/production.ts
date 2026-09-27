import type { Id, Order, Product } from "./model";

export interface ProductionRule {
  productId: Id;
  batchSize: number;
}

export interface ProductionPlanLine {
  productId: Id;
  orderedUnits: number;
  portionsRequired: number;
  batchSize: number;
  batches: number;
  plannedUnits: number;
  excessUnits: number;
}

export function planProduction(
  orders: Order[],
  products: Product[],
  rules: ProductionRule[] = [],
): ProductionPlanLine[] {
  const productById = new Map(products.map((product) => [product.id, product]));
  const ruleByProduct = new Map(rules.map((rule) => [rule.productId, rule]));
  const demand = new Map<Id, number>();

  for (const order of orders) {
    for (const line of order.lines) {
      demand.set(line.productId, (demand.get(line.productId) ?? 0) + line.quantity);
    }
  }

  return [...demand.entries()].map(([productId, orderedUnits]) => {
    const product = productById.get(productId);
    if (!product) throw new Error(`Unknown product: ${productId}`);

    const rule = ruleByProduct.get(productId);
    const batchSize = rule?.batchSize ?? 1;
    if (batchSize <= 0) {
      throw new Error(`Production batch size must be positive: ${productId}`);
    }

    const batches = Math.ceil(orderedUnits / batchSize);
    const plannedUnits = batches * batchSize;

    return {
      productId,
      orderedUnits,
      portionsRequired: orderedUnits * product.portionsPerUnit,
      batchSize,
      batches,
      plannedUnits,
      excessUnits: plannedUnits - orderedUnits,
    };
  });
}
