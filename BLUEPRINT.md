# Blueprint: Analytics Dashboard (Proyecto 09)

## 📌 Resumen del Proyecto

Panel de análisis de ventas para un e-commerce ficticio. Visualiza métricas clave (ingresos, pedidos, ticket medio, clientes) con gráficos de Recharts y tablas de datos, aplicando filtros por periodo y categoría. Profundiza en visualización de datos, modelado SQL teórico (DER) y tooling moderno de data fetching y testing.

## 🛠️ Stack Tecnológico

- **Core:** React 19, TypeScript, Vite 8
- **Estilos:** Tailwind CSS 4, Lucide React (iconos)
- **Gráficos:** Recharts 3
- **Data fetching:** TanStack Query 5
- **Tablas:** TanStack Table 8
- **Fechas:** date-fns 4
- **Estado:** Zustand 5 (filtros compartidos)
- **Datos:** Mock-first (`services/mockApi.ts`), sin backend real
- **Base de Datos (Teórica):** Esquema SQL y DER (MySQL 8.4 LTS)
- **Testing:** Vitest + Testing Library + MSW
- **CI/CD:** GitHub Actions (lint + typecheck + test + build)
- **Calidad:** oxlint, Prettier, Husky, lint-staged

---

## 🗺️ Roadmap y Milestones (19 Issues)

### Milestone 1: Fundación y Arquitectura

- **#1** Set up initial project structure ✅
- **#2** Create design tokens, colors and typography ✅
- **#3** Create base folder structure and UI primitives ✅
- **#4** Design SQL schema and ER diagram ✅

### Milestone 2: Core features

- **#5** Create mock data and mock API service ✅
- **#22** Build main dashboard layout (header + sidebar + content)
- **#23** Integrate TanStack Query for data fetching
- **#24** Set up GitHub Actions CI workflow
- **#6** Build KPI metric cards
- **#7** Build time-series revenue chart
- **#8** Build category breakdown charts
- **#9** Build sortable metrics data table (TanStack Table)

### Milestone 3: Interactions and quality

- **#10** Implement date range and category filters (Zustand + date-fns)
- **#11** Handle loading, error and empty states (TanStack Query + ErrorBoundary)
- **#12** Polish responsive mobile-first layout
- **#13** Accessibility pass
- **#14** Add unit and component tests (Vitest + Testing Library + MSW)

### Milestone 4: Documentation and release

- **#15** Generate automated screenshots
- **#16** Write final README, DECISIONS and deploy

---

## 🎨 Dominio y Modelo de Datos

Tablas: `customers`, `products`, `categories`, `orders`, `order_items`.

Métricas derivadas: ingresos, pedidos, ticket medio, clientes activos, top productos, ventas por categoría.
