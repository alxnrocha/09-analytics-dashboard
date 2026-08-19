# SunnyShop — Panel de Analíticas & Métricas SaaS E-Commerce

[![Live Demo](https://img.shields.io/badge/Live_Demo-GitHub_Pages-success?style=flat-square&logo=github&logoColor=white)](https://alxnrocha.github.io/analytics-dashboard/)
[![React 19](https://img.shields.io/badge/React-19.0-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Recharts](https://img.shields.io/badge/Recharts-2.15-22C55E?style=flat-square)](https://recharts.org/)
[![TanStack Table](https://img.shields.io/badge/TanStack_Table-v8-FF4154?style=flat-square&logo=reacttable&logoColor=white)](https://tanstack.com/table/v8)
[![Zustand](https://img.shields.io/badge/Zustand-5.0-4338CA?style=flat-square)](https://github.com/pmndrs/zustand)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

> **Proyecto 09 del Portafolio Profesional** — Panel de control y analíticas de ventas moderno, reactivo y accesible para plataformas de comercio electrónico.  
> 🔗 **Demo en Vivo en GitHub Pages:** [https://alxnrocha.github.io/analytics-dashboard/](https://alxnrocha.github.io/analytics-dashboard/)

---

## ✨ Características Principales

### 🚀 Experiencia de Usuario & Frontend

- **Tarjetas KPI Reactivas:** Ingresos totales (€), volumen de pedidos, clientes únicos y ticket promedio con deltas porcentuales respecto al período anterior.
- **Gráfico de Serie Temporal de Ingresos:** Gráfico de área interactivo con degradado (`Recharts`), selector dinámico de período (7, 30 y 90 días) y tooltips contextuales.
- **Desglose de Ventas por Categoría:** Gráfico tipo Donut con total central y distribución porcentual acompañado de barras estilizadas.
- **Tabla de Productos Destacados:** Implementada con `@tanstack/react-table` v8, ordenación por cabeceras, miniaturas y badges de producto estrella.
- **Filtros Globales con Zustand + date-fns:** Filtrado reactivo por categoría, rango de fechas y buscador en vivo con sincronización instantánea.
- **Resiliencia & Accesibilidad:** Integración de `ErrorBoundary`, esqueletos de carga (`Skeleton` con `role="status"` y `aria-busy`), y manejo de estados vacíos.

---

## 🏛️ Estructura del Proyecto

```text
09-analytics-dashboard/
├── .github/workflows/ci.yml       # Pipeline de CI y Deploy automático en Pages
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
