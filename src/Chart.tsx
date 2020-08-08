import React, { useState, useMemo } from 'react'
import deepmerge from 'deepmerge'
import { View, ViewStyle } from 'react-native'
import { GestureResponderEvent, PanResponder } from 'react-native'
import _ from 'lodash'
import Svg, { G } from 'react-native-svg'
import { useComponentDimensions } from './useComponentDimensions'
import { AxisDomain, ChartDataPoint, Padding, XYValue } from './types'
import { ChartContextProvider } from './ChartContext'
import { calculateDataDimensions } from './Chart.utils'

type Props = {
  style?: ViewStyle
  data?: ChartDataPoint[]
  xDomain?: AxisDomain
  yDomain?: AxisDomain
  padding?: Padding
}

const Chart: React.FC<Props> = (props) => {
  const { style, children, data = [], padding, xDomain, yDomain } = deepmerge(computeDefaultProps(props.data), props)
  const { dimensions, onLayout } = useComponentDimensions()
  const dataDimensions = calculateDataDimensions(dimensions, padding)

  const [lastTouch, setLastTouch] = useState<XYValue | undefined>(undefined)

  const handleTouchEvent = (evt: GestureResponderEvent) => {
    if (dataDimensions) {
      setLastTouch({
        x: _.clamp(evt.nativeEvent.locationX - padding.left, 0, dataDimensions.width),
        y: _.clamp(evt.nativeEvent.locationY - padding.top, 0, dataDimensions.height),
      })
    }
    return true
  }

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: handleTouchEvent,
        onPanResponderMove: handleTouchEvent,
        onStartShouldSetPanResponder: handleTouchEvent,
      }),
    []
  )

  return (
    <View style={style} onLayout={onLayout}>
      {!!dimensions && (
        <View style={{ width: dimensions.width, height: dimensions.height }} {...panResponder.panHandlers}>
          <ChartContextProvider
            value={{
              data,
              dimensions: dataDimensions,
              domain: {
                x: xDomain,
                y: yDomain,
              },
              lastTouch,
            }}
          >
            <Svg width={dimensions.width} height={dimensions.height}>
              <G translateX={padding.left} translateY={padding.top}>
                {children}
              </G>
            </Svg>
          </ChartContextProvider>
        </View>
      )}
    </View>
  )
}

export { Chart }

const computeDefaultProps = (data: ChartDataPoint[] = []) => ({
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
