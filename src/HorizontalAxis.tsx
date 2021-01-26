import deepmerge from 'deepmerge'
import * as React from 'react'
import { Line, Text, G } from 'react-native-svg'
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

const HorizontalAxis: React.FC<Props> = (props) => {
  const {
    theme: { axis, ticks, grid, labels },
    tickValues,
    tickCount,
    includeOriginTick,
  } = deepmerge(defaultProps, props)

  const { dimensions, viewportDomain, domain } = React.useContext(ChartContext)

  if (!dimensions) {
    return null
  }

  // fround is used because of potential float comparison errors, see https://github.com/N1ghtly/react-native-responsive-linechart/issues/53
  const finalTickValues = calculateTickValues(tickValues, tickCount, domain.x, includeOriginTick).filter(
    (v) => Math.fround(v) >= Math.fround(viewportDomain.x.min) && Math.fround(v) <= Math.fround(viewportDomain.x.max)
  )

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
          strokeDasharray={axis.stroke.dashArray.length > 0 ? axis.stroke.dashArray.join(',') : undefined}
        />
      )}
      {finalTickValues.map((value) => {
        return (
          <React.Fragment key={value}>
            {/* Render Grid */}
            {grid.visible && (
              <Line
                key={`grid-${value}`}
                x1={scalePointToDimensions({ x: value, y: 0 }, viewportDomain, dimensions).x}
                y1={0}
                x2={scalePointToDimensions({ x: value, y: 0 }, viewportDomain, dimensions).x}
                y2={dimensions.height}
                stroke={grid.stroke.color}
                strokeWidth={grid.stroke.width}
                strokeOpacity={grid.stroke.opacity}
                strokeDasharray={grid.stroke.dashArray.length > 0 ? grid.stroke.dashArray.join(',') : undefined}
              />
            )}
            {/* Render Tick */}
            {ticks.visible && (
              <Line
                key={`tick-${value}`}
                x1={scalePointToDimensions({ x: value, y: 0 }, viewportDomain, dimensions).x}
                y1={dimensions.height - ticks.dy}
                x2={scalePointToDimensions({ x: value, y: 0 }, viewportDomain, dimensions).x}
                y2={dimensions.height - ticks.dy - ticks.length}
                stroke={ticks.stroke.color}
                strokeWidth={ticks.stroke.width}
                strokeOpacity={ticks.stroke.opacity}
              />
            )}
            {/* Render Label */}
            {labels.visible && (
              <G
                translateX={labels.label.dx + scalePointToDimensions({ x: value, y: 0 }, viewportDomain, dimensions).x}
                translateY={dimensions.height - labels.label.dy}
              >
                <Text
                  fontSize={labels.label.fontSize}
                  fontWeight={labels.label.fontWeight}
                  fontFamily={labels.label.fontFamily}
                  fill={labels.label.color}
                  opacity={labels.label.opacity}
                  textAnchor={labels.label.textAnchor}
                  rotation={labels.label.rotation}
                >
                  {labels.formatter(value)}
                </Text>
              </G>
            )}
          </React.Fragment>
        )
      })}
    </>
  )
}

export { HorizontalAxis }

const defaultProps = {
  includeOriginTick: true,
  theme: {
    axis: {
      visible: true,
      stroke: {
        color: '#bbb',
        width: 2,
        opacity: 1,
        dashArray: [],
      },
      dy: 0,
    },
    grid: {
      visible: true,
      stroke: {
        color: '#ccc',
        width: 1,
        opacity: 1,
        dashArray: [],
      },
    },
    ticks: {
      visible: true,
      stroke: {
        color: '#000',
        width: 1,
        opacity: 1,
      },
      dy: 0,
      length: 6,
      includeOriginTick: false,
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
        dy: -12,
        rotation: 0,
      },
      formatter: (v: number) => String(v),
    },
  },
}
