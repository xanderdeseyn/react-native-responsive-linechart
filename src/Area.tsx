import deepmerge from 'deepmerge'
import * as React from 'react'
import { Defs, Stop, LinearGradient, Path } from 'react-native-svg'
import Bezier from 'paths-js/bezier'
import Polygon from 'paths-js/polygon'
import ChartContext from './ChartContext'
import { ChartDataPoint, Gradient } from './types'
import { formatDataForSVG, scalePointsToDimensions } from './utils'

type Props = {
  /** Theme for the area */
  theme?: {
    gradient?: Gradient
  }
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
  } = deepmerge(defaultProps, props)

  if (!dimensions) {
    return null
  }

  const points = scalePointsToDimensions([...data], domain, dimensions)

  let path
  if (tension) {
    path = Bezier({ points: points.map((p) => [p.x, p.y]), tension })
      .path.lineto(dimensions.width, dimensions.height)
      .lineto(0, dimensions.height)
      .closepath()
  } else {
    path = Polygon({ points: points.map((p) => [p.x, p.y]) })
      .path.lineto(dimensions.width, dimensions.height)
      .lineto(0, dimensions.height)
      .closepath()
  }

  return (
    <React.Fragment>
      <Defs>
        <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <Stop offset="0%" stopColor={gradient.from.color} stopOpacity={gradient.from.opacity} />
          <Stop offset="100%" stopColor={gradient.to.color} stopOpacity={gradient.to.opacity} />
        </LinearGradient>
      </Defs>
      <Path d={path.print()} fill="url(#grad)" strokeWidth="0"></Path>
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
}
