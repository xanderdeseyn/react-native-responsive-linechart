import React from 'react'
import deepmerge from 'deepmerge'
import { View, ViewStyle } from 'react-native'
import _ from 'lodash'
import Svg, { G } from 'react-native-svg'
import { useComponentDimensions } from './useComponentDimensions'
import { AxisDomain, ChartData, Padding } from './types'
import { ChartContextProvider } from './ChartContext'

type Props = {
  style?: ViewStyle
  data: ChartData
  xDomain?: AxisDomain
  yDomain?: AxisDomain
  padding?: Padding
}

const Chart: React.FC<Props> = (props) => {
  const { style, children, data, padding, xDomain, yDomain } = deepmerge(computeDefaultProps(props.data), props)
  const { dimensions, onLayout } = useComponentDimensions()

  return (
    <View style={style} onLayout={onLayout}>
      <ChartContextProvider
        value={{
          data,
          domain: {
            x: xDomain,
            y: yDomain,
          },
          dimensions: dimensions
            ? {
                top: 0,
                left: 0,
                width: dimensions.width - padding.left - padding.right,
                height: dimensions.height - padding.left - padding.right,
              }
            : undefined,
        }}
      >
        {!!dimensions && (
          <View style={{ width: dimensions.width, height: dimensions.height }}>
            <Svg width={dimensions.width} height={dimensions.height}>
              <G translateX={padding.left} translateY={padding.top}>
                {children}
              </G>
            </Svg>
          </View>
        )}
      </ChartContextProvider>
    </View>
  )
}

export { Chart }

const computeDefaultProps = (data: ChartData) => ({
  padding: {
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  },
  xDomain: {
    min: _.minBy(data, (d) => d.x)!.x,
    max: _.maxBy(data, (d) => d.x)!.x,
  },
  yDomain: {
    min: _.minBy(data, (d) => d.y)!.y,
    max: _.maxBy(data, (d) => d.y)!.y,
  },
})
