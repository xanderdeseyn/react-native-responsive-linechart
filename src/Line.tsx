import deepmerge from 'deepmerge'
import React, { useContext } from 'react'
import { Polyline } from 'react-native-svg'
import ChartContext from './ChartContext'
import { Stroke } from './types'
import { formatDataForSVG, scalePointsToDimensions } from './utils'

type Props = {
  style?: {
    stroke?: Stroke
  }
}

const Line: React.FC<Props> = (props) => {
  const {
    style: { stroke },
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
  style: {
    stroke: {
      color: 'black',
      width: 1,
      opacity: 1,
    },
  },
}
