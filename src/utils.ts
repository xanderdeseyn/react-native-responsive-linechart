import { ChartDomain, ChartData, Dimensions } from './types'

export const formatDataForSVG = (data: ChartData) => {
  return data.map((p) => p.x + ',' + p.y).join(' ')
}

export const scalePointsToDimensions = (data: ChartData, domain: ChartDomain, dimensions: Dimensions) => {
  return data.map(({ x, y }) => ({
    x: scaleXValueToDimensions(x, domain, dimensions),
    y: scaleYValueToDimensions(y, domain, dimensions),
  }))
}

const scaleXValueToDimensions = (x: number, domain: ChartDomain, dimensions: Dimensions) => {
  return dimensions.left + ((x - domain.x.min) * dimensions.width) / Math.abs(domain.x.max - domain.x.min)
}

const scaleYValueToDimensions = (y: number, domain: ChartDomain, dimensions: Dimensions) => {
  return dimensions.height + dimensions.top - ((y - domain.y.min) * dimensions.height) / Math.abs(domain.y.max - domain.y.min)
}
