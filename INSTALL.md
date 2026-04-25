# Installation & Running

## Prerequisites

- **Node.js** (v22+ recommended)
- **npm** (v11.7+ recommended — this project uses `packageManager: npm@11.7.0`)

## Install Dependencies

```bash
npm install
```

## Development Server

```bash
npm start
```

The app will be served at `http://localhost:4200/`.

## Build

### Development build
```bash
npm run build
```

### Production build
```bash
npm run build -- --configuration production
```

Output goes to `dist/car-rental-system-task/`.

## Watch Mode (rebuilds on file changes)

```bash
npm run watch
```

## Tech Stack

| Layer | Tech |
|-------|------|
| Framework | Angular 21 (standalone components) |
| UI Components | PrimeNG 21 (Aura theme) |
| Styling | Tailwind CSS v4 |
| i18n | ngx-translate (Arabic default / English) |
| State | Angular signals |
| HTTP Client | Angular `HttpClient` with interceptors |

## Project Structure

```
src/app/
├── core/           # interceptors, services, guards, utils
├── domains/
│   ├── admin/      # admin dashboard, cars, users, orders
│   └── customer/   # car catalog, orders, installments
├── public/         # home, login, register
├── shared/         # header, layout, reusable components
└── styles/         # PrimeNG overrides
```

## Environment

API base URL is configured in `src/environments/`:
- `production.ts` → production endpoint
- `development.ts` → development endpoint

Default API: `https://task.abudiyab-soft.com/api`
