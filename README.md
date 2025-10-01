# Virtual Machines — React + TypeScript (Vite)

A React + TypeScript single-page app for managing virtual machines. It features a modern multi-step modal wizard, reusable UI primitives, path aliases, and a clean component structure.

## Tech Stack

- React 18 + TypeScript
- Vite
- React Router
- Redux Toolkit
- Plain CSS with CSS variables for theming

## Getting Started

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm 9+

### Install

```bash
npm install
```

### Development

```bash
npm run dev
```

- Starts Vite dev server at http://localhost:5173 (default)

### Build

```bash
npm run build
```

- Creates a production build in `dist/`

### Preview production build

```bash
npm run preview
```

## Project Structure

```
src/
  assets/                  # SVGs and static assets
  components/
    Checkbox/              # Reusable Checkbox component
    Icon/                  # Icon wrapper around SVG assets
    Input/                 # Floating label Input with stepper & suffix
    RamScale/              # RAM scale visualization with indicator
    VirtualMachines/
      VMWizard/
        VMWizard.tsx
        VMWizard.css
        steps/
          Step1Name.tsx
          Step2GeneralSettings.tsx
  pages/
  store/
  hooks/
  App.tsx
  main.tsx
```

## Path Aliases

TypeScript and Vite use `@` to reference `src/`.

- tsconfig: `"paths": { "@/*": ["src/*"] }`
- vite: `resolve.alias['@'] = fileURLToPath(new URL('./src', import.meta.url))`

Example:

```ts
import { Layout } from '@/components';
import { Dashboard } from '@/pages';
```

## Theming & Global Styles

- Global CSS variables in `src/index.css` for typography and colors:
  - `--brand-primary`, `--brand-primary-hover`
  - `--text-primary`, `--text-secondary`
  - Input states: border, focus, error, placeholder
- Roboto is loaded via Google Fonts in `index.html`.

## Key UI Components

### VMWizard (Modal)

- Multi-step wizard with a sidebar, header, and content area
- Steps: Name (with validation) → General Settings (CPU, RAM, checkbox, RAM scale)

### Input

- Floating label; focus/value-driven
- Number stepper using shared SVG icon
- `suffixWhileTyping` (e.g., `/50 GB`) placed right after typed text
- Error and disabled states

### Checkbox

- Accessible, custom-styled checkbox with hover/focus states

### Icon

- Centralized SVG icon loader (`check`, `check-indeterminate`, `state-layer`, ...)

### RamScale

- Visualizes segments: base (0–16), recommended (16–32), warning (32–50)
- Under-bar labels (0, 16, 32, 50) and overlay bracket with caption
- Movable indicator (`indicator.svg`) reflecting current RAM value

## Troubleshooting

- Node types error: install `@types/node` and ensure `tsconfig.node.json` includes `"types": ["node"]`.
- Path aliases: confirm both Vite alias and TS `paths` are aligned.
- Router “No routes matched”: check nested vs absolute route paths.

## Scripts

- `dev`: start dev server
- `build`: production build
- `preview`: preview built app

---

Maintained with care. Contributions are welcome.
