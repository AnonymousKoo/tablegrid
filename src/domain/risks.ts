import type {
  Id,
  InventoryProjection,
  PurchaseRecommendation,
} from "./model";
import type { ProductEconomicsResult } from "./economics";

export type RiskSeverity = "info" | "warning" | "critical";

export type OperationalRiskCode =
  | "INVENTORY_SHORTAGE"
  | "SHORTAGE_WITHOUT_SUPPLIER"
  | "LOW_MARGIN"
  | "NEGATIVE_MARGIN";

export interface OperationalRisk {
  code: OperationalRiskCode;
  severity: RiskSeverity;
  subjectId: Id;
  message: string;
  recommendedAction: string;
}

export function detectOperationalRisks(input: {
  inventory: InventoryProjection[];
  purchases: PurchaseRecommendation[];
  economics?: ProductEconomicsResult[];
  lowMarginThreshold?: number;
}): OperationalRisk[] {
  const risks: OperationalRisk[] = [];

  const coveredIngredients = new Set(
    input.purchases.map((purchase) => purchase.ingredientId),
  );

  for (const projection of input.inventory) {
    if (projection.shortage <= 0) continue;

    if (!coveredIngredients.has(projection.ingredientId)) {
      risks.push({
        code: "SHORTAGE_WITHOUT_SUPPLIER",
        severity: "critical",
        subjectId: projection.ingredientId,
        message: `Projected shortage of ${projection.shortage} with no purchase path`,
        recommendedAction: "Connect a supplier item or resolve inventory manually",
      });
      continue;
    }

    risks.push({
      code: "INVENTORY_SHORTAGE",
      severity: "warning",
      subjectId: projection.ingredientId,
      message: `Projected shortage of ${projection.shortage}`,
      recommendedAction: "Review the generated purchase recommendation",
    });
  }

  const threshold = input.lowMarginThreshold ?? 0.25;
  for (const item of input.economics ?? []) {
    if (item.contribution < 0) {
      risks.push({
        code: "NEGATIVE_MARGIN",
        severity: "critical",
        subjectId: item.productId,
        message: "Product contribution is negative",
        recommendedAction: "Review price, recipe cost, labor, and fulfillment cost",
      });
    } else if (item.contributionMargin < threshold) {
      risks.push({
        code: "LOW_MARGIN",
        severity: "warning",
        subjectId: item.productId,
        message: `Contribution margin is ${(item.contributionMargin * 100).toFixed(1)}%`,
        recommendedAction: "Review product economics before scaling demand",
      });
    }
  }

  return risks;
}
