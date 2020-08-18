---

title: HorizontalAxis
id: horizontalaxis
route: /horizontalaxis

---

import { Chart, HorizontalAxis, Area, VerticalAxis, Line, BoxTooltip } from '../../src'


This component draws an axis on the X plane.


## HorizontalAxis Props
| Prop        | Type | Required | Description
| ----------- | ----------- | ------------- | ------ |
| `tickValues`      | `number[]` | No | Use this to explicitly set the ticks which should be drawn on the axis. |
| `tickCount`      | `number[]` | No | Use this if you always want to render X amount of ticks on the axis. The lib will calculate the tick values itself. |
| `includeOriginTick`   | `boolean` | No | Only relevant in combination with the `tickCount` prop. Defaults to `true`. Check example below.  |
| `theme`   | Defined below        | No | Theme for the line.  |

### HorizontalAxis default theme
Any part of this theme can be overridden through the `theme` prop.

```json
{
  axis: {
    visible: true,
    stroke: {
      color: '#bbb',
      width: 2,
      opacity: 1,
    },
    dy: 0,
  },
  grid: {
    visible: true,
    stroke: {
      color: '#ccc',
      width: 1,
      opacity: 1,
    },
  },
  ticks: {
    visible: true,
    stroke: {
      color: '#000',
      width: 1,
      opacity: 1,
    },
    dy: 0,
    length: 6,
    includeOriginTick: false,
  },
  labels: {
    visible: true,
    label: {
      color: '#000',
      fontSize: 10,
      fontWeight: 300,
      textAnchor: 'middle',
      opacity: 1,
      dx: 0,
      dy: -12,
      rotation: 0,
    },
    formatter: (v: number) => String(v),
  },
}
```

## Examples



### with `tickValues`

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
  <HorizontalAxis tickValues={[-2, 0, 2, 6, 8, 10]} />
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
  <HorizontalAxis tickValues={[-2, 0, 2, 6, 8, 10]} />
  <Line theme={{ stroke: { color: '#44bd32', width: 10 } }} />
</Chart>
```

### with `tickCount` and `includeOriginTick=false`

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
  <HorizontalAxis tickCount={5} theme={{ labels: { formatter: (v) => v.toFixed(2) } }} includeOriginTick={false} />
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
  <HorizontalAxis tickCount={5} theme={{ labels: { formatter: (v) => v.toFixed(2) } }} includeOriginTick={false} />
  <Line theme={{ stroke: { color: '#44bd32', width: 10 } }} />
</Chart>
```

### with `tickCount` and `includeOriginTick=true`

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
  <HorizontalAxis tickCount={5} theme={{ labels: { formatter: (v) => v.toFixed(2) } }} includeOriginTick={false} />
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
  <HorizontalAxis tickCount={5} includeOriginTick theme={{ labels: { formatter: (v) => v.toFixed(2) } }}/>
  <Line theme={{ stroke: { color: '#44bd32', width: 10 } }} />
</Chart>
```
