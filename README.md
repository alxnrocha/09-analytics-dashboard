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

## 🌟 Visión General & Propuesta de Valor

**SunnyShop Analytics** es un dashboard analítico para directores de comercio electrónico y managers de tiendas online.

Centraliza la visualización de ingresos en tiempo real, volumen de pedidos, desglose de ventas por categoría, ticket promedio por cliente y rendimiento del catálogo de productos estrella con filtrado temporal interactivo.

---

## ✨ Características Principales

- **Tarjetas KPI Reactivas:** Ingresos (€), pedidos, clientes únicos y ticket promedio con deltas porcentuales respecto al período anterior.
- **Gráfico de Serie Temporal de Ingresos:** Gráfico de área interactivo con Recharts, selector dinámico de período (7, 30 y 90 días) y tooltips contextuales.
- **Desglose de Ventas por Categoría:** Gráfico tipo Donut con total central y distribución porcentual.
- **Tabla de Productos Destacados:** Implementada con `@tanstack/react-table` v8, ordenación por columnas y badges.
- **Filtros Globales con Zustand:** Filtrado por categoría, rango de fechas y buscador con sincronización instantánea.

---

## 🏛️ Arquitectura del Proyecto

```text
09-analytics-dashboard/
├── index.html
├── src/
│   ├── components/                # KpiCards, RevenueChart, CategoryDonut, ProductTable
│   ├── data/                      # Fixtures comerciales determinísticas
│   ├── stores/                    # Store global Zustand
│   ├── types/                     # Tipos TypeScript
│   ├── App.tsx                    # Componente raíz
│   └── main.tsx                   # Punto de entrada
├── LICENSE
├── package.json
└── vite.config.ts
```

---

## 🚀 Instalación y Puesta en Marcha

### Prerrequisitos

- Node.js `>= 20.0.0`
- npm `>= 10.0.0`

### Pasos

1. **Clonar el repositorio:**

   ```bash
   git clone https://github.com/alxnrocha/analytics-dashboard.git
   cd analytics-dashboard
   ```

2. **Instalar dependencias:**

   ```bash
   npm install
   ```

3. **Ejecutar en modo desarrollo:**

   ```bash
   npm run dev
   ```

4. **Compilar para producción:**
   ```bash
   npm run build
   ```

---

## 🛡️ Calidad de Código & Testing

- **Linter & Typecheck:** Oxlint sin advertencias y TypeScript estricto.
- **Accesibilidad (a11y):** Tooltips accesibles, foco visible y contraste cromático verificado.

---

## 📄 Licencia

Este proyecto se encuentra bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.
