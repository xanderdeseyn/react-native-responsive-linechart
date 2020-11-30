import deepmerge from 'deepmerge'
import * as React from 'react'
import { Defs, Stop, LinearGradient, Path, G } from 'react-native-svg'
import ChartContext from './ChartContext'
import { ChartDataPoint, Gradient, Smoothing } from './types'
import { appendPointsToPath, scalePointsToDimensions, svgPath } from './utils'

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
  const { data: contextData, dimensions, viewportDomain, viewportOrigin } = React.useContext(ChartContext)
  const [randomGradientRef] = React.useState(Math.random().toFixed(10).toString())

  const {
    theme: { gradient },
    data = contextData,
    tension,
    smoothing,
  } = deepmerge(defaultProps, props)

  if (!dimensions) {
    return null
  }

  const points = scalePointsToDimensions([...data], viewportDomain, dimensions)

  const path = svgPath(points, smoothing, tension)

  const firstPoint = points[0]
  const lastPoint = points[points.length - 1]

  const closedPath = appendPointsToPath(path, [
    { x: lastPoint.x, y: dimensions.height },
    { x: firstPoint.x, y: dimensions.height },
  ])

  return (
    <G translateX={viewportOrigin.x} translateY={viewportOrigin.y} mask="url(#Mask)">
      <Defs>
        <LinearGradient id={`grad${randomGradientRef}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <Stop offset="0%" stopColor={gradient.from.color} stopOpacity={gradient.from.opacity} />
          <Stop offset="100%" stopColor={gradient.to.color} stopOpacity={gradient.to.opacity} />
        </LinearGradient>
      </Defs>
      <Path d={closedPath} fill={`url(#grad${randomGradientRef})`} strokeWidth="0"></Path>
    </G>
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
