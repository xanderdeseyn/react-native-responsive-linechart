---

title: Screenshots
id: screenshots

---
import { Chart, HorizontalAxis, Area, VerticalAxis, Line, BoxTooltip } from 'react-native-responsive-linechart'

To give you and idea of the options this library offers, here are some end results.

<div style={{ width: '100%',  flexWrap: 'wrap', flexDirection: 'row', display: 'flex'}} >
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
    theme={{ stroke: { color: '#e84118', width: 3 } }} 
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
    theme={{ stroke: { color: '#44bd32', width: 3 } }} 
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
    { x: 10, y: 10 },
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
    theme={{ gradient: { from : { color: '#7f8fa6', opacity: 0.4 }, to : { color: '#7f8fa6' , opacity: 0.4 } } }} 
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
    theme={{ gradient: { from : { color: '#0097e6', opacity: 0.4 }, to : { color: '#0097e6' , opacity: 0.4 } } }} 
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
<Chart
  style={{ height: 200, width: 400}}
  padding={{ left: 40, bottom: 20, right: 20, top: 20 }}
  xDomain={{ min: -2, max: 10 }}
  yDomain={{ min: 0, max: 20 }}
>
  <VerticalAxis
    tickCount={10}
    theme={{ labels: { formatter: (v) => v.toFixed(0), label: { color: '#0097e6', fontWeight: 700 } }, axis: { stroke: { color: '#0097e6', width: 2 } }, grid: { stroke: { color: '#0097e655', width: 1 } } ,ticks: { stroke: { color: '#0097e6', width: 2 }  } }}
  />
  <HorizontalAxis tickCount={11} theme={{ labels: { formatter: (v) => v.toFixed(1), label: { color: '#0097e6', fontWeight: 700 } } ,  axis: { stroke: { color: '#0097e6', width: 2 } }, grid: { stroke: { color: '#0097e655', width: 1 } }, ticks: { stroke: { color: '#0097e6', width: 2 } } }} />
  <Area 
    theme={{ gradient: { from : { color: '#0097e6', opacity: 0.4 }, to : { color: '#0097e6' , opacity: 0.4 } } }} 
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
</div>