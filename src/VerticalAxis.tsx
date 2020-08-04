import deepmerge from 'deepmerge'
import React, { useContext } from 'react'
import { Line, Text } from 'react-native-svg'
import ChartContext from './ChartContext'
import { Label, Stroke } from './types'
import { scalePointToDimensions } from './utils'
import { calculateTickValues } from './Axis.utils'

type Props = {
  theme?: {
    axis?: {
      visible?: boolean
      stroke?: Stroke
      dx?: number
    }
    ticks?: {
      visible?: boolean
      stroke?: Stroke
      length?: number
      dx?: number
    }
    labels?: {
      visible?: boolean
      label?: Label
      formatter?: (value: number) => string
    }
    grid?: {
      visible?: boolean
      stroke?: Stroke
    }
  }
  tickValues?: number[]
  tickCount?: number
}

const VerticalAxis: React.FC<Props> = (props) => {
  const {
    theme: { axis, ticks, grid, labels },
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
      {/* Render Axis */}
      {axis.visible && (
        <Line
          x1={axis.dx}
          y1={0}
          x2={axis.dx}
          y2={dimensions.height}
          stroke={axis.stroke.color}
          strokeWidth={axis.stroke.width}
          strokeOpacity={axis.stroke.opacity}
        />
      )}
      {finalTickValues.map((value) => {
        return (
          <>
            {/* Render Grid */}
            {grid.visible && (
              <Line
                key={`grid-${value}`}
                x1={0}
                y1={scalePointToDimensions({ x: 0, y: value }, domain, dimensions).y}
                x2={dimensions.width}
                y2={scalePointToDimensions({ x: 0, y: value }, domain, dimensions).y}
                stroke={grid.stroke.color}
                strokeWidth={grid.stroke.width}
                strokeOpacity={grid.stroke.opacity}
              />
            )}
            {/* Render Tick */}
            {ticks.visible && (
              <Line
                key={`tick-${value}`}
                x1={ticks.dx}
                y1={scalePointToDimensions({ x: 0, y: value }, domain, dimensions).y}
                x2={ticks.dx + ticks.length}
                y2={scalePointToDimensions({ x: 0, y: value }, domain, dimensions).y}
                stroke={ticks.stroke.color}
                strokeWidth={ticks.stroke.width}
                strokeOpacity={ticks.stroke.opacity}
              />
            )}
            {/* Render Label */}
            {labels.visible && (
              <Text
                key={`label-${value}`}
                x={labels.label.dx}
                y={labels.label.dy + scalePointToDimensions({ x: 0, y: value }, domain, dimensions).y}
                fontSize={labels.label.fontSize}
                fontWeight={labels.label.fontWeight}
                opacity={labels.label.opacity}
                textAnchor={labels.label.textAnchor}
              >
                {labels.formatter(value)}
              </Text>
            )}
          </>
        )
      })}
    </>
  )
}

export { VerticalAxis }

const defaultProps = {
  theme: {
    axis: {
      visible: true,
      stroke: {
        color: '#000',
        width: 1,
        opacity: 1,
      },
      dx: 0,
    },
    grid: {
      visible: true,
      stroke: {
        color: '#ccc',
        width: 1,
        opacity: 1,
      },
    },
    ticks: {
      visible: true,
      stroke: {
        color: '#000',
        width: 1,
        opacity: 1,
      },
      dx: 0,
      length: 6,
    },
    labels: {
      visible: true,
      label: {
        color: 'black',
        fontSize: 10,
        fontWeight: 'normal',
        textAnchor: 'end',
        opacity: 1,
        dx: -4,
        dy: 4,
      },
      formatter: (v: number) => String(v),
    },
  },
}
