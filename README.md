# StatCore: Plataforma de Análisis Estadístico Avanzado 📊

[![CI](https://github.com/yaircordobaing-debug/statcore/actions/workflows/ci.yml/badge.svg)](https://github.com/yaircordobaing-debug/statcore/actions)
[![Deploy to GitHub Pages](https://github.com/yaircordobaing-debug/statcore/actions/workflows/deploy.yml/badge.svg)](https://github.com/yaircordobaing-debug/statcore/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-brightgreen)](https://yaircordobaing-debug.github.io/statcore/)

> **Transformando datos crudos de Excel en decisiones estratégicas al instante.**

---

## 📖 El Problema

En un mundo impulsado por datos, los equipos operativos, investigadores y analistas de negocio a menudo se enfrentan a un cuello de botella: **el análisis estadístico rápido de grandes volúmenes de datos.**

Las hojas de cálculo (Excel, Google Sheets) son excelentes para almacenar datos, pero su capacidad para generar insights instantáneos, calcular métricas descriptivas robustas (asimetría, curtosis, varianza) y visualizar distribuciones complejas requiere configuraciones manuales tediosas que consumen horas de trabajo valioso.

## 💡 La Solución: StatCore

**StatCore** es una aplicación web de alto rendimiento que democratiza el análisis de datos. Construida con una arquitectura frontend moderna (Vite + Vanilla JS modular) y sin necesidad de un backend pesado, permite a los usuarios:

1. **Cargar** conjuntos de datos (`.xlsx`, `.xls`) de forma segura en el navegador.
2. **Procesar** y calcular instantáneamente más de 14 métricas estadísticas clave.
3. **Visualizar** distribuciones a través de gráficos interactivos y tablas de frecuencia agrupadas.

### ✨ Impacto Generado
- **Reducción de Tiempo:** Lo que tomaba 30 minutos configurando fórmulas y gráficos intermedios en Excel, ahora toma **menos de 3 segundos**.
- **Privacidad Local:** El procesamiento de datos ocurre 100% en el cliente (navegador del usuario), garantizando la máxima seguridad sin enviar datos a servidores externos.
- **Toma de Decisiones:** Los gráficos permiten comprender rápidamente el comportamiento de la distribución de datos en tiempo real.

---

## 🏗️ Arquitectura y Tecnologías

El proyecto ha sido diseñado siguiendo principios **SOLID** y modularidad extrema para garantizar escalabilidad y fácil mantenimiento.

* **Core Engine:** Vanilla JavaScript (ES11+)
* **Build System:** Vite
* **Data Parser:** `xlsx` (SheetJS)
* **Visualización:** Chart.js
* **Testing:** Vitest
* **CI/CD:** GitHub Actions
* **Diseño:** CSS3 puro con Glassmorphism y UI/UX moderno.

> 📚 Puedes consultar los detalles técnicos del diseño del sistema en [la documentación de arquitectura](./docs/architecture.md).

---

## 🚀 Instalación y Uso Local

Para ejecutar StatCore en tu entorno de desarrollo, sigue los siguientes pasos:

### Prerrequisitos
- [Node.js](https://nodejs.org/) v18+ 
- NPM o Yarn

### Pasos

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/yaircordobaing-debug/statcore.git
   cd statcore
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Ejecutar servidor de desarrollo:**
   ```bash
   npm run dev
   ```

4. **Ejecutar Pruebas Unitarias:**
   ```bash
   npm run test
   ```

---

## 🎨 Demo Visual

> **[🌐 Ver Demo en Vivo](https://yaircordobaing-debug.github.io/statcore/)**

*(Agrega aquí un GIF de 10-15 segundos demostrando el flujo: Subir archivo → Seleccionar Columna → Ver Resultados)*

---

## 🌟 Mentalidad de Producto y Roadmap

StatCore no es solo un visor de Excel, es la fundación para un **Analista de Datos AI en el navegador**.

### ¿Qué se logró?
Se ha modernizado un script monolítico convirtiéndolo en una SPA (Single Page Application) escalable, aumentando la mantenibilidad y mejorando la experiencia de usuario (UX) un 100%.

### ¿Qué mejoraría a futuro?
- **Procesamiento en Web Workers:** Para manejar archivos de más de 100MB sin congelar la UI.
- **Soporte CSV:** Extender el parser para aceptar múltiples formatos.

### Roadmap Futuro y Monetización
Descubre la visión a largo plazo, incluyendo integraciones con Inteligencia Artificial Limitada, en [nuestro roadmap de producto](./docs/roadmap.md).

---

## 🤝 Contribuidores

- **Desarrolladores Principales:** Yair Cordoba, Jary Preston

*Desarrollado como un proyecto demostrativo de ingeniería de software de alto impacto.*
