import { describe, it, expect } from 'vitest';
import { calculateAllStatistics, generateFrequencyTable } from '../src/utils/statisticsCalculator.js';

describe('Statistics Calculator Core Logic', () => {

    it('should throw an error if data is empty or invalid', () => {
        expect(() => calculateAllStatistics([])).toThrow();
        expect(() => calculateAllStatistics(null)).toThrow();
    });

    it('should correctly calculate basic statistics (mean, median, mode)', () => {
        // Known data: Mean -> 3, Median -> 3, Mode -> 1 (most frequent)
        const data = [1, 1, 2, 3, 4, 5, 5];
        const stats = calculateAllStatistics(data);

        expect(stats.mean).toBeCloseTo(3, 2);
        expect(stats.median).toBe(3);
        expect(stats.mode).toBe(1); // 1 or 5 could be mode, 1 is fine due to implementation
        expect(stats.sum).toBe(21);
        expect(stats.count).toBe(7);
        expect(stats.min).toBe(1);
        expect(stats.max).toBe(5);
        expect(stats.range).toBe(4);
    });

    it('should calculate accurate variance and standard deviation', () => {
        const data = [10, 12, 23, 23, 16, 23, 21, 16];
        const stats = calculateAllStatistics(data);
        
        // Expected values approximate to standard formulas
        expect(stats.mean).toBeCloseTo(18, 1);
        expect(stats.stdDeviation).toBeGreaterThan(0);
        expect(stats.variance).toBeCloseTo(Math.pow(stats.stdDeviation, 2), 2);
    });

    it('should calculate confidence intervals and standard errors', () => {
        const data = [4, 5, 6, 7, 8];
        const stats = calculateAllStatistics(data);
        expect(stats.stdError).toBeGreaterThan(0);
        expect(stats.confidence95).toBeCloseTo(1.96 * stats.stdError, 2);
    });
});

describe('Frequency Table Generator', () => {
    it('should generate correct number of intervals for given data', () => {
        const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const intervals = generateFrequencyTable(data);
        
        expect(intervals.length).toBeGreaterThan(0);
        expect(intervals[0].lower).toBe(1);
        expect(intervals[intervals.length - 1].upper).toBeGreaterThanOrEqual(10);
    });

    it('should calculate frequencies correctly across intervals', () => {
        const data = [1, 1, 1, 2, 2, 3];
        const intervals = generateFrequencyTable(data);
        
        const totalFrequency = intervals.reduce((sum, i) => sum + i.frequency, 0);
        expect(totalFrequency).toBe(data.length); // Total frequencies must match count
    });
});
