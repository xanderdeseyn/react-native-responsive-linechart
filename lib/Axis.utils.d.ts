import { AxisDomain } from './types';
export declare const filterValuesForDomain: (values: number[], domain: AxisDomain) => number[];
export declare const calculateTickValues: (tickValues: number[] | undefined, tickCount: number | undefined, domain: AxisDomain, includeOriginTick?: boolean | undefined) => number[];
