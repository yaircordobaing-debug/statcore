import * as XLSX from 'xlsx';

/**
 * Service for handling Excel configurations and parsing
 */
class ExcelAnalyzerService {
    /**
     * Parse excel file and extract columns
     * @param {File} file - Excel file blob
     * @returns {Promise<Array>} array of columns from the first sheet
     */
    static async extractData(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (e) => {
                try {
                    const data = e.target.result;
                    const workbook = XLSX.read(data, { type: "binary" });
                    const sheetName = workbook.SheetNames[0];
                    const sheet = workbook.Sheets[sheetName];
                    const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
                    resolve({
                        columns: jsonData[0] || [], // Header row
                        rows: jsonData.slice(1)     // Data rows
                    });
                } catch (error) {
                    reject(new Error("Error al analizar el archivo Excel. Asegúrese de que sea un archivo válido."));
                }
            };
            
            reader.onerror = () => {
                reject(new Error("Error de lectura del archivo."));
            };

            reader.readAsBinaryString(file);
        });
    }

    /**
     * Extracts numerical data from a specific column index
     * @param {Array} rows - Data rows
     * @param {number} columnIndex - Selected column index
     * @returns {number[]} Array of numerical values
     */
    static extractColumnData(rows, columnIndex) {
        if (!rows || rows.length === 0) return [];
        return rows
            .map(row => parseFloat(row[columnIndex]))
            .filter(value => !isNaN(value));
    }
}

export default ExcelAnalyzerService;
