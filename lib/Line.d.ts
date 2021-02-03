import * as React from 'react';
import { ChartDataPoint, Smoothing, Stroke, Shape } from './types';
declare type Props = {
    /** Theme for the line */
    theme?: {
        stroke?: Stroke;
        scatter?: {
            default?: Shape;
            selected?: Shape;
        };
    };
    smoothing?: Smoothing;
    /** Only works in combination with smoothing='bezier'. Value between 0 and 1. */
    tension?: number;
    /** Component to render tooltips. An example component is included: <Tooltip />. */
    tooltipComponent?: JSX.Element;
    /** Callback method that fires when a tooltip is displayed for a data point. */
    onTooltipSelect?: (value: ChartDataPoint, index: number) => void;
    /** Callback method that fires when the user stopped touching the chart. */
    onTooltipSelectEnd?: () => void;
    /** Set to true if the tooltip should be hidden immediately when the user stops dragging the chart. */
    hideTooltipOnDragEnd?: boolean;
    /** Defines a period in ms after which the tooltip should hide */
    hideTooltipAfter?: number;
    /** Initial index for the tooltip. The tooltip will be immediately visible at this index on first render, without requiring user interaction. */
    initialTooltipIndex?: number;
    /** Data for the chart. Overrides optional data provided in `<Chart />`. */
    data?: ChartDataPoint[];
};
export declare type LineHandle = {
    setTooltipIndex: (index: number | undefined) => void;
};
declare const Line: React.ForwardRefExoticComponent<Props & React.RefAttributes<LineHandle>>;
export { Line };
