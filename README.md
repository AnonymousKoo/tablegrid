# TableGrid

TableGrid is the thin operating layer for food businesses.

This repository currently contains the public marketing website. It is intentionally separate from the deeper food-platform domain logic and is designed to explain the outcome TableGrid creates: a connected operating picture from demand through profit.

## Current scope

- Outcome-led public homepage
- TableGrid brand system and logo
- Illustrative operating dashboard
- Operating-network explainer
- Food-business outcome and use-case sections
- Responsive layout
- Static, deployable Next.js application

## Architecture boundary

The website does **not** own food-business domain logic, workflow execution, inventory truth, forecasting, or automation. Those capabilities belong behind the thin TableGrid experience and can be connected through APIs as the platform matures.

## Run locally

```bash
npm install
npm run dev
```

Then open the local Next.js URL shown in the terminal.

## Validate

```bash
npm run lint
npm run build
```

## Stack

Next.js 16, React, TypeScript, and Tailwind CSS.
