---

title: Chart
id: chart
route: /chart

---

import { Chart, HorizontalAxis, VerticalAxis, Line, Area, Tooltip } from 'react-native-responsive-linechart'

This component should **always** be wrapped around any other component from this library, since it is responsible for constructing the chart context.

## Chart Props
| Prop        | Type | Required | Description
| ----------- | ----------- | ------------- | ------ |
| `data`      | `{ x: number, y: number, meta?: any }[]` | No | Chart data points to be passed to `Area` or `Line` children. Not required, and can be overridden in child components.  |
| `style`   | `ViewStyle`        | No | All styling can be used except for padding. If you need padding, use the explicit `padding` prop below  |
| `xDomain`   | `{ min: number, max: number }`        | Yes* | Domain for the horizontal (X) axis.  |
| `yDomain`   | `{ min: number, max: number }`        | Yes* | Domain for the horizontal (Y) axis.  |
| `padding`   | `{ left?: number; right?: number; top?: number; bottom?: number }`        | No | Padding of the chart. Use this instead of setting padding in the `style` prop.  |

\* Props can be left out if `data` prop is provided. Domain will automatically be set to the data bounds.

### Example

<Chart
  style={{ height: 200, width: 400, marginBottom: 40 }}
  data={[
    { x: -2, y: 15 },
    { x: -1, y: 10 },
    { x: 0, y: 12 },
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
  <VerticalAxis
    tickCount={10}
    theme={{ labels: { formatter: (v) => v.toFixed(2) } }}
  />
  <HorizontalAxis tickCount={3} />
  <Area theme={{ gradient: { from: { color: '#44bd32' }, to: { color: '#44bd32', opacity: 0.2 } }}} />
  <Line theme={{ stroke: { color: '#44bd32', width: 5 } }} />
</Chart>

```jsx
<Chart
  style={{ height: 200, width: 400 }}
  data={[
    { x: -2, y: 15 },
    { x: -1, y: 10 },
    { x: 0, y: 12 },
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
  <VerticalAxis
    tickCount={10}
    theme={{ labels: { formatter: (v) => v.toFixed(2) } }}
  />
  <HorizontalAxis tickCount={3} />
  <Area theme={{ gradient: { from: { color: '#44bd32' }, to: { color: '#44bd32', opacity: 0.2 } }}} />
  <Line theme={{ stroke: { color: '#44bd32', width: 5 } }} />
</Chart>
```

For more advanced examples, check out the Area and Line pages.