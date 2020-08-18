import deepmerge from 'deepmerge'
import * as React from 'react'
import { Text, Rect } from 'react-native-svg'
import ChartContext from './ChartContext'
import { ChartDataPoint, Label, Box, XYValue } from './types'

type Props = {
  theme?: {
    label?: Label
    box?: Box
    formatter?: (value: ChartDataPoint) => string
  }
  value?: ChartDataPoint
  position?: XYValue
}

const BoxTooltip: React.FC<Props> = (props) => {
  const { dimensions } = React.useContext(ChartContext)

  const {
    theme: { label, formatter, box },
    value,
    position,
  } = deepmerge(defaultProps, props)

  if (!dimensions || !value || !position) {
    return null
  }

  return (
    <React.Fragment>
      <Rect
        x={position.x - box.width / 2 + box.dx}
        y={position.y - box.height / 2 - box.dy}
        rx={box.rx}
        fill={box.color}
        opacity={box.opacity}
        height={box.height}
        width={box.width}
      />
      <Text
        x={position.x + label.dx}
        y={position.y - label.dy}
        fontSize={label.fontSize}
        fontWeight={label.fontWeight}
        fill={label.color}
        opacity={label.opacity}
        textAnchor={label.textAnchor}
      >
        {formatter(value)}
      </Text>
    </React.Fragment>
  )
}

export { BoxTooltip }

const defaultProps = {
  theme: {
    label: {
      color: 'white',
      fontSize: 12,
      fontWeight: 700,
      textAnchor: 'middle',
      opacity: 1,
      dx: 0,
      dy: 16.5,
    },
    box: {
      width: 35,
      height: 20,
      dx: 0,
      dy: 20,
      rx: 4,
      color: 'black',
    },
    formatter: (v: ChartDataPoint) => String(v.y),
  },
}
