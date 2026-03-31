# Arquitectura del Sistema: StatCore

El diseño arquitectónico de **StatCore** se basa en un paradigma de capas separadas dentro de una aplicación de una sola página (SPA) operada exclusivamente en el frontend.

## 🏢 Estructura de Capas

El código fuente (ubicado en `/src`) está organizado estrictamente por responsabilidades:

```text
/src
├── components/          # Gestores de elementos del DOM (Vista)
│   ├── ChartManager.js  # Abstracción sobre Chart.js
│   └── TableManager.js  # Generador de tablas HTML
├── services/            # Interfaz con agentes externos (I/O)
│   └── excelService.js  # Capa de aislamiento de la librería 'xlsx'
├── utils/               # Lógica de dominio pura
│   └── statisticsCalculator.js # Motor matemático (Funciones puras)
├── styles/              # CSS modular (Sistema de diseño local)
└── main.js              # Controlador principal (Controlador)
```

## 🔄 Flujo de Datos Arquitectónico

1. **Input (Usuario):** El usuario interactúa con `main.js` subiendo un archivo `.xlsx`.
2. **Servicio (Extracción):** `main.js` invoca a `ExcelAnalyzerService`, el cual parsea cíclicamente a través de *Web APIs (FileReader)* y retorna matrices de datos en crudo.
3. **Core Lógico (Cálculo):** `main.js` envía el arreglo numérico puro a `statisticsCalculator.js`.
   - Estas funciones son *100% puras* deterministas, lo cual permite un Test Coverage fácil y alto usando `Vitest`.
4. **Vista (Renderizado):** Se invierten dependencias; `main.js` despacha los datos procesados hacia `TableManager` y `ChartManager` para pintar el DOM sin acoplar HTML directo a la lógica de negocio.

## 🛡️ Decisiones Técnicas Clave

1. **Vite como Bundler:** Permite "Hot Module Replacement" (HMR) ultrarápido en desarrollo y construcción de dependencias altamente optimizada por `esbuild` y `Rollup` en producción.
2. **Aislamiento de Dependencias:** Modulos como `xlsx` y `chart.js` no ensucian la lógica de cálculo puro. Esto permite que si a futuro cambiamos Chart.js por D3.js, solo modifiquemos *ChartManager.js*.
3. **Vanilla JS sobre Frameworks:** Para este alcance, cargar un Virtual DOM completo como React era "over-engineering". Vanilla JS permite un tiempo de carga (TTI) menor en navegadores de gama baja.

### Edge Cases Contemplados
- **Archivos sin datos/Columnas de Texto:** Validaciones en los extractores barren y limpian datos vacíos o tipo "Not a Number" (NaN).
- **Múltiples renderizados al instante:** `ChartManager` incluye rutinas `.destroy()` para barrer instancias de canvas viejas y evitar Memory Leaks comunes en integraciones DOM-Canvas.
