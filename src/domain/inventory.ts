import type { Id, InventoryPosition, IsoDateTime } from "./model";

export type InventoryMovementKind =
  | "receive"
  | "consume"
  | "waste"
  | "adjust_in"
  | "adjust_out"
  | "transfer_in"
  | "transfer_out";

export interface InventoryMovement {
  id: Id;
  organizationId: Id;
  locationId: Id;
  ingredientId: Id;
  kind: InventoryMovementKind;
  quantity: number;
  occurredAt: IsoDateTime;
  referenceId?: Id;
  note?: string;
}

const inboundKinds = new Set<InventoryMovementKind>([
  "receive",
  "adjust_in",
  "transfer_in",
]);

export function signedMovementQuantity(movement: InventoryMovement): number {
  if (movement.quantity < 0) {
    throw new Error(`Inventory movement quantity cannot be negative: ${movement.id}`);
  }

  return inboundKinds.has(movement.kind)
    ? movement.quantity
    : -movement.quantity;
}

export function calculateOnHand(
  movements: InventoryMovement[],
  ingredientId: Id,
  locationId?: Id,
): number {
  return movements
    .filter(
      (movement) =>
        movement.ingredientId === ingredientId &&
        (!locationId || movement.locationId === locationId),
    )
    .reduce((sum, movement) => sum + signedMovementQuantity(movement), 0);
}

export function buildInventoryPositionFromLedger(input: {
  movements: InventoryMovement[];
  ingredientId: Id;
  locationId?: Id;
  incoming?: number;
  safetyStock?: number;
}): InventoryPosition {
  return {
    ingredientId: input.ingredientId,
    onHand: calculateOnHand(
      input.movements,
      input.ingredientId,
      input.locationId,
    ),
    incoming: input.incoming ?? 0,
    safetyStock: input.safetyStock ?? 0,
  };
}
