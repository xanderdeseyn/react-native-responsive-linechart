import deepmerge from 'deepmerge'
import React, { useContext } from 'react'
import { Line } from 'react-native-svg'
import ChartContext from './ChartContext'
import { Stroke } from './types'
import { scalePointToDimensions } from './utils'
import { calculateTickValues } from './VerticalAxis.utils'

type Props = {
  theme?: {
    axis?: {
      stroke?: Stroke
      dx?: number
    }
    ticks?: {
      stroke?: Stroke
      length?: number
      dx?: number
    }
  }
  tickValues?: number[]
  tickCount?: number
}

const VerticalAxis: React.FC<Props> = (props) => {
  const {
    theme: { axis, ticks },
    tickValues,
    tickCount,
  } = deepmerge(defaultProps, props)

  const { dimensions, domain } = useContext(ChartContext)

  if (!dimensions) {
    return null
  }

  const finalTickValues = calculateTickValues(tickValues, tickCount, domain.y)

  return (
    <>
      <Line
        x1={axis.dx}
        y1={0}
        x2={axis.dx}
        y2={dimensions.height}
        stroke={axis.stroke.color}
        strokeWidth={axis.stroke.width}
        strokeOpacity={axis.stroke.opacity}
      />
      {finalTickValues.map((value) => {
        return (
          <Line
            key={value}
            x1={ticks.dx}
            y1={scalePointToDimensions({ x: 0, y: value }, domain, dimensions).y}
            x2={ticks.dx + ticks.length}
            y2={scalePointToDimensions({ x: 0, y: value }, domain, dimensions).y}
            stroke={ticks.stroke.color}
            strokeWidth={ticks.stroke.width}
            strokeOpacity={ticks.stroke.opacity}
          />
        )
      })}
    </>
  )
}

export { VerticalAxis }

const defaultProps = {
  theme: {
    axis: {
      stroke: {
        color: '#000',
        width: 1,
        opacity: 1,
      },
      dx: 0,
    },
    ticks: {
      stroke: {
        color: '#000',
        width: 1,
        opacity: 1,
      },
      dx: 0,
      length: 6,
    },
  },
}
