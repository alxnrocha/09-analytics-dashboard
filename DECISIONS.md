# Registro de Decisiones de Arquitectura (ADR) 📐

Este documento registra las principales decisiones técnicas y de diseño tomadas durante el desarrollo de **SunnyShop Analytics Dashboard**.

---

## ADR-001: Arquitectura Mock-First con TanStack Query v5

- **Contexto:** La aplicación requiere simular un entorno de producción con obtención asíncrona de datos, estados de carga, manejo de errores y caché inteligente sin depender de un backend real inicial.
- **Decisión:** Implementar una capa `mockApi.ts` con retraso artificial realista (`400ms`), tipado estricto e integración mediante `@tanstack/react-query` v5 (`useDashboardData` con `staleTime: 5 min`).
- **Consecuencias:** Permite desacoplar el desarrollo frontend de la infraestructura de backend, facilitando pruebas y garantizando que la UI maneje estados de carga (`isLoading`), refetch en segundo plano (`isFetching`) y reintentos automáticos.

---

## ADR-002: Separación de Estado Global con Zustand v5 para Filtros

- **Contexto:** Los filtros de categoría, rango temporal (`date-fns`) y búsqueda textual en el encabezado deben sincronizar múltiples componentes no emparentados (tarjetas KPI, gráficos y tablas).
- **Decisión:** Utilizar `zustand` v5 para almacenar el estado global de filtros (`src/store/filterStore.ts`).
- **Consecuencias:** Se evita el _prop drilling_ y renderizados innecesarios gracias a selectores atómicos de estado. La integración con `date-fns` v4 permite cálculos temporales precisos y legibles (`subDays`, `parseISO`, `isAfter`).

---

## ADR-003: Visualización de Datos con Recharts v3 y Tailwind CSS v4

- **Contexto:** El diseño de referencia (**SunnyShop**) exige gráficos de área con degradados suaves, gráficos de rosca (_donut_) con información métrica centrada y barras de categorías estilizadas en cápsulas.
- **Decisión:** Utilizar `recharts` v3 para gráficos de área y rosca combinados con tokens de Tailwind CSS v4 (`@theme`), y construir un gráfico de barras CSS nativo para las cápsulas de categorías.
- **Consecuencias:** Rendimiento óptimo, diseño 100% fiel al archivo de referencia, tooltips accesibles y soporte responsivo mediante `ResponsiveContainer`.

---

## ADR-004: Tabla de Métricas con TanStack Table v8

- **Contexto:** La sección de productos destacados requiere ordenación interactiva por ingresos y unidades vendidas, además de una presentación enriquecida con avatares e insignias.
- **Decisión:** Implementar `@tanstack/react-table` v8 como solución _headless_.
- **Consecuencias:** Control absoluto sobre el marcado HTML y estilos Tailwind, accesibilidad con `aria-sort`, `<caption>` para lectores de pantalla y soporte para navegación con teclado.

---

## ADR-005: Resiliencia y Accesibilidad (ErrorBoundary + ARIA)

- **Contexto:** La aplicación debe ser tolerante a fallos de renderizado y cumplir con las pautas de accesibilidad WCAG AA.
- **Decisión:**
  - Envolver la aplicación en un `ErrorBoundary` con interfaz de recuperación y botón de recarga.
  - Diseñar componentes `Skeleton` con `role="status"` y `aria-busy="true"`.
  - Diseñar estados de error con `role="alert"` y botón de reintento.
  - Implementar atributos `aria-pressed`, `role="group"`, `aria-current="page"` y cierre de menú con la tecla `Escape`.
- **Consecuencias:** Excelente experiencia de usuario, navegación asistida por voz y teclado, y resiliencia ante errores imprevistos.

---

## ADR-006: Estrategia de Pruebas y Capturas Automatizadas

- **Contexto:** Se requiere validar la lógica de cálculos de KPIs, la interacción de componentes y documentar visualmente el resultado.
- **Decisión:**
  - Configurar **Vitest v4** con **React Testing Library** y `jsdom` para pruebas unitarias y de componentes (16 tests automatizados).
  - Emplear un script aislado con **Playwright + Microsoft Edge** para capturar `screenshots/desktop.png` y `screenshots/mobile.png` sin inflar las dependencias del proyecto.
- **Consecuencias:** Confianza en la calidad del código en cada integración continua (CI) y documentación visual verificada.
