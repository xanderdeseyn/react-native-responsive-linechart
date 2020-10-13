import { ChartDomain, ChartDataPoint, Dimensions, XYValue, Smoothing } from './types'
import spline from '@yr/monotone-cubic-spline'
import Bezier from 'paths-js/bezier'
import Polygon from 'paths-js/polygon'

export const formatDataForSVG = (data: ChartDataPoint[]) => {
  return data.map((p) => p.x + ',' + p.y).join(' ')
}

export const scalePointToDimensions = (data: ChartDataPoint, domain: ChartDomain, dimensions: Dimensions) => ({
  x: scaleXValueToDimensions(data.x, domain, dimensions),
  y: scaleYValueToDimensions(data.y, domain, dimensions),
})

export const scalePointsToDimensions = (data: ChartDataPoint[], domain: ChartDomain, dimensions: Dimensions) => {
  return data.map((p) => scalePointToDimensions(p, domain, dimensions))
}

const scaleXValueToDimensions = (x: number, domain: ChartDomain, dimensions: Dimensions) => {
  return dimensions.left + ((x - domain.x.min) * dimensions.width) / Math.abs(domain.x.max - domain.x.min)
}

const scaleYValueToDimensions = (y: number, domain: ChartDomain, dimensions: Dimensions) => {
  return dimensions.height + dimensions.top - ((y - domain.y.min) * dimensions.height) / Math.abs(domain.y.max - domain.y.min)
}

export const appendPointsToPath = (path: string, points: XYValue[]) => {
  return `${path} ${points.map((p) => `L ${p.x} ${p.y}`).join(' ')}`
}

export const svgPath = (points: XYValue[], smoothing: Smoothing, tension: number) => {
  if (smoothing === 'bezier') {
    return bezierPath(points, tension)
  } else if (smoothing === 'cubic-spline' && points.length > 1) {
    return splinePath(points)
  } else {
    return linearPath(points)
  }
}

const bezierPath = (points: XYValue[], tension: number) => {
  return Bezier({ points: points.map((p) => [p.x, p.y]), tension }).path.print()
}

const splinePath = (points: XYValue[]) => {
  const splinePoints = spline.points(points.map((p) => [p.x, p.y]))
  return spline.svgPath(splinePoints)
}

const linearPath = (points: XYValue[]) => {
  return Polygon({ points: points.map((p) => [p.x, p.y]) }).path.print()
}
