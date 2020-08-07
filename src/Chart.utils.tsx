import { Padding } from './types'

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
