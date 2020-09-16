---

title: Tooltip
id: tooltip
route: /tooltip

---

Tooltips can only be used in combination with a Line component.
**This library provides one example tooltip component `Tooltip`**. For advanced styling, it is recommended to implement your own Tooltip component.

## Tooltip Props
| Prop        | Type | Required | Description
| ----------- | ----------- | ------------- | ------ |
| `theme`   | Defined below        | No | Theme for the line.  |


### Tooltip default theme
Any part of this theme can be overridden through the `theme` prop.

```json
{
  label: {
    color: 'white',
    fontSize: 12,
    fontWeight: 700,
    textAnchor: 'middle',
    opacity: 1,
    dx: 0,
    dy: 16.5,
  },
  shape: {
    width: 30,
    height: 20,
    dx: 0,
    dy: 20,
    rx: 4,
    color: 'black',
  },
  formatter: (v: ChartDataPoint) => String(v.y),
},
```

## Creating your own Tooltip

Your tooltip component will be provided with the following props:

| Prop        | Type | Description
| ----------- | ----------- | ------------- | ------ |
| `value`      | `{ x: number, y: number, meta?: any }` | The value that the tooltip should represent.  |
| `position`   | `{ x: number, y: number }` | The exact position of the data point on the chart. You can offset your component from this position. Check out the source of `Tooltip` for an example.  |

You can then simply substitute `<Tooltip />` with your own component in the `tooltipComponent` prop!

## Examples

![Tooltip example](/img/Tooltip.gif)

```jsx
<Chart
  style={{ height: 200, width: '100%' }}
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
  <Area theme={{ gradient: { from: { color: '#44bd32' }, to: { color: '#44bd32', opacity: 0.2 } } }} />
  <Line
    tooltipComponent={<Tooltip />}
    theme={{ stroke: { color: '#44bd32', width: 5 }, scatter: { default: { width: 8, height: 8, rx: 4, color: '#44ad32' }, selected: { color: 'red' } } }}
  />
</Chart>
```
