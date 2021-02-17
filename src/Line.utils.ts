import cloneDeep from 'lodash.clonedeep'
import { Stroke, XYValue } from './types'

export const adjustPointsForThickStroke = (originalPoints: XYValue[], stroke: Required<Stroke>) => {
  let points = cloneDeep(originalPoints)

  // First and last points are adjusted to prevent "fat" lines from flowing out of the chart
  if (points.length >= 2) {
    points[0].x = points[0].x + Math.floor(stroke.width / 2)
    points[points.length - 1].x = points[points.length - 1].x - stroke.width / 2
  }

  return points
}

const smallestIndex = (arr: number[]) => {
  let lowest = 0
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[lowest]) lowest = i
  }

  return lowest
}

export const calculateTooltipIndex = (points: XYValue[], lastTouch?: XYValue) => {
  if (!lastTouch || points.length < 1) {
    return undefined
  }

  return smallestIndex(points.map(p => Math.abs(p.x - lastTouch.x)))
}
