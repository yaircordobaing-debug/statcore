import ExcelAnalyzerService from './services/excelService.js';
import { calculateAllStatistics, generateFrequencyTable } from './utils/statisticsCalculator.js';
import { ChartManager } from './components/ChartManager.js';
import { TableManager } from './components/TableManager.js';
import './styles/main.css';

document.addEventListener('DOMContentLoaded', () => {
    // State
    let excelRows = [];
    const chartManager = new ChartManager();

    // DOM Elements
    const uploadForm = document.getElementById("uploadForm");
    const fileInput = document.getElementById("excelFile");
    const columnSelect = document.getElementById("columnSelect");
    const calculateBtn = document.getElementById("calculateButton");
    const resultsContainer = document.getElementById("results");
    const tableContainer = document.getElementById("frequencyTable");
    
    // UI Panels (to show/hide)
    const analysisSection = document.getElementById("analysisSection");
    const visualizationSection = document.getElementById("visualizationSection");
    
    // Loading State
    const toggleLoading = (isLoading) => {
        calculateBtn.textContent = isLoading ? "Calculando..." : "Calcular Estadísticas";
        calculateBtn.disabled = isLoading;
    };

    // Form Submission: Read Excel
    uploadForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const file = fileInput.files[0];
        if (!file) return;

        try {
            uploadForm.querySelector('button').textContent = "Analizando...";
            const data = await ExcelAnalyzerService.extractData(file);
            excelRows = data.rows;
            
            // Populate Dropdown
            columnSelect.innerHTML = "";
            data.columns.forEach((colName, index) => {
                const option = document.createElement("option");
                option.value = index;
                option.textContent = colName || `Columna ${index + 1}`;
                columnSelect.appendChild(option);
            });
            
            // Show analysis section
            analysisSection.classList.remove("hidden");
            uploadForm.querySelector('button').textContent = "Subir Nuevo Archivo";
            
        } catch (error) {
            alert(error.message);
            uploadForm.querySelector('button').textContent = "Subir Archivo";
        }
    });

    // Calculate Button Click
    calculateBtn.addEventListener("click", () => {
        const selectedColumnIndex = parseInt(columnSelect.value, 10);
        if (isNaN(selectedColumnIndex) || excelRows.length === 0) return;

        toggleLoading(true);

        // Process data
        setTimeout(() => {
            try {
                const columnData = ExcelAnalyzerService.extractColumnData(excelRows, selectedColumnIndex);
                
                if (columnData.length === 0) {
                    throw new Error("La columna seleccionada no contiene datos numéricos válidos.");
                }

                // Calculate statistics
                const stats = calculateAllStatistics(columnData);
                const intervals = generateFrequencyTable(columnData);

                // Render UI
                visualizationSection.classList.remove("hidden");
                TableManager.renderStatistics(resultsContainer, stats);
                TableManager.renderFrequencyTable(tableContainer, intervals);
                chartManager.renderCharts(intervals);

            } catch (error) {
                alert(error.message);
            } finally {
                toggleLoading(false);
            }
        }, 100); // Small timeout to allow UI update
    });
});
