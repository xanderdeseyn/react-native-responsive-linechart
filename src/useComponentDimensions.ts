import * as React from 'react'
import { LayoutChangeEvent } from 'react-native'

export const useComponentDimensions = () => {
  const [dimensions, setDimensions] = React.useState<{ width: number; height: number } | undefined>()

  const onLayout = React.useCallback((event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout
    setDimensions({ width, height })
  }, [])

  return { dimensions, onLayout }
}
