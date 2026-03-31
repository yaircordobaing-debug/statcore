# Roadmap del Producto y Estrategia de Crecimiento

**StatCore** tiene el potencial de transformarse en algo más grande que una simple calculadora estadística. Esta es la visión a nivel "Product Management" para evolucionar la herramienta.

## 🗺️ Fases de Desarrollo

### 🟢 Fase 1: Estabilización y Mejoras Core (Actual)
- [x] Refactorización de código legado a arquitectura moderna.
- [x] Implementación de CI/CD para automatizados (GitHub Actions).
- [ ] Exportación de resultados a PDF y reportes en CSV.

### 🟡 Fase 2: Performance y Democratización
- **Web Workers:** Mover los cálculos matemáticos pesados al background thread del navegador para soportar archivos excel de más de `2 Millones de filas` sin congelar el Main Thread.
- **Soporte Multi-Idioma:** I18n para soportar bases de usuarios de habla inglesa (Inglés/Español base).
- **Análisis Bivariado:** Integrar matrices de correlación y covarianza (Regresión Lineal Simple).

### 🔴 Fase 3: StatCore AI (Integración de Inteligencia Artificial)
- Integración de modelo de lenguaje (LLM - Gemini/GPT-4 API proxy).
- **"AI Insights Generator":** Al presionar "Calcular", un modelo de IA recibirá las métricas crudas (Media, Asimetría, Varianza) y generará un texto con lenguaje natural (Insights) que le explique al usuario qué significan esos datos en contexto de su negocio.
- Detección automática de anomalías ("Outliers") asistida por machine learning foresting.

## 💰 Posible Estrategia de Monetización (Si se volviera SaaS)

1. **Nivel Gratuito (Freemium):**
   - Análisis de archivos hasta 10MB.
   - Gráficos descriptivos estándar.
2. **Nivel Pro (Suscripción $9.99/mes):**
   - Interfaz con "AI Insights" ilimitadas.
   - Archivos ilimitados procesados vía Cloud (Backend con Python/Pandas para gigabytes de datos).
   - Branding personalizado en reportes PDF exportados.
3. **Licencia Open Source B2B:**
   - Para empresas que requieren integrarlo en sistemas ERP internos sin dependencia a internet (On-Premise integration).
