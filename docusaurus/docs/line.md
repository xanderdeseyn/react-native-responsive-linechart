---

title: Line
id: line
route: /line

---

import { Chart, HorizontalAxis, Area, VerticalAxis, Line, BoxTooltip } from 'react-native-responsive-linechart'

This component draws a line. Multiple lines can be drawn on one chart.


## Line Props
| Prop        | Type | Required | Description
| ----------- | ----------- | ------------- | ------ |
| `data`      | `{ x: number, y: number, meta?: any }[]` | Yes* | Data for the chart. Overrides optional data provided in `<Chart />`.  |
| `tension`      | `number` | No | Setting this prop will smooth out the line with bézier curves. Value between 0 and 1, recommended somewhere around `0.3`. |
| `tooltipComponent`   | `JSX.Element` | No | Component to be used to draw tooltips. This library provides a basic tooltip with the `BoxTooltip` component. Example below.  |
| `theme`   | Defined below        | No | Theme for the line.  |

\* unless provided in parent `<Chart />` component

### Line default theme
Any part of this theme can be overridden through the `theme` prop.

```json
{
  stroke: {
    color: 'black',
    width: 1,
    opacity: 1
  }
}
```

## Examples



### Combined with area

<Chart
  style={{ height: 200, width: 400, marginBottom: 40 }}
  data={[
    { x: -2, y: 15 },
    { x: -1, y: 10 },
    { x: 0, y: 12 },
    { x: 1, y: 7 },
    { x: 2, y: 6 },
    { x: 3, y: 3 },
    { x: 4, y: 5 },
    { x: 5, y: 8 },
    { x: 6, y: 12 },
    { x: 7, y: 14 },
    { x: 8, y: 12 },
    { x: 9, y: 13.5 },
    { x: 10, y: 18 },
  ]}
  padding={{ left: 40, bottom: 20, right: 20, top: 20 }}
  xDomain={{ min: -2, max: 10 }}
  yDomain={{ min: -4, max: 20 }}
>
  <VerticalAxis tickCount={10} theme={{ labels: { formatter: (v) => v.toFixed(2) } }} />
  <HorizontalAxis tickCount={3} />
  <Area theme={{ gradient: { from: { color: '#44bd32' }, to: { color: '#44bd32', opacity: 0.2 } }}} />
  <Line theme={{ stroke: { color: '#44bd32', width: 10 } }} />
</Chart>

```jsx
<Chart
  style={{ height: 200, width: 400 }}
  data={[
    { x: -2, y: 15 },
    { x: -1, y: 10 },
    { x: 0, y: 12 },
    { x: 1, y: 7 },
    { x: 2, y: 6 },
    { x: 3, y: 3 },
    { x: 4, y: 5 },
    { x: 5, y: 8 },
    { x: 6, y: 12 },
    { x: 7, y: 14 },
    { x: 8, y: 12 },
    { x: 9, y: 13.5 },
    { x: 10, y: 18 },
  ]}
  padding={{ left: 40, bottom: 20, right: 20, top: 20 }}
  xDomain={{ min: -2, max: 10 }}
  yDomain={{ min: -4, max: 20 }}
>
  <VerticalAxis tickCount={10} theme={{ labels: { formatter: (v) => v.toFixed(2) } }} />
  <HorizontalAxis tickCount={3} />
  <Area theme={{ gradient: { from: { color: '#44bd32' }, to: { color: '#44bd32', opacity: 0.2 } }}} />
  <Line theme={{ stroke: { color: '#44bd32', width: 10 } }} />
</Chart>
```

### Multiple lines

<Chart
  style={{ height: 200, width: 400, marginBottom: 40 }}
  padding={{ left: 40, bottom: 20, right: 20, top: 20 }}
  xDomain={{ min: -2, max: 10 }}
  yDomain={{ min: 0, max: 20 }}
>
  <VerticalAxis
    tickCount={10}
    theme={{ labels: { formatter: (v) => v.toFixed(2) } }}
  />
  <HorizontalAxis  />
  <Line 
    theme={{ stroke: { color: 'red', width: 3 } }} 
    data={[
      { x: -2, y: 15 },
      { x: -1, y: 10 },
      { x: 0, y: 12 },
      { x: 5, y: 8 },
      { x: 6, y: 12 },
      { x: 9, y: 13.5 },
      { x: 10, y: 18 },
    ]} 
  />
  <Line 
    theme={{ stroke: { color: 'blue', width: 3 } }} 
    data={[
      { x: -2, y: 0 },
      { x: -1, y: 2 },
      { x: 0, y: 7 },
      { x: 2, y: 5 },
      { x: 3, y: 12 },
      { x: 7, y: 16 },
      { x: 9, y: 17 },
      { x: 10, y: 12 },
    ]} 
  />
</Chart>

```jsx
<Chart
  style={{ height: 200, width: 400}}
  padding={{ left: 40, bottom: 20, right: 20, top: 20 }}
  xDomain={{ min: -2, max: 10 }}
  yDomain={{ min: 0, max: 20 }}
>
  <VerticalAxis
    tickCount={10}
    theme={{ labels: { formatter: (v) => v.toFixed(2) } }}
  />
  <HorizontalAxis  />
  <Line 
    theme={{ stroke: { color: 'red', width: 3 } }} 
    data={[
      { x: -2, y: 15 },
      { x: -1, y: 10 },
      { x: 0, y: 12 },
      { x: 5, y: 8 },
      { x: 6, y: 12 },
      { x: 9, y: 13.5 },
      { x: 10, y: 18 },
    ]} 
  />
  <Line 
    theme={{ stroke: { color: 'blue', width: 3 } }} 
    data={[
      { x: -2, y: 0 },
      { x: -1, y: 2 },
      { x: 0, y: 7 },
      { x: 2, y: 5 },
      { x: 3, y: 12 },
      { x: 7, y: 16 },
      { x: 9, y: 17 },
      { x: 10, y: 12 },
    ]} 
  />
</Chart>
```

### Example with tooltip and large number of datapoints

![Tooltip example](/img/tooltip.png)

```jsx
<Chart
  style={{ height: 200, width: '100%', marginTop: 100 }}
  data={/* LOTS OF DATA */}
  padding={{ left: 40, bottom: 20, right: 20, top: 20 }}
  xDomain={{ min: 0, max: 500 }}
  yDomain={{ min: -4, max: 20 }}
>
  <VerticalAxis
    tickCount={10}
    theme={{
      axis: { stroke: { color: '#aaa', width: 2 } },
      ticks: { stroke: { color: '#aaa', width: 2 } },
      labels: { formatter: (v: number) => v.toFixed(2) },
    }}
  />
  <HorizontalAxis
    tickCount={9}
    theme={{
      axis: { stroke: { color: '#aaa', width: 2 } },
      ticks: { stroke: { color: '#aaa', width: 2 } },
      labels: { label: { rotation: 50 }, formatter: Math.round },
    }}
  />
  <Area />
  <Line theme={{ stroke: { color: 'red', width: 1 } }} tooltipComponent={<BoxTooltip theme={{ formatter: ({ y }) => y.toFixed(2) }} />} />
</Chart>
```