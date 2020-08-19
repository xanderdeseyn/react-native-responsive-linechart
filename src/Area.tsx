import deepmerge from 'deepmerge'
import * as React from 'react'
import { Defs, Stop, LinearGradient, Path } from 'react-native-svg'
import Bezier from 'paths-js/bezier'
import Polygon from 'paths-js/polygon'
import ChartContext from './ChartContext'
import { ChartDataPoint, Gradient, Smoothing } from './types'
import { appendPointsToPath, bezierPath, formatDataForSVG, scalePointsToDimensions, splinePath, svgPath } from './utils'

type Props = {
  /** Theme for the area */
  theme?: {
    gradient?: Gradient
  }
  smoothing?: Smoothing
  /** Setting this prop will smooth out the line with bézier curves. Value between 0 and 1. */
  tension?: number
  /** Data for the chart. Overrides optional data provided in `<Chart />`. */
  data?: ChartDataPoint[]
}

const Area: React.FC<Props> = (props) => {
  const { data: contextData, dimensions, domain } = React.useContext(ChartContext)

  const {
    theme: { gradient },
    data = contextData,
    tension,
    smoothing,
  } = deepmerge(defaultProps, props)

  if (!dimensions) {
    return null
  }

  const points = scalePointsToDimensions([...data], domain, dimensions)
  const pointsWithinDimensions = points.filter((p) => p.x >= 0 && p.x <= dimensions.width)

  const path = svgPath(pointsWithinDimensions, smoothing, tension)

  const closedPath = appendPointsToPath(path, [
    { x: dimensions.width, y: dimensions.height },
    { x: 0, y: dimensions.height },
  ])

  return (
    <React.Fragment>
      <Defs>
        <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <Stop offset="0%" stopColor={gradient.from.color} stopOpacity={gradient.from.opacity} />
          <Stop offset="100%" stopColor={gradient.to.color} stopOpacity={gradient.to.opacity} />
        </LinearGradient>
      </Defs>
      <Path d={closedPath} fill="url(#grad)" strokeWidth="0"></Path>
    </React.Fragment>
  )
}

export { Area }

const defaultProps = {
  theme: {
    gradient: {
      from: {
        color: 'red',
        opacity: 1,
      },
      to: {
        color: 'red',
        opacity: 0.2,
      },
    },
  },
  smoothing: 'none',
  tension: 0.3,
}
