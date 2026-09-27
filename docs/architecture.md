# TableGrid Architecture

## What we are building now

TableGrid is intentionally limited to two proprietary layers:

1. **Domain logic** — what is true for a food business.
2. **Application logic** — how those domain rules are coordinated into useful business operations.

The public website remains a thin presentation layer.

## What waits for Avuhz

We are not building a workflow engine, autonomous agent runtime, scheduling layer, generic orchestration platform, or automation control plane inside TableGrid.

When Avuhz is ready, it will call TableGrid application use cases and execute the resulting workflows.

TableGrid must therefore stay deterministic and callable without depending on Avuhz.

## Boundary

```text
UI / Website
    |
    v
Application use cases
    |
    v
Food-business domain logic
    |
    v
Ports / interfaces
    |
    +----> future infrastructure adapters
    +----> future Avuhz orchestration
```

## Domain responsibilities

The domain layer owns food-specific rules such as:

- orders to recipe demand
- recipe demand to ingredient requirements
- inventory movement ledger and inventory projection
- shortage calculation
- supplier pack-size rounding
- purchasing recommendations
- recipe completeness
- production requirements and batch planning
- item economics and contribution margin
- operational risk detection
- future forecasting rules
- future waste and variance rules

The domain layer should stay pure where possible: no database calls, no HTTP calls, no UI state, and no Avuhz dependency.

## Application responsibilities

The application layer coordinates domain operations into use cases such as:

- build operating blueprint
- process demand
- project inventory
- recommend purchasing
- plan production
- calculate economics
- detect operational risk

Application code may depend on interfaces (ports), but not on concrete external providers.

## Deferred infrastructure

These are intentionally not being implemented yet:

- database repositories
- authentication
- object storage
- payment plumbing
- email and SMS delivery
- vendor integrations
- queue infrastructure
- workflow orchestration
- autonomous agents

Those are commodity or Avuhz-owned concerns and will be connected later through adapters.

## Current first vertical slice

```text
Orders
  -> Products
  -> Recipes
  -> Ingredient requirements
  -> Inventory projection
  -> Shortage calculation
  -> Purchase recommendation
  -> Production plan
  -> Product economics
  -> Operational risks
```

The operating-blueprint use case is also included as the first onboarding domain/application primitive.
