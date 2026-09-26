export interface OperatingBlueprintInput {
  organizationName: string;
  locations: number;
  orderChannels: string[];
  products: number;
  recipesComplete: number;
  recipesTotal: number;
  suppliers: number;
  inventoryLocations: number;
  productionCadence?: string;
  fulfillmentModes: string[];
}

export interface OperatingBlueprint {
  organizationName: string;
  readiness: {
    recipes: number;
  };
  network: {
    locations: number;
    orderChannels: string[];
    products: number;
    suppliers: number;
    inventoryLocations: number;
    productionCadence?: string;
    fulfillmentModes: string[];
  };
  gaps: string[];
}

export function buildOperatingBlueprint(
  input: OperatingBlueprintInput,
): OperatingBlueprint {
  const recipeReadiness =
    input.recipesTotal === 0
      ? 0
      : input.recipesComplete / input.recipesTotal;

  const gaps: string[] = [];

  if (input.recipesComplete < input.recipesTotal) {
    gaps.push(
      `${input.recipesTotal - input.recipesComplete} recipes require completion`,
    );
  }

  if (input.suppliers === 0) {
    gaps.push("No suppliers have been connected");
  }

  if (input.inventoryLocations === 0) {
    gaps.push("No inventory locations have been defined");
  }

  if (!input.productionCadence) {
    gaps.push("Production cadence has not been defined");
  }

  return {
    organizationName: input.organizationName,
    readiness: {
      recipes: recipeReadiness,
    },
    network: {
      locations: input.locations,
      orderChannels: input.orderChannels,
      products: input.products,
      suppliers: input.suppliers,
      inventoryLocations: input.inventoryLocations,
      productionCadence: input.productionCadence,
      fulfillmentModes: input.fulfillmentModes,
    },
    gaps,
  };
}
