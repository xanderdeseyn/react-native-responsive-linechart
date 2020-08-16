# react-native-responsive-linechart

[NPM Downloads](https://img.shields.io/npm/dm/react-native-responsive-linechart)

### Installation

`yarn add react-native-responsive-linechart` or `npm install react-native-responsive-linechart`

This lib depends on [react-native-svg](https://github.com/react-native-community/react-native-svg), so make sure that is installed correctly.

### Quick example

```javascript
;<Chart
  style={{ height: 200, width: '100%', backgroundColor: '#eee' }}
  xDomain={{ min: -2, max: 10 }}
  yDomain={{ min: -2, max: 20 }}
  padding={{ left: 20, top: 10, bottom: 10, right: 10 }}
>
  <VerticalAxis tickValues={[0, 4, 8, 12, 16, 20]} />
  <HorizontalAxis tickCount={3} />
  <Line data={data1} theme={{ stroke: { color: 'red', width: 1 } }} />
  <Line data={data2} theme={{ stroke: { color: 'blue', width: 1 } }} />
</Chart>

const data1 = [
  { x: -2, y: 1 },
  { x: -1, y: 0 },
  { x: 8, y: 13 },
  { x: 9, y: 11.5 },
  { x: 10, y: 12 }
]

const data2 = [
  { x: -2, y: 15 },
  { x: -1, y: 10 },
  { x: 0, y: 12 },
  { x: 1, y: 7 },
  { x: 8, y: 12 },
  { x: 9, y: 13.5 },
  { x: 10, y: 18 }
]
```
