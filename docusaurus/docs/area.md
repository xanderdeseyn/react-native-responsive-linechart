---

title: Area
id: area
route: /area

---

import { Chart, HorizontalAxis, Area, VerticalAxis, Line, BoxTooltip } from '../../src'

This component draws an area. Multiple areas can be drawn on one chart.

## Area Props
| Prop        | Type | Required | Description
| ----------- | ----------- | ------------- | ------ |
| `data`      | `{ x: number, y: number, meta?: any }[]` | Yes* | Data for the chart. Overrides optional data provided in `<Chart />`.  |
| `theme`   | Defined below        | No | Theme for the area.  |

\* unless provided in parent `<Chart />` component

### Area default theme
Any part of this theme can be overridden through the `theme` prop.
```json
{
  gradient: {
    from: {
      color: 'red',
      opacity: 1
    },
    to: {
      color: 'red',
      opacity: 0.2
    }
  }
}
```

## Examples 



### Combined with line

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

### Multiple areas

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
  <Area 
    theme={{ gradient: { from : { color: '#1abc9c', opacity: 0.4 }, to : { color: '#1abc9c' , opacity: 0.4 } } }} 
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
  <Area 
    theme={{ gradient: { from : { color: '#f39c12', opacity: 0.4 }, to : { color: '#f39c12' , opacity: 0.4 } } }} 
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
  <Area 
    theme={{ gradient: { from : { color: '#1abc9c', opacity: 0.4 }, to : { color: '#1abc9c' , opacity: 0.4 } } }} 
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
  <Area 
    theme={{ gradient: { from : { color: '#f39c12', opacity: 0.4 }, to : { color: '#f39c12' , opacity: 0.4 } } }} 
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