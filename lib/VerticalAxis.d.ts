import * as React from 'react';
import { Label, Stroke } from './types';
declare type Props = {
    theme?: {
        axis?: {
            visible?: boolean;
            stroke?: Stroke;
            dx?: number;
        };
        ticks?: {
            visible?: boolean;
            stroke?: Stroke;
            length?: number;
            dx?: number;
        };
        labels?: {
            visible?: boolean;
            label?: Label;
            formatter?: (value: number) => string;
        };
        grid?: {
            visible?: boolean;
            stroke?: Stroke;
        };
    };
    tickValues?: number[];
    tickCount?: number;
    includeOriginTick?: boolean;
};
declare const VerticalAxis: React.FC<Props>;
export { VerticalAxis };
