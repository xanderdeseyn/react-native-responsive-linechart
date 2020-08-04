import deepmerge from 'deepmerge'
import React, { useContext } from 'react'
import { Polyline } from 'react-native-svg'
import ChartContext from './ChartContext'
import { Stroke } from './types'
import { formatDataForSVG, scalePointsToDimensions } from './utils'

type Props = {
  theme?: {
    stroke?: Stroke
  }
}

const Line: React.FC<Props> = (props) => {
  const {
    theme: { stroke },
  } = deepmerge(defaultProps, props)
  const { data, dimensions, domain } = useContext(ChartContext)

  if (!dimensions) {
    return null
  }

  const points = scalePointsToDimensions(data, domain, dimensions)

  return (
    <Polyline
      fill="none"
      strokeLinecap="round"
      points={formatDataForSVG(points)}
      x={0}
      stroke={stroke.color}
      strokeWidth={stroke.width}
      strokeOpacity={stroke.opacity}
    />
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
