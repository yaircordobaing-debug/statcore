/**
 * Calculator utility for statistical data
 * Contains pure functions for various statistical metrics
 */

/**
 * Calculates all statistical metrics for an array of numbers
 * @param {number[]} data - Array of numerical data
 * @returns {Object} Object containing all calculated statistics
 */
export function calculateAllStatistics(data) {
    if (!data || data.length === 0) {
        throw new Error("El arreglo de datos está vacío o es inválido.");
    }

    const n = data.length;
    const sortedData = [...data].sort((a, b) => a - b);
    
    // Mean
    const mean = data.reduce((sum, val) => sum + val, 0) / n;
    
    // Variance (Sample)
    const variance = n > 1 
        ? data.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / (n - 1)
        : 0;
        
    // Standard Deviation
    const stdDeviation = Math.sqrt(variance);
    
    // Standard Error
    const stdError = n > 0 ? stdDeviation / Math.sqrt(n) : 0;
    
    // Median
    const median = n % 2 === 0 
        ? (sortedData[n / 2 - 1] + sortedData[n / 2]) / 2 
        : sortedData[Math.floor(n / 2)];
        
    // Mode
    const frequency = {};
    let maxFreq = 0;
    let mode = sortedData[0];
    
    data.forEach(val => {
        frequency[val] = (frequency[val] || 0) + 1;
        if (frequency[val] > maxFreq) {
            maxFreq = frequency[val];
            mode = val;
        }
    });

    // Skewness
    const skewnessSum = data.reduce((sum, val) => sum + Math.pow(val - mean, 3), 0);
    const skewness = Math.pow(stdDeviation, 3) > 0 
        ? skewnessSum / n / Math.pow(stdDeviation, 3) 
        : 0;

    // Kurtosis
    const kurtosisSum = data.reduce((sum, val) => sum + Math.pow(val - mean, 4), 0);
    const meanDeviation4 = kurtosisSum / n;
    const kurtosis = Math.pow(stdDeviation, 4) > 0 
        ? (meanDeviation4 / Math.pow(stdDeviation, 4)) - 3 
        : 0;

    // Range, Min, Max, Sum
    const min = sortedData[0];
    const max = sortedData[n - 1];
    const range = max - min;
    const sum = data.reduce((acc, val) => acc + val, 0);

    // Confidence Interval (95%)
    const confidence95 = 1.96 * stdError;

    return {
        mean,
        stdError,
        median,
        mode,
        stdDeviation,
        variance,
        kurtosis,
        skewness,
        range,
        min,
        max,
        sum,
        count: n,
        confidence95
    };
}

/**
 * Generates frequency intervals for grouped data
 * @param {number[]} data - Array of numerical data
 * @returns {Array} Array of interval objects { range, frequency, classMark, classMarkFi }
 */
export function generateFrequencyTable(data) {
    if (!data || data.length === 0) return [];
    
    const min = Math.min(...data);
    const max = Math.max(...data);
    
    // Define interval width (simplified using Sturges rule or fixed max 10 intervals)
    // Using 10 intervals as in the original code but safeguarding division by zero
    let intervalWidth = Math.ceil((max - min) / 10);
    if (intervalWidth === 0) intervalWidth = 1; // Fallback if max === min

    const intervals = [];
    
    for (let i = min; i < max + intervalWidth; i += intervalWidth) {
        // Enforce maximum 10 intervals roughly
        if (intervals.length >= 10 && i < max) continue;
        
        intervals.push({
            lower: i,
            upper: i + intervalWidth,
            range: `${i.toFixed(2)} - ${(i + intervalWidth).toFixed(2)}`,
            frequency: 0,
            classMark: 0,
            classMarkFi: 0
        });
    }

    // Count frequencies
    data.forEach(value => {
        // Find interval
        let found = false;
        for (let i = 0; i < intervals.length; i++) {
            const intv = intervals[i];
            // Inclusive lower bound, exclusive upper bound (except last interval)
            if (value >= intv.lower && (value < intv.upper || (i === intervals.length - 1 && value <= intv.upper))) {
                intv.frequency++;
                found = true;
                break;
            }
        }
        // Fallback for edge cases
        if (!found && intervals.length > 0) {
            intervals[intervals.length - 1].frequency++;
        }
    });

    // Calculate class marks
    intervals.forEach(interval => {
        interval.classMark = (interval.lower + interval.upper) / 2;
        interval.classMarkFi = interval.classMark * interval.frequency;
    });

    // Filter out empty intervals at the very end if any
    return intervals.filter(i => i.frequency > 0 || i.lower <= max);
}
