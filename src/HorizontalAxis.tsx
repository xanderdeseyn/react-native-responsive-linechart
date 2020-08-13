import deepmerge from 'deepmerge'
import React, { useContext } from 'react'
import { Line, Text } from 'react-native-svg'
import ChartContext from './ChartContext'
import { Stroke, Label } from './types'
import { scalePointToDimensions } from './utils'
import { calculateTickValues } from './Axis.utils'

type Props = {
  theme?: {
    axis?: {
      visible?: boolean
      stroke?: Stroke
      dy?: number
    }
    ticks?: {
      visible?: boolean
      stroke?: Stroke
      length?: number
      dy?: number
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
  includeOriginTick?: boolean
}

const HorizontalAxis: React.FC<Props> = props => {
  const {
    theme: { axis, ticks, grid, labels },
    tickValues,
    tickCount,
    includeOriginTick
  } = deepmerge(defaultProps, props)

  const { dimensions, domain } = useContext(ChartContext)

  if (!dimensions) {
    return null
  }

  const finalTickValues = calculateTickValues(tickValues, tickCount, domain.x, includeOriginTick)

  console
  return (
    <>
      {/* Render Axis */}
      {axis.visible && (
        <Line
          x1={0}
          y1={dimensions.height - axis.dy}
          x2={dimensions.width}
          y2={dimensions.height - axis.dy}
          stroke={axis.stroke.color}
          strokeWidth={axis.stroke.width}
          strokeOpacity={axis.stroke.opacity}
        />
      )}
      {finalTickValues.map(value => {
        return (
          <React.Fragment key={value}>
            {/* Render Grid */}
            {grid.visible && (
              <Line
                key={`grid-${value}`}
                x1={scalePointToDimensions({ x: value, y: 0 }, domain, dimensions).x}
                y1={0}
                x2={scalePointToDimensions({ x: value, y: 0 }, domain, dimensions).x}
                y2={dimensions.height}
                stroke={grid.stroke.color}
                strokeWidth={grid.stroke.width}
                strokeOpacity={grid.stroke.opacity}
              />
            )}
            {/* Render Tick */}
            {ticks.visible && (
              <Line
                key={`tick-${value}`}
                x1={scalePointToDimensions({ x: value, y: 0 }, domain, dimensions).x}
                y1={dimensions.height - ticks.dy}
                x2={scalePointToDimensions({ x: value, y: 0 }, domain, dimensions).x}
                y2={dimensions.height - ticks.dy - ticks.length}
                stroke={ticks.stroke.color}
                strokeWidth={ticks.stroke.width}
                strokeOpacity={ticks.stroke.opacity}
              />
            )}
            {/* Render Label */}
            {labels.visible && (
              <Text
                x={labels.label.dx + scalePointToDimensions({ x: value, y: 0 }, domain, dimensions).x}
                y={dimensions.height - labels.label.dy}
                fontSize={labels.label.fontSize}
                fontWeight={labels.label.fontWeight}
                fill={labels.label.color}
                opacity={labels.label.opacity}
                textAnchor={labels.label.textAnchor}
              >
                {labels.formatter(value)}
              </Text>
            )}
          </React.Fragment>
        )
      })}
    </>
  )
}

export { HorizontalAxis }

const defaultProps = {
  theme: {
    axis: {
      visible: true,
      stroke: {
        color: '#bbb',
        width: 2,
        opacity: 1
      },
      dy: 0
    },
    grid: {
      visible: true,
      stroke: {
        color: '#ccc',
        width: 1,
        opacity: 1
      }
    },
    ticks: {
      visible: true,
      stroke: {
        color: '#000',
        width: 1,
        opacity: 1
      },
      dy: 0,
      length: 6,
      includeOriginTick: false
    },
    labels: {
      visible: true,
      label: {
        color: '#000',
        fontSize: 10,
        fontWeight: 300,
        textAnchor: 'middle',
        opacity: 1,
        dx: 0,
        dy: -12
      },
      formatter: (v: number) => String(v)
    }
  }
}
