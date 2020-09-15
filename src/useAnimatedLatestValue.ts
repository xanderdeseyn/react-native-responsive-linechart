import React from 'react'
import { Animated } from 'react-native'

export const useAnimatedLatestValue = (animatedValue: Animated.Value, initial?: number) => {
  //If we're given an initial value then we can pretend we've received a value from the listener already
  const latestValueRef = React.useRef(initial ?? 0)
  const initialized = React.useRef(typeof initial == 'number')

  React.useEffect(() => {
    const id = animatedValue.addListener((v) => {
      //Store the latest animated value
      latestValueRef.current = v.value
      //Indicate that we've recieved a value
      initialized.current = true
    })

    //Return a deregister function to clean up
    return () => animatedValue.removeListener(id)

    //Note that the behavior here isn't 100% correct if the animatedValue changes -- the returned ref
    //may refer to the previous animatedValue's latest value until the new listener returns a value
  }, [animatedValue])

  return [latestValueRef, initialized] as const
}
