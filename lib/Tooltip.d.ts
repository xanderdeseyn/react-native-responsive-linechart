import * as React from 'react';
import { ChartDataPoint, Label, XYValue, Shape } from './types';
declare type Props = {
    theme?: {
        label?: Label;
        shape?: Shape;
        formatter?: (value: ChartDataPoint) => string;
    };
    value?: ChartDataPoint;
    position?: XYValue;
};
declare const Tooltip: React.FC<Props>;
export { Tooltip };
