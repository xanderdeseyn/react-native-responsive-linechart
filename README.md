# react-native-responsive-linechart

## Installation

```js
npm install react-native-responsive-linechart
```

No need to set an explicit width and height! `flex` works just fine.

## Quick example

![Chart Kit](https://i.imgur.com/dhcXADa.png)

```jsx
<LineChart style={{ flex: 1 }} config={config} data={data} />

const data = [-10, -15, 40, 19, 32, 15, 52, 55, 20, 60, 78, 42, 56];
const config = {
  line: {
    strokeWidth: 1,
    strokeColor: '#216D99',
  },
  area: {
    gradientFrom: '#2e86de',
    gradientFromOpacity: 1,
    gradientTo: '#87D3FF',
    gradientToOpacity: 1,
  },
  yAxis: {
    labelColor: '#c8d6e5',
    labelStepSize: 30,
  },
  grid: {
    strokeColor: '#c8d6e5'
  },
  insetY: 10,
  insetX: 10,
  interpolation: 'spline',
  backgroundColor: '#fff',
}
```

## Reference

### LineChart

| Property        | Type       |  Description  | Example |
| ------------- |-------------| -----| ---- |
| data | array | Your numeric data | [10, 22, 13, 15, 25]
| config | object | Chart configuration object | See next section

### Example Config

```js
const exampleConfig = {
  grid: {
    visible: true,
    backgroundColor: '#fff',
    strokeWidth: 1,
    strokeColor: '#ededed',
  },
  line: {
    visible: true,
    strokeWidth: 1,
    strokeColor: '#333',
  },
  area: {
    visible: true,
    gradientFrom: '#be2ddd',
    gradientFromOpacity: 1,
    gradientTo: '#e056fd',
    gradientToOpacity: 0.4,
  },
  yAxis: {
    visible: true,
    labelStepSize: 20,
    labelFontSize: 12,
    labelColor: '#777',
    labelFormatter: v => String(v),
  },
  insetY: 10,
  insetX: 10,
  interpolation: 'none',
  backgroundColor: '#fff',
}
```