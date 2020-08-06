import _ from 'lodash'
import { Stroke } from './types'

export const adjustPointsForThickStroke = (originalPoints: { x: number; y: number }[], stroke: Required<Stroke>) => {
  let points = _.cloneDeep(originalPoints)

  // First and last points are adjusted to prevent "fat" lines from flowing out of the chart
  if (points.length >= 2) {
    points[0].x = points[0].x + Math.floor(stroke.width / 2)
    points[points.length - 1].x = points[points.length - 1].x - stroke.width / 2
  }

  return points
}
