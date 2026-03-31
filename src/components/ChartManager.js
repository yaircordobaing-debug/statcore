import Chart from 'chart.js/auto';

export class ChartManager {
    constructor() {
        this.barChart = null;
        this.barChartFi = null;
        this.pieChart = null;
    }

    /**
     * Destroys all existing charts
     */
    destroyCharts() {
        if (this.barChart) this.barChart.destroy();
        if (this.barChartFi) this.barChartFi.destroy();
        if (this.pieChart) this.pieChart.destroy();
    }

    /**
     * Render frequency charts based on intervals
     * @param {Array} intervals - Grouped frequency intervals
     */
    renderCharts(intervals) {
        this.destroyCharts();

        const labels = intervals.map(i => i.range);
        const frequencies = intervals.map(i => i.frequency);
        const classMarkFi = intervals.map(i => i.classMarkFi);

        // Chart styles setup
        const bgColors = [
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(153, 102, 255, 0.7)',
            'rgba(255, 159, 64, 0.7)',
            'rgba(100, 100, 255, 0.7)',
            'rgba(200, 200, 200, 0.7)',
            'rgba(50, 205, 50, 0.7)',
            'rgba(255, 69, 0, 0.7)'
        ];

        // 1. Bar Chart: Frequencies
        const barCtx = document.getElementById('barChart');
        if (barCtx) {
            this.barChart = new Chart(barCtx, {
                type: 'bar',
                data: {
                    labels,
                    datasets: [{
                        label: 'Frecuencia absoluta (fi)',
                        data: frequencies,
                        backgroundColor: 'rgba(54, 162, 235, 0.8)',
                        borderRadius: 6
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: { labels: { color: '#f5f5f5' } }
                    },
                    scales: {
                        x: { ticks: { color: '#f5f5f5' }, grid: { color: '#444' } },
                        y: { beginAtZero: true, ticks: { color: '#f5f5f5', stepSize: 1 }, grid: { color: '#444' } }
                    }
                }
            });
        }

        // 2. Bar Chart: Mark * Freq
        const barFiCtx = document.getElementById('barChartFi');
        if (barFiCtx) {
            this.barChartFi = new Chart(barFiCtx, {
                type: 'bar',
                data: {
                    labels,
                    datasets: [{
                        label: 'Marca de clase * Frecuencia (xi * fi)',
                        data: classMarkFi,
                        backgroundColor: 'rgba(255, 159, 64, 0.8)',
                        borderRadius: 6
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: { labels: { color: '#f5f5f5' } }
                    },
                    scales: {
                        x: { ticks: { color: '#f5f5f5' }, grid: { color: '#444' } },
                        y: { beginAtZero: true, ticks: { color: '#f5f5f5' }, grid: { color: '#444' } }
                    }
                }
            });
        }

        // 3. Pie Chart: Frequencies Distribution
        const pieCtx = document.getElementById('pieChart');
        if (pieCtx) {
            this.pieChart = new Chart(pieCtx, {
                type: 'pie',
                data: {
                    labels,
                    datasets: [{
                        label: 'Distribución de Frecuencias',
                        data: frequencies,
                        backgroundColor: bgColors,
                        borderWidth: 1,
                        borderColor: '#1e1e2f'
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: { position: 'right', labels: { color: '#f5f5f5' } }
                    }
                }
            });
        }
    }
}
