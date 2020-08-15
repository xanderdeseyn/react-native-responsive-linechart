import deepmerge from 'deepmerge'
import React, { useContext } from 'react'
import { Defs, Stop, LinearGradient, Polygon } from 'react-native-svg'
import ChartContext from './ChartContext'
import { ChartDataPoint, Gradient } from './types'
import { formatDataForSVG, scalePointsToDimensions } from './utils'

type Props = {
  /** Theme for the area */
  theme?: {
    gradient?: Gradient
  }
  /** Data for the chart. Overrides optional data provided in `<Chart />`. */
  data?: ChartDataPoint[]
}

const Area: React.FC<Props> = props => {
  const { data: contextData, dimensions, domain } = useContext(ChartContext)

  const {
    theme: { gradient },
    data = contextData
  } = deepmerge(defaultProps, props)

  if (!dimensions) {
    return null
  }

  const points = scalePointsToDimensions([...data, { x: domain.x.max, y: domain.y.min }, { x: domain.x.min, y: domain.y.min }], domain, dimensions)

  return (
    <React.Fragment>
      <Defs>
        <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <Stop offset="0%" stopColor={gradient.from.color} stopOpacity={gradient.from.opacity} />
          <Stop offset="100%" stopColor={gradient.to.color} stopOpacity={gradient.to.opacity} />
        </LinearGradient>
      </Defs>
      <Polygon x={0} points={formatDataForSVG(points)} fill="url(#grad)" strokeWidth="0" />
    </React.Fragment>
  )
}

export { Area }

const defaultProps = {
  theme: {
    gradient: {
      from: {
        color: 'red',
        opacity: 1
      },
      to: {
        color: 'red',
        opacity: 0.2
      }
    }
  }
}
