import deepmerge from 'deepmerge'
import React, { useContext } from 'react'
import { Text, Rect } from 'react-native-svg'
import ChartContext from './ChartContext'
import { ChartDataPoint, Label } from './types'
import { scalePointToDimensions } from './utils'

type Props = {
  theme?: {
    label?: Label
    formatter?: (value: ChartDataPoint) => string
  }
  value: ChartDataPoint
}

const BoxTooltip: React.FC<Props> = (props) => {
  const { dimensions, domain } = useContext(ChartContext)

  const {
    theme: { label, formatter },
    value,
  } = deepmerge(defaultProps, props)

  if (!dimensions) {
    return null
  }

  return (
    <React.Fragment>
      <Text
        x={scalePointToDimensions(value, domain, dimensions).x}
        y={scalePointToDimensions(value, domain, dimensions).y}
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
      color: '#000',
      fontSize: 10,
      fontWeight: 300,
      textAnchor: 'middle',
      opacity: 1,
      dx: 0,
      dy: -12,
    },
    formatter: (v: ChartDataPoint) => String(v.y),
  },
}
