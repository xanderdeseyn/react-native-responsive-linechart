import React from 'react'
import deepmerge from 'deepmerge'
import { View, ViewStyle } from 'react-native'
import _ from 'lodash'
import Svg, { G } from 'react-native-svg'
import { useComponentDimensions } from './useComponentDimensions'
import { ChartData, Padding } from './types'
import { ChartContextProvider } from './ChartContext'

type Props = {
  style?: ViewStyle
  data: ChartData
  padding: Padding
}

const Chart: React.FC<Props> = (props) => {
  const { style, children, data, padding } = deepmerge(defaultProps, props)
  const { dimensions, onLayout } = useComponentDimensions()

  console.log(padding)

  return (
    <View style={style} onLayout={onLayout}>
      <ChartContextProvider
        value={{
          data,
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

const defaultProps = {
  padding: {
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  },
}
