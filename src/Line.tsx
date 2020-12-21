import deepmerge from 'deepmerge'
import * as React from 'react'
import { G, Path, Rect } from 'react-native-svg'

import ChartContext from './ChartContext'
import { adjustPointsForThickStroke, calculateTooltipIndex } from './Line.utils'
import { ChartDataPoint, Smoothing, Stroke, Shape } from './types'
import { scalePointsToDimensions, svgPath } from './utils'

type Props = {
  /** Theme for the line */
  theme?: {
    stroke?: Stroke
    scatter?: {
      default?: Shape
      selected?: Shape
    }
  }
  smoothing?: Smoothing
  /** Only works in combination with smoothing='bezier'. Value between 0 and 1. */
  tension?: number
  /** Component to render tooltips. An example component is included: <Tooltip />. */
  tooltipComponent?: JSX.Element
  /** Callback method that fires when a tooltip is displayed for a data point. */
  onTooltipSelect?: (value: ChartDataPoint, index: number) => void
  /** Callback method that fires when the user stopped touching the chart. */
  onTooltipSelectEnd?: () => void
  /** Data for the chart. Overrides optional data provided in `<Chart />`. */
  data?: ChartDataPoint[]
}

const Line: React.FC<Props> = (props) => {
  const { data: contextData, dimensions, viewportDomain, viewportOrigin, domain, lastTouch } = React.useContext(ChartContext)
  const [tooltipIndex, setTooltipIndex] = React.useState<number | undefined>(undefined)

  const {
    theme: { stroke, scatter },
    tooltipComponent,
    data = contextData,
    tension,
    smoothing,
    onTooltipSelect,
    onTooltipSelectEnd = () => {},
  } = deepmerge(defaultProps, props)

  if (!dimensions) {
    return null
  }

  React.useEffect(() => {
    const scaledPoints = scalePointsToDimensions(data, viewportDomain, dimensions)
    const newIndex = calculateTooltipIndex(scaledPoints, lastTouch)

    if (tooltipIndex !== undefined && newIndex === undefined && !lastTouch) {
      onTooltipSelectEnd()
    }

    if (newIndex !== tooltipIndex) {
      setTooltipIndex(newIndex)
      if (typeof onTooltipSelect === 'function' && typeof newIndex === 'number' && data.length > newIndex) {
        onTooltipSelect(data[newIndex], newIndex)
      }
    }
  }, [data, viewportDomain, domain, dimensions, lastTouch])

  const scaledPoints = scalePointsToDimensions(data, viewportDomain, dimensions)
  const points = adjustPointsForThickStroke(scaledPoints, stroke)
  const path = svgPath(points, smoothing, tension)

  return (
    <React.Fragment>
      <G translateX={viewportOrigin.x} translateY={viewportOrigin.y}>
        <Path d={path} fill="none" strokeLinecap="round" stroke={stroke.color} strokeWidth={stroke.width} strokeOpacity={stroke.opacity} mask="url(#Mask)" />
        {points.map((p, i) => {
          const shape = i === tooltipIndex ? deepmerge(scatter.default, scatter.selected) : scatter.default
          // Don't render if point falls out of viewport
          if (data[i].x < viewportDomain.x.min || data[i].x > viewportDomain.x.max || data[i].y < viewportDomain.y.min || data[i].y > viewportDomain.y.max) {
            return null
          }
          // Don't render if shape has no dimensions
          if (shape.width === 0 || shape.height === 0) {
            return null
          }

          return (
            <Rect
              key={JSON.stringify(p)}
              x={p.x - shape.width / 2 + shape.dx}
              y={p.y - shape.height / 2 - shape.dy}
              rx={shape.rx}
              fill={shape.color}
              opacity={shape.opacity}
              height={shape.height}
              width={shape.width}
            />
          )
        })}
      </G>
      {tooltipIndex !== undefined &&
        tooltipComponent &&
        React.cloneElement(tooltipComponent, { value: data[tooltipIndex], position: scaledPoints[tooltipIndex] })}
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
    scatter: {
      default: {
        width: 0,
        height: 0,
        dx: 0,
        dy: 0,
        rx: 0,
        color: 'black',
      },
      selected: {},
    },
  },
  tension: 0.3,
  smoothing: 'none',
}
