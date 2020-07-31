import React, { useState } from 'react'
import spline from 'cubic-spline'
import deepmerge from 'deepmerge'
import { View, PanResponder, ViewStyle } from 'react-native'
import memoizeOne from 'memoize-one'
import _ from 'lodash'
import Svg, { Rect } from 'react-native-svg'
import { useComponentDimensions } from './useComponentDimensions'
import { ChartConfig } from './types'

type Props = {
  config: ChartConfig
  style?: ViewStyle
}

const NewLineChart: React.FC<Props> = ({ config, style }) => {
  const { dimensions, onLayout } = useComponentDimensions()
  const [tooltipIndex, setTooltipIndex] = useState<number | undefined>(undefined)

  return (
    <View style={style} onLayout={onLayout}>
      {dimensions && (
        <Svg width={dimensions.width} height={dimensions.height}>
          <Rect x="0" y="0" width={dimensions.width} height={dimensions.height} fill={config.backgroundColor} fillOpacity={config.backgroundOpacity} />
        </Svg>
      )}
    </View>
  )
}

export { NewLineChart }
