import deepmerge from 'deepmerge'
import * as React from 'react'
import { G, Line, Text } from 'react-native-svg'
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
  includeOriginTick?: boolean
}

const VerticalAxis: React.FC<Props> = (props) => {
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
  const finalTickValues = calculateTickValues(tickValues, tickCount, domain.y, includeOriginTick).filter(
    (v) => Math.fround(v) >= Math.fround(viewportDomain.y.min) && Math.fround(v) <= Math.fround(viewportDomain.y.max)
  )

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
          strokeDasharray={axis.stroke.dashArray.length > 0 ? axis.stroke.dashArray.join(',') : undefined}
        />
      )}
      {finalTickValues.map((value) => {
        return (
          <React.Fragment key={value}>
            {/* Render Grid */}
            {grid.visible && (
              <Line
                x1={0}
                y1={scalePointToDimensions({ x: 0, y: value }, viewportDomain, dimensions).y}
                x2={dimensions.width}
                y2={scalePointToDimensions({ x: 0, y: value }, viewportDomain, dimensions).y}
                stroke={grid.stroke.color}
                strokeWidth={grid.stroke.width}
                strokeOpacity={grid.stroke.opacity}
                strokeDasharray={grid.stroke.dashArray.length > 0 ? grid.stroke.dashArray.join(',') : undefined}
              />
            )}
            {/* Render Tick */}
            {ticks.visible && (
              <Line
                x1={ticks.dx}
                y1={scalePointToDimensions({ x: 0, y: value }, viewportDomain, dimensions).y}
                x2={ticks.dx + ticks.length}
                y2={scalePointToDimensions({ x: 0, y: value }, viewportDomain, dimensions).y}
                stroke={ticks.stroke.color}
                strokeWidth={ticks.stroke.width}
                strokeOpacity={ticks.stroke.opacity}
              />
            )}
            {/* Render Label */}
            {labels.visible && (
              <G translateX={labels.label.dx} translateY={labels.label.dy + scalePointToDimensions({ x: 0, y: value }, viewportDomain, dimensions).y}>
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

export { VerticalAxis }

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
      dx: 0,
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
      dx: 0,
      length: 6,
    },
    labels: {
      visible: true,
      label: {
        color: '#000',
        fontSize: 10,
        fontWeight: 300,
        textAnchor: 'end',
        opacity: 1,
        dx: -4,
        dy: 4,
        rotation: 0,
      },
      formatter: (v: number) => String(v),
    },
  },
}
