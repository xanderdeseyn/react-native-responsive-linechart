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

  return undefined
}

// Only enable pan responder if viewport domain differs from chart domain
export const shouldEnablePanResponder = (viewportDomain: ChartDomain, chartDomain: ChartDomain) => {
  return (
    viewportDomain.x.min !== chartDomain.x.min ||
    viewportDomain.x.max !== chartDomain.x.max ||
    viewportDomain.y.min !== chartDomain.y.min ||
    viewportDomain.y.max !== chartDomain.y.max
  )
}

export const calculateViewportDimensions = (viewport: ViewPort, domain: ChartDomain, panX: number, panY: number) => {
  const minX = Math.max(panX + viewport.initialOrigin.x, domain.x.min)
  const maxX = Math.min(minX + viewport.size.width, domain.x.max)

  const minY = Math.max(panY + viewport.initialOrigin.y, domain.y.min)
  const maxY = Math.min(minY + viewport.size.height, domain.y.max)

  return {
    x: { min: Math.min(minX, maxX - viewport.size.width), max: maxX },
    y: { min: Math.min(minY, maxY - viewport.size.height), max: maxY },
  }
}
