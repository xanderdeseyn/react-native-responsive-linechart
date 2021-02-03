import * as React from 'react';
import { ChartDataPoint, Gradient, Smoothing } from './types';
declare type Props = {
    /** Theme for the area */
    theme?: {
        gradient?: Gradient;
    };
    smoothing?: Smoothing;
    /** Setting this prop will smooth out the line with bézier curves. Value between 0 and 1. */
    tension?: number;
    /** Data for the chart. Overrides optional data provided in `<Chart />`. */
    data?: ChartDataPoint[];
};
declare const Area: React.FC<Props>;
export { Area };
