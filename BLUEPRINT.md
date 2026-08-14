# Blueprint: Analytics Dashboard (Proyecto 09)

## 📌 Resumen del Proyecto

Panel de análisis de ventas para un e-commerce ficticio. Visualiza métricas clave (ingresos, pedidos, ticket medio, clientes) con gráficos de Recharts y tablas de datos, aplicando filtros por periodo y categoría. El proyecto profundiza en visualización de datos y modelado SQL teórico (DER), sin backend real.

## 🛠️ Stack Tecnológico

- **Core:** React 19, TypeScript, Vite 8
- **Estilos:** Tailwind CSS 4, Lucide React (iconos)
- **Gráficos:** Recharts 3
- **Datos:** Mock-first (`services/mockApi.ts`), sin backend real
- **Base de Datos (Teórica):** Esquema SQL y DER (MySQL 8.4 LTS)
- **Calidad:** oxlint, Prettier, Husky, lint-staged

---

## 🗺️ Roadmap y Milestones (16 Issues Planificadas)

### Milestone 1: Fundación y Arquitectura

- **Issue #1:** Set up initial project structure (Label: `type: chore`, `area: project-setup`)
- **Issue #2:** Create design tokens, colors and typography (Label: `type: style`, `area: css`)
- **Issue #3:** Create base folder structure and UI primitives (Label: `type: architecture`, `area: ui/ux`)
- **Issue #4:** Design SQL schema and ER diagram for the analytics domain (Label: `type: architecture`, `area: database`)

### Milestone 2: Core features

- **Issue #5:** Create mock data and mock API service (Label: `type: feature`)
- **Issue #6:** Build KPI metric cards (Label: `type: feature`, `area: ui/ux`)
- **Issue #7:** Build time-series revenue chart (Label: `type: feature`, `area: ui/ux`)
- **Issue #8:** Build category breakdown charts (Label: `type: feature`, `area: ui/ux`)
- **Issue #9:** Build sortable metrics data table (Label: `type: feature`, `area: ui/ux`)

### Milestone 3: Interactions and quality

- **Issue #10:** Implement date range and category filters (Label: `type: feature`)
- **Issue #11:** Handle loading, error and empty states (Label: `type: feature`)
- **Issue #12:** Polish responsive mobile-first layout (Label: `type: style`, `area: responsive`)
- **Issue #13:** Accessibility pass (Label: `type: style`, `area: accessibility`)
- **Issue #14:** Add unit and component tests (Label: `type: feature`)

### Milestone 4: Documentation and release

- **Issue #15:** Generate automated screenshots (Label: `type: docs`, `area: documentation`)
- **Issue #16:** Write final README, DECISIONS and deploy (Label: `type: docs`, `area: documentation`)

---

## 🎨 Dominio y Modelo de Datos

Tablas: `customers`, `products`, `categories`, `orders`, `order_items`.

Métricas derivadas: ingresos, pedidos, ticket medio, clientes activos, top productos, ventas por categoría.
