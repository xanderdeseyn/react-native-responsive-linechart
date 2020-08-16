import * as React from 'react'
import deepmerge from 'deepmerge'
import { View, ViewStyle } from 'react-native'
import { GestureResponderEvent, PanResponder } from 'react-native'
import clamp from 'lodash.clamp'
import minBy from 'lodash.minby'
import maxBy from 'lodash.maxby'
import Svg, { G } from 'react-native-svg'
import { useComponentDimensions } from './useComponentDimensions'
import { AxisDomain, ChartDataPoint, Padding, XYValue } from './types'
import { ChartContextProvider } from './ChartContext'
import { calculateDataDimensions } from './Chart.utils'

type Props = {
  /** All styling can be used except for padding. If you need padding, use the explicit `padding` prop below.*/
  style?: ViewStyle
  /** Data to be used by `<Area />` or `<Line />` children. Not required, and can be overridden in Area or Line components. */
  data?: ChartDataPoint[]
  /** Domain for the horizontal (X) axis. */
  xDomain?: AxisDomain
  /** Domain for the vertical (Y) axis. */
  yDomain?: AxisDomain
  /** Padding of the chart. Use this instead of setting padding in the `style` prop. */
  padding?: Padding
}

const Chart: React.FC<Props> = props => {
  const { style, children, data = [], padding, xDomain, yDomain } = deepmerge(computeDefaultProps(props.data), props)
  const { dimensions, onLayout } = useComponentDimensions()
  const dataDimensions = calculateDataDimensions(dimensions, padding)

  const [lastTouch, setLastTouch] = React.useState<XYValue | undefined>(undefined)

  const handleTouchEvent = (evt: GestureResponderEvent) => {
    if (dataDimensions) {
      setLastTouch({
        x: clamp(evt.nativeEvent.locationX - padding.left, 0, dataDimensions.width),
        y: clamp(evt.nativeEvent.locationY - padding.top, 0, dataDimensions.height)
      })
    }
    return true
  }

  const panResponder = React.useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: handleTouchEvent,
        onPanResponderMove: handleTouchEvent,
        onStartShouldSetPanResponder: handleTouchEvent
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
                y: yDomain
              },
              lastTouch
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
    right: 0
  },
  xDomain: {
    min: data.length > 0 ? minBy(data, d => d.x)!.x : 0,
    max: data.length > 0 ? maxBy(data, d => d.x)!.x : 10
  },
  yDomain: {
    min: data.length > 0 ? minBy(data, d => d.y)!.y : 0,
    max: data.length > 0 ? maxBy(data, d => d.y)!.y : 10
  }
})
