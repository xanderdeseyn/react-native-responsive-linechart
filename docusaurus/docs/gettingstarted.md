---

title: Getting started
id: gettingstarted

---

If you are looking for the documentation of version 2, [you can find it here](https://github.com/react-native-community/react-native-svg).
Version 3 is a complete re-write from the ground up, in typescript.

## Installation

`npm install react-native-responsive-linechart` or `yarn add react-native-responsive-linechart`

This lib depends on [react-native-svg](https://github.com/react-native-community/react-native-svg) and [react-native-gesture-handler](https://github.com/software-mansion/react-native-gesture-handler), so make sure that is installed correctly.

## Getting started

Head over to the [Chart component](chart.md) to start learning the API, or check out the code below to get up and running quickly.

## Code example

For more advanced examples, check out the [Line](line.md) and [Area](area.md) docs.

![Chart example](/img/gettingstarted/example.png)


```jsx
import { Chart, Line, Area, HorizontalAxis, VerticalAxis } from 'react-native-responsive-linechart'

<Chart
  style={{ height: 200, width: 400 }}
  data={[
    { x: -2, y: 15 },
    { x: -1, y: 10 },
    { x: 0, y: 12 },
    { x: 1, y: 7 },
    { x: 2, y: 6 },
    { x: 3, y: 8 },
    { x: 4, y: 10 },
    { x: 5, y: 8 },
    { x: 6, y: 12 },
    { x: 7, y: 14 },
    { x: 8, y: 12 },
    { x: 9, y: 13.5 },
    { x: 10, y: 18 },
  ]}
  padding={{ left: 40, bottom: 20, right: 20, top: 20 }}
  xDomain={{ min: -2, max: 10 }}
  yDomain={{ min: 0, max: 20 }}
>
  <VerticalAxis tickCount={11} theme={{ labels: { formatter: (v) => v.toFixed(2) } }} />
  <HorizontalAxis tickCount={5} />
  <Area theme={{ gradient: { from: { color: '#ffa502' }, to: { color: '#ffa502', opacity: 0.4 } }}} />
  <Line theme={{ stroke: { color: '#ffa502', width: 5 }, scatter: { default: { width: 4, height: 4, rx: 2 }} }} />
</Chart>
```
