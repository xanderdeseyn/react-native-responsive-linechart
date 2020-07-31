import deepmerge from 'deepmerge'
import React, { useContext } from 'react'
import { Polyline } from 'react-native-svg'
import ChartContext from './ChartContext'
import { Padding } from './types'
import { formatDataForSVG, scalePointsToDimensions } from './utils'

type Props = {
  strokeColor?: string
  strokeWidth?: number
  padding?: Padding
}

const Line: React.FC<Props> = (props) => {
  const { strokeColor, strokeWidth } = deepmerge(defaultProps, props)
  const { data, dimensions, domain } = useContext(ChartContext)

  if (!dimensions) {
    return null
  }

  const points = scalePointsToDimensions(data, domain, dimensions)

  return <Polyline fill="none" strokeLinecap="round" points={formatDataForSVG(points)} x={0} stroke={strokeColor} strokeWidth={strokeWidth} />
}

export { Line }

const defaultProps = {
  strokeColor: '#000',
  strokeWidth: 1,
  padding: { left: 0, right: 0, top: 0, bottom: 0 },
}
