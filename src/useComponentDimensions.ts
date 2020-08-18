import * as React from 'react'
import { LayoutChangeEvent } from 'react-native'

export const useComponentDimensions = () => {
  console.log('in component dimenseions')
  const [dimensions, setDimensions] = React.useState<{ width: number; height: number } | undefined>()
  console.log('after use state')

  const onLayout = React.useCallback((event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout
    setDimensions({ width, height })
  }, [])

  return { dimensions, onLayout }
}
