# TableGrid

TableGrid is the thin operating layer for food businesses.

This repository contains the public TableGrid experience plus the proprietary **food-business domain logic** and **application logic** that Avuhz will orchestrate once Avuhz is ready.

## What we are building now

- Public outcome-led TableGrid website
- Interactive operating-view demo
- Sample Operating Blueprint intake using real application logic
- Food-business domain model
- Deterministic domain rules
- Application use cases
- Ports/interfaces for future adapters
- Operating blueprint logic
- Demand → recipe → ingredient requirement logic
- Inventory movement ledger + projection
- Purchasing recommendations
- Production batch planning
- Item economics and contribution margin
- Operational risk detection
- End-to-end operating-plan use case
- Automated domain/application tests

## What we are not building here

TableGrid is **not** becoming another orchestration platform.

For now we are intentionally deferring:

- workflow engine
- autonomous agents
- scheduling/orchestration
- generic automation infrastructure
- production integrations
- database-specific repositories
- notification infrastructure

Those capabilities can be connected later, with Avuhz owning orchestration.

## Architecture

```text
TableGrid website / future app
            |
            v
     application/
     use cases
            |
            v
        domain/
 food-business rules
            |
            v
         ports
            |
     future adapters
            |
           Avuhz
```

The domain layer must remain usable without Avuhz. Avuhz will eventually invoke TableGrid application use cases; it should not contain TableGrid's food-business rules.

See [docs/architecture.md](docs/architecture.md) for the boundary in more detail.

## Current first vertical slice

```text
Orders
  → Products
  → Recipes
  → Ingredient requirements
  → Inventory projection
  → Shortage calculation
  → Purchase recommendation
  → Production plan
  → Product economics
  → Operational risks
```

## Run locally

```bash
npm install
npm run dev
```

## Validate

```bash
npm test
npm run lint
npm run build
```

## Stack

Next.js 16, React, TypeScript, and Tailwind CSS.
