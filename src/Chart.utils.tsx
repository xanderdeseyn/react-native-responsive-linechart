import { ChartDomain, Padding, ViewPort } from './types'

export const calculateDataDimensions = (dimensions: { width: number; height: number } | undefined, padding: Required<Padding>) => {
  if (dimensions) {
    return {
      top: 0,
      left: 0,
      width: dimensions.width - padding.left - padding.right,
      height: dimensions.height - padding.top - padding.bottom,
    }
  }

  return { top: 0, left: 0, width: 10, height: 10 }
}

export const calculateViewportDomain = (viewport: ViewPort, domain: ChartDomain, panX: number, panY: number): ChartDomain => {
  const minX = Math.max(panX, domain.x.min)
  const maxX = Math.min(minX + viewport.size.width, domain.x.max)

  const minY = Math.max(panY, domain.y.min)
  const maxY = Math.min(minY + viewport.size.height, domain.y.max)

  return {
    x: { min: Math.min(minX, maxX - viewport.size.width), max: maxX },
    y: { min: Math.min(minY, maxY - viewport.size.height), max: maxY },
  }
}
