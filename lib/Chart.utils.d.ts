import { ChartDomain, Padding, ViewPort } from './types';
export declare const calculateDataDimensions: (dimensions: {
    width: number;
    height: number;
} | undefined, padding: Required<Padding>) => {
    top: number;
    left: number;
    width: number;
    height: number;
};
export declare const calculateViewportDomain: (viewport: ViewPort, domain: ChartDomain, panX: number, panY: number) => ChartDomain;
