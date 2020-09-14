---

title: Line
id: line
route: /line

---

import { Chart, HorizontalAxis, Area, VerticalAxis, Line, Tooltip } from 'react-native-responsive-linechart'

This component draws a line. Multiple lines can be drawn on one chart.


## Line Props
| Prop        | Type | Required | Description
| ----------- | ----------- | ------------- | ------ |
| `data`      | `{ x: number, y: number, meta?: any }[]` | Yes* | Data for the chart. Overrides optional data provided in `<Chart />`.  |
| `smoothing`      | "none" \| "cubic-spline" \| "bezier" | No | `none` is just linear lines. `cubic-spline` is usually the most aesthetically pleasing smoothing. |
| `tension`      | `number` | No | Only works in combination with smoothing='bezier'. Value between 0 and 1, recommended somewhere around `0.3`. |
| `tooltipComponent`   | `JSX.Element` | No | Component to be used to draw tooltips. This library provides a basic tooltip with the `Tooltip` component. Example below.  |
| `onTooltipSelect`   | `(value: { x: number, y: number, meta?: any }, index: number) => void` | No | Callback method that fires when a tooltip is displayed for a data point.  |
| `theme`   | Defined below        | No | Theme for the line.  |

\* unless provided in parent `<Chart />` component

### Line default theme
Any part of this theme can be overridden through the `theme` prop.

```json
{
  stroke: {
    color: 'black',
    width: 1,
    opacity: 1,
  },
  scatter: {
    default: {
      width: 8,
      height: 8,
      dx: 0,
      dy: 0,
      rx: 4,
      color: 'black',
    },
    selected: {
      color: 'red',
    },
  },
}
```

the `scatter` theme defines how data points should be visualised. Optionally, you can change the visualisation when a data point is selected (with tooltip).

## Examples



### Combined with `<Area />`

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
  <Line theme={{ stroke: { color: '#44bd32', width: 10 }, scatter: { default: { width: 4, height: 4, radius: 2 }, selected: { color: 'red' } } }} />
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

### Multiple lines and `smoothing`

<Chart
  style={{ height: 200, width: '100%', marginBottom: 40 }}
  data={[
    { x: 5, y: 15 },
    { x: 6, y: 6 },
    { x: 7, y: 15 },
    { x: 8, y: 3 },
  ]}
  padding={{ left: 40, bottom: 20, right: 20, top: 20 }}
  xDomain={{ min: 5, max: 8 }}
>
  <VerticalAxis
    tickValues={[0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20]}
    theme={{
      axis: { stroke: { color: '#aaa', width: 2 } },
      ticks: { stroke: { color: '#aaa', width: 2 } },
      labels: { formatter: (v) => v.toFixed(2) },
    }}
  />
  <HorizontalAxis
    tickCount={9}
    theme={{
      axis: { stroke: { color: '#aaa', width: 2 } },
      ticks: { stroke: { color: '#aaa', width: 2 } },
      labels: { label: { rotation: 50 }, formatter: (v) => v.toFixed(1) },
    }}
  />
  <Line theme={{ stroke: { color: 'red', width: 2 } }} />
  <Line smoothing="bezier" tension={0.15} theme={{ stroke: { color: 'blue', width: 2 } }} />
  <Line smoothing="bezier" tension={0.3} theme={{ stroke: { color: 'green', width: 2 } }} />
  <Line smoothing="cubic-spline" tension={0.3} theme={{ stroke: { color: 'orange', width: 2 } }} />
</Chart>

```jsx
<Chart
  style={{ height: 200, width: '100%', marginTop: 40 }}
  data={[
  { x: 5, y: 15 },
  { x: 6, y: 6 },
  { x: 7, y: 15 },
  { x: 8, y: 3 },
]}
  padding={{ left: 40, bottom: 20, right: 20, top: 20 }}
  xDomain={{ min: 5, max: 8 }}
>
  <VerticalAxis
    tickValues={[0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20]}
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
      labels: { label: { rotation: 50 }, formatter: (v) => v.toFixed(1) },
    }}
  />
  <Line theme={{ stroke: { color: 'red', width: 2 } }} />
  <Line smoothing="bezier" tension={0.15} theme={{ stroke: { color: 'blue', width: 2 } }} />
  <Line smoothing="bezier" tension={0.3} theme={{ stroke: { color: 'green', width: 2 } }} />
  <Line smoothing="cubic-spline" tension={0.3} theme={{ stroke: { color: 'orange', width: 2 } }} />
</Chart>
</Container>
```

### Example with `tooltipComponent` and large number of datapoints

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
  <Line theme={{ stroke: { color: 'red', width: 1 } }} tooltipComponent={<Tooltip theme={{ formatter: ({ y }) => y.toFixed(2) }} />} />
</Chart>
```