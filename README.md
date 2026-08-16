# SunnyShop — Panel de Analíticas & Métricas SaaS E-Commerce

[![CI & Deploy](https://github.com/alxnrocha/analytics-dashboard/actions/workflows/ci.yml/badge.svg)](https://github.com/alxnrocha/analytics-dashboard/actions)
[![Demo GitHub Pages](https://img.shields.io/badge/Demo-GitHub_Pages-22c55e?style=for-the-badge&logo=github&logoColor=white)](https://alxnrocha.github.io/analytics-dashboard/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.2-61dafb.svg)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38bdf8.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)

**SunnyShop** es un panel de control y analíticas de ventas moderno, reactivo y accesible para plataformas de comercio electrónico. Proporciona visualización en tiempo real de métricas de ingresos, pedidos, clientes únicos y ticket medio, con desgloses interactivos por categoría y catálogo de productos estrella.

- 🌐 **Demo en Vivo (GitHub Pages):** [https://alxnrocha.github.io/analytics-dashboard/](https://alxnrocha.github.io/analytics-dashboard/)
- 📦 **Repositorio GitHub:** [https://github.com/alxnrocha/analytics-dashboard](https://github.com/alxnrocha/analytics-dashboard)

---

## ✨ Características Principales

### 🚀 Experiencia de Usuario & Frontend

- **Tarjetas KPI Reactivas:** Ingresos totales (€), volumen de pedidos, clientes únicos y ticket promedio con deltas porcentuales respecto al período anterior.
- **Gráfico de Serie Temporal de Ingresos:** Gráfico de área interactivo con degradado (`Recharts`), selector dinámico de período (7, 30 y 90 días) y tooltips contextuales.
- **Desglose de Ventas por Categoría:** Gráfico tipo Donut con total central y distribución porcentual acompañado de barras estilizadas.
- **Tabla de Productos Destacados:** Implementada con `@tanstack/react-table` v8, ordenación por cabeceras, miniaturas y badges de producto estrella.
- **Filtros Globales con Zustand + date-fns:** Filtrado reactivo por categoría, rango de fechas y buscador en vivo con sincronización instantánea.
- **Resiliencia & Accesibilidad:** Integración de `ErrorBoundary`, esqueletos de carga (`Skeleton` con `role="status"` y `aria-busy`), y manejo de estados vacíos.

### 🛡️ Modelo de Base de Datos Relacional

- Esquema DDL SQL en [`sql/schema.sql`](sql/schema.sql) y diagrama DER Mermaid en [`docs/schema-erd.md`](docs/schema-erd.md) para categorías, productos, clientes, pedidos y líneas de pedido.

---

## 🏛️ Estructura del Proyecto

```text
09-analytics-dashboard/
├── .github/workflows/ci.yml       # Pipeline de CI y Deploy automático en Pages
├── docs/                          # Documentación arquitectónica y diagrama DER
│   └── schema-erd.md
├── sql/                           # Esquema SQL relacional (DDL)
│   └── schema.sql
├── src/
│   ├── components/
│   │   ├── dashboard/             # RevenueChart, CategoryBarChart, KpiCard, TopProductsTable
│   │   ├── layout/                # Sidebar, Header y DashboardLayout
│   │   └── ui/                    # Skeleton, ErrorBoundary, Badge, Button, Card
│   ├── data/                      # Dataset sintético de ventas y catálogo
│   ├── hooks/                     # Custom hooks con TanStack Query
│   ├── services/                  # Capa de servicio mock-first
│   ├── store/                     # Store global de filtros con Zustand
│   ├── types/                     # Tipos de analíticas y dominio
│   ├── utils/                     # Métricas y formateadores de moneda/fechas
│   ├── App.tsx                    # Orquestador del Dashboard
│   └── main.tsx                   # Entrada React 19
├── index.html                     # Entrypoint HTML5
├── package.json                   # Scripts y dependencias
└── vite.config.ts                 # Configuración de Vite y Tailwind v4
```

---

## ⚡ Guía de Inicio Rápido

### 1. Clonar e Instalar Dependencias

```bash
git clone https://github.com/alxnrocha/analytics-dashboard.git
cd analytics-dashboard
npm install
```

### 2. Iniciar en Modo Desarrollo

```bash
npm run dev
```

---

## 🧪 Calidad de Código y Pruebas

```bash
# Ejecutar suite de pruebas con Vitest
npm test

# Verificación de tipos TypeScript
npm run typecheck

# Linter de alto rendimiento (Oxlint)
npm run lint

# Formatear código con Prettier
npm run format

# Compilar para producción
npm run build
```

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulte el archivo [LICENSE](./LICENSE) para más detalles.

**Autor:** [Alexandre Rocha](https://github.com/alxnrocha)
