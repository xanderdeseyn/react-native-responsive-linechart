import { ChartDomain, ChartDataPoint, Dimensions, XYValue, Smoothing } from './types';
export declare const formatDataForSVG: (data: ChartDataPoint[]) => string;
export declare const scalePointToDimensions: (data: ChartDataPoint, domain: ChartDomain, dimensions: Dimensions) => {
    x: number;
    y: number;
};
export declare const scalePointsToDimensions: (data: ChartDataPoint[], domain: ChartDomain, dimensions: Dimensions) => {
    x: number;
    y: number;
}[];
export declare const appendPointsToPath: (path: string, points: XYValue[]) => string;
export declare const svgPath: (points: XYValue[], smoothing: Smoothing, tension: number) => any;
