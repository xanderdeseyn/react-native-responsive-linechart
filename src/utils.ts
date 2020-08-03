import { ChartDomain, ChartDataPoint, Dimensions } from './types'

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
