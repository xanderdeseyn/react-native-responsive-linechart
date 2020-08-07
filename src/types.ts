export type XYValue = { x: number; y: number }

export type ChartDataPoint = XYValue & { meta?: any }

export type Padding = { top?: number; left?: number; right?: number; bottom?: number }

export type Dimensions = { top: number; left: number; width: number; height: number }

export type AxisDomain = { min: number; max: number }

export type ChartDomain = { x: AxisDomain; y: AxisDomain }

export type Stroke = { color?: string; width?: number; opacity?: number }

export type Box = { color?: string; width?: number; height?: number; dx?: number; dy?: number; opacity?: number; radius?: number; border?: Stroke }

export type Gradient = { from?: { color?: string; opacity?: number }; to?: { color?: string; opacity?: number } }

export type FontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700

export type TextAnchor = 'start' | 'middle' | 'end'

export type Label = { color?: string; fontSize?: number; opacity?: number; dy?: number; dx?: number; fontWeight?: FontWeight; textAnchor?: TextAnchor }

export type ChartContext = {
  data: ChartDataPoint[]
  dimensions: Dimensions | undefined
  domain: ChartDomain
  lastTouch: XYValue | undefined
}
