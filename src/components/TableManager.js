export class TableManager {
    /**
     * Renders the frequency table
     * @param {HTMLElement} containerElement - The DOM element where the table will be rendered
     * @param {Array} intervals - Array of frequency intervals
     */
    static renderFrequencyTable(containerElement, intervals) {
        if (!containerElement) return;
        
        if (!intervals || intervals.length === 0) {
            containerElement.innerHTML = "<p>No hay datos suficientes para generar la tabla de frecuencias.</p>";
            return;
        }

        let tableHTML = `
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Intervalo</th>
                        <th>Frecuencia (fi)</th>
                        <th>Marca de Clase (xi)</th>
                        <th>xi * fi</th>
                    </tr>
                </thead>
                <tbody>
        `;

        intervals.forEach(i => {
            tableHTML += `
                <tr>
                    <td>${i.range}</td>
                    <td>${i.frequency}</td>
                    <td>${i.classMark.toFixed(2)}</td>
                    <td>${i.classMarkFi.toFixed(2)}</td>
                </tr>
            `;
        });

        tableHTML += "</tbody></table>";
        containerElement.innerHTML = tableHTML;
    }

    /**
     * Renders the statistics results
     * @param {HTMLElement} containerElement - The DOM element for results
     * @param {Object} stats - Calculated statistics object
     */
    static renderStatistics(containerElement, stats) {
        if (!containerElement) return;

        containerElement.innerHTML = `
            <div class="stats-grid">
                <div class="stat-card"><span class="stat-label">Media:</span> <span class="stat-value">${stats.mean.toFixed(4)}</span></div>
                <div class="stat-card"><span class="stat-label">Mediana:</span> <span class="stat-value">${stats.median.toFixed(4)}</span></div>
                <div class="stat-card"><span class="stat-label">Moda:</span> <span class="stat-value">${stats.mode.toFixed(4)}</span></div>
                <div class="stat-card"><span class="stat-label">Desviación Estándar:</span> <span class="stat-value">${stats.stdDeviation.toFixed(4)}</span></div>
                <div class="stat-card"><span class="stat-label">Varianza:</span> <span class="stat-value">${stats.variance.toFixed(4)}</span></div>
                <div class="stat-card"><span class="stat-label">Error Estándar:</span> <span class="stat-value">${stats.stdError.toFixed(4)}</span></div>
                <div class="stat-card"><span class="stat-label">Curtosis:</span> <span class="stat-value">${stats.kurtosis.toFixed(4)}</span></div>
                <div class="stat-card"><span class="stat-label">Asimetría:</span> <span class="stat-value">${stats.skewness.toFixed(4)}</span></div>
                <div class="stat-card"><span class="stat-label">Rango:</span> <span class="stat-value">${stats.range.toFixed(4)}</span></div>
                <div class="stat-card"><span class="stat-label">Mínimo:</span> <span class="stat-value">${stats.min.toFixed(4)}</span></div>
                <div class="stat-card"><span class="stat-label">Máximo:</span> <span class="stat-value">${stats.max.toFixed(4)}</span></div>
                <div class="stat-card"><span class="stat-label">Suma:</span> <span class="stat-value">${stats.sum.toFixed(4)}</span></div>
                <div class="stat-card"><span class="stat-label">Cuenta (n):</span> <span class="stat-value">${stats.count}</span></div>
                <div class="stat-card"><span class="stat-label">Intervalo Confianza 95%:</span> <span class="stat-value">±${stats.confidence95.toFixed(4)}</span></div>
            </div>
        `;
    }
}
