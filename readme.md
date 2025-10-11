# Node + Express + TypeScript + Mongoose + Zod + Swagger CLI Tool

A simple CLI tool to quickly generate a full module scaffold for your Node.js/Express + TypeScript project, including interfaces, schemas, validations, controllers, services, routes, and Swagger docs.

---

## Features

- Generates module structure under `src/app/modules/<moduleName>`
- Auto-creates:
  - Interface (`.interface.ts`)
  - Mongoose Schema (`.schema.ts`)
  - Zod validation (`.validation.ts`)
  - Controller (`.controller.ts`)
  - Service (`.service.ts`)
  - Route (`.route.ts`)
  - Swagger documentation (`.swagger.ts`)
- Automatically adds:
  - Module route to `src/routes.ts`
  - Swagger docs to `src/swaggerOptions.ts` at the end of `paths` object

---

## Requirements

- Node.js >= 18
- npm
- TypeScript project setup
- Mongoose
- Zod
- Express
- Swagger setup (optional, but recommended)

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/abumahid/mongo-server-stater-pack.git
cd mongo-server-stater-pack
```

2. Install dependencies:

```bash
npm install
```

3. Copy .env.example to .env and configure your environment variables:
```bash
cp .env.example .env
```

## Create a new module

Use the following command to generate a new module:

```bash
npm run g:m <moduleName>
```

For example:
```bash
npm run g:m order
```

This will create a order module with the following structure:

```bash
src/app/modules/order/
 ├── order.interface.ts
 ├── order.schema.ts
 ├── order.validation.ts
 ├── order.controller.ts
 ├── order.service.ts
 ├── order.route.ts
 └── order.swagger.ts
```

- The route will automatically be added to src/routes.ts.

- Swagger documentation will automatically be added at the end of the paths object in src/swaggerOptions.ts.

`Notes`

- Make sure src/routes.ts and src/swaggerOptions.ts exist before creating a module.

- The CLI avoids duplicate imports and Swagger entries.

- Customize the generated files as needed.

`License`

*MIT © Abumahid Islam*

I hope this CLI tool helps you generate a full module scaffold for your Node.js/Express + TypeScript project. If you have any questions or feedback, please feel free to open an issue on GitHub.
