import { useState, useCallback } from 'react'
import { LayoutChangeEvent } from 'react-native'

export const useComponentDimensions = () => {
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | undefined>()

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout
    setDimensions({ width, height })
  }, [])

  return { dimensions, onLayout }
}
