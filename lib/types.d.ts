export declare type XYValue = {
    x: number;
    y: number;
};
export declare type ChartDataPoint = XYValue & {
    meta?: any;
};
export declare type Padding = {
    top?: number;
    left?: number;
    right?: number;
    bottom?: number;
};
export declare type Dimensions = {
    top: number;
    left: number;
    width: number;
    height: number;
};
export declare type AxisDomain = {
    min: number;
    max: number;
};
export declare type Smoothing = 'none' | 'cubic-spline' | 'bezier';
export declare type ChartDomain = {
    x: AxisDomain;
    y: AxisDomain;
};
export declare type Stroke = {
    color?: string;
    width?: number;
    opacity?: number;
    dashArray?: number[];
};
export declare type ViewPort = {
    size: {
        width: number;
        height: number;
    };
    initialOrigin: XYValue;
};
export declare type Shape = {
    color?: string;
    width?: number;
    height?: number;
    dx?: number;
    dy?: number;
    rx?: number;
    opacity?: number;
    radius?: number;
    border?: Stroke;
};
export declare type Gradient = {
    from?: {
        color?: string;
        opacity?: number;
    };
    to?: {
        color?: string;
        opacity?: number;
    };
};
export declare type FontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700;
export declare type TextAnchor = 'start' | 'middle' | 'end';
export declare type Label = {
    color?: string;
    fontSize?: number;
    fontFamily?: string;
    opacity?: number;
    dy?: number;
    dx?: number;
    fontWeight?: FontWeight;
    textAnchor?: TextAnchor;
    rotation?: number;
};
export declare type ChartContext = {
    data: ChartDataPoint[];
    dimensions: Dimensions | undefined;
    domain: ChartDomain;
    viewportDomain: ChartDomain;
    viewportOrigin: XYValue;
    viewport: ViewPort;
    lastTouch: TouchEvent | undefined;
};
export declare type TouchEvent = {
    position: XYValue;
    type: 'tap';
} | {
    position: XYValue;
    translation: XYValue;
    type: 'pan' | 'panEnd';
};
