import deepmerge from 'deepmerge'
import * as React from 'react'
import { Path } from 'react-native-svg'
import Bezier from 'paths-js/bezier'
import Polygon from 'paths-js/polygon'
import ChartContext from './ChartContext'
import { adjustPointsForThickStroke, calculateTooltipIndex } from './Line.utils'
import { ChartDataPoint, Stroke } from './types'
import { scalePointsToDimensions } from './utils'

type Props = {
  /** Theme for the line */
  theme?: {
    stroke?: Stroke
  }
  /** Setting this prop will smooth out the line with bézier curves. Value between 0 and 1. */
  tension?: number
  /** Component to render tooltips. An example component is included: <BoxTooltip />. */
  tooltipComponent?: JSX.Element
  /** Data for the chart. Overrides optional data provided in `<Chart />`. */
  data?: ChartDataPoint[]
}

const Line: React.FC<Props> = (props) => {
  const { data: contextData, dimensions, domain, lastTouch } = React.useContext(ChartContext)

  const {
    theme: { stroke },
    tooltipComponent,
    data = contextData,
    tension,
  } = deepmerge(defaultProps, props)

  if (!dimensions) {
    return null
  }

  const scaledPoints = scalePointsToDimensions(data, domain, dimensions)
  const tooltipIndex = calculateTooltipIndex(scaledPoints, lastTouch)

  const points = adjustPointsForThickStroke(scaledPoints, stroke)

  let path
  if (tension) {
    path = Bezier({ points: points.map((p) => [p.x, p.y]), tension }).path
  } else {
    path = Polygon({ points: points.map((p) => [p.x, p.y]) }).path
  }

  return (
    <React.Fragment>
      <Path d={path.print()} fill="none" strokeLinecap="round" stroke={stroke.color} strokeWidth={stroke.width} strokeOpacity={stroke.opacity}></Path>
      {tooltipIndex !== undefined && React.cloneElement(tooltipComponent, { value: data[tooltipIndex], position: points[tooltipIndex] })}
    </React.Fragment>
  )
}

export { Line }

const defaultProps = {
  theme: {
    stroke: {
      color: 'black',
      width: 1,
      opacity: 1,
    },
  },
}
