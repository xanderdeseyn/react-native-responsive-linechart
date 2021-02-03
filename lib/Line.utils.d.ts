import { Stroke, XYValue } from './types';
export declare const adjustPointsForThickStroke: (originalPoints: XYValue[], stroke: Required<Stroke>) => XYValue[];
export declare const calculateTooltipIndex: (points: XYValue[], lastTouch?: XYValue | undefined) => number | undefined;
