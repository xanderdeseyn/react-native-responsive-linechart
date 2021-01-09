---

title: Line
id: line
route: /line

---

This component draws a line. Multiple lines can be drawn on one chart.


## Line Props
| Prop        | Type | Required | Description
| ----------- | ----------- | ------------- | ------ |
| `data`      | `{ x: number, y: number, meta?: any }[]` | Yes* | Data for the chart. Overrides optional data provided in `<Chart />`.  |
| `smoothing`      | `"none"` \| `"cubic-spline"` \| `"bezier"` | No | `none` is just linear lines. `cubic-spline` is usually the most aesthetically pleasing smoothing. |
| `tension`      | `number` | No | Only works in combination with smoothing = `bezier`. Value between 0 and 1, recommended somewhere around `0.3`. |
| `tooltipComponent`   | `JSX.Element` | No | Component to be used to draw tooltips. This library provides a basic tooltip with the `Tooltip` component. Example below.  |
| `onTooltipSelect`   | `(value: { x: number, y: number, meta?: any }, index: number) => void` | No | Callback method that fires when a tooltip is displayed for a data point.  |
| `onTooltipSelectEnd`   | `() => void` | No | Callback method that fires when the user stopped touching the chart.  |
| `hideTooltipAfter`   | `false` | No | Defines a period in ms after which the tooltip should hide automatically.  |
| `hideTooltipOnDragEnd`   | `false` | No | Set to true if the tooltip should be hidden immediately when the user stops dragging the chart. (Only dragging, on tap the tooltip remains!)  |
| `initialTooltipIndex`      | `number` | No | Initial index for the tooltip. The tooltip will be immediately visible at this index on first render, without requiring user interaction. |
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
      width: 0,
      height: 0,
      dx: 0,
      dy: 0,
      rx: 0,
      color: 'black',
    },
    selected: {
      width: 0,
      height: 0,
      dx: 0,
      dy: 0,
      rx: 0,
      color: 'black'
    },
  },
}
```

the `scatter` theme defines how data points should be visualised. Optionally, you can change the visualisation when a data point is selected.

## Examples



### Combined with `<Area />` and using scatter points

![Chart example](/img/line/example1.png)

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
  <Line theme={{ stroke: { color: '#44bd32', width: 5 }, scatter: { default: { width: 8, height: 8, rx: 4, color: '#44ad32' }, selected: { color: 'red' } } }} />
</Chart>
```

### Multiple lines and `smoothing`

![Chart example](/img/line/example2.png)

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

### With `tooltipComponent` and large number of datapoints

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


### With `viewport` (scrollable chart)

![Tooltip example](/img/Scrollable.gif)

By setting the viewport to be smaller than the domain, you can make the chart scrollable. In this example, the viewport has a width of 5, while the x-domain has a range of 10. You can also change where the viewport initially starts with the `initialOrigin` attribute of the `viewport` prop. (Check [Chart props](chart.md#chart-props))

```jsx
<Chart
  style={{ height: 200, width: '100%' }}
  data={/* LOTS OF DATA */}
  padding={{ left: 40, bottom: 20, right: 20, top: 20 }}
  xDomain={{ min: 0, max: 10 }}
  yDomain={{ min: 0, max: 20 }}
  viewport={{ size: { width: 5 } }}
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
    tickValues={[0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20]}
    theme={{
      axis: { stroke: { color: '#aaa', width: 2 } },
      ticks: { stroke: { color: '#aaa', width: 2 } },
      labels: { label: { rotation: 50 }, formatter: (v) => v.toFixed(1) },
    }}
  />
  <Line
    theme={{
      stroke: { color: 'red', width: 2 },
    }}
    smoothing="cubic-spline"
  />
  <Area theme={{ gradient: { from: { color: '#f39c12', opacity: 0.4 }, to: { color: '#f39c12', opacity: 0.4 } } }} smoothing="cubic-spline" />
</Chart>
```