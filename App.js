import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import LineChart from './src/LineChart';

export default class App extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, marginTop: 50 }}>
        <ScrollView style={{ height: '100%', flex: 1 }} >
          <View style={{ margin: 10, height: 200, elevation: 5, backgroundColor : "#fff", shadowColor: 'black',shadowOpacity: 1, }}>
            <LineChart style={{ flex: 1 }} config={config1} data={data1} />
          </View>
          <View style={{ margin: 10, height: 200, elevation: 5, backgroundColor : "#ff0", shadowColor: 'black',shadowOpacity: 1, }}>
            <LineChart style={{ flex: 1 }} config={config2} data={data2} />
          </View>
          <View style={{ margin: 10, height: 200, elevation: 5, backgroundColor: "#fff", shadowColor: 'black', shadowOpacity: 1, }}>
            <LineChart style={{ flex: 1 }} config={config3} data={data3} />
          </View>
          <View style={{ margin: 10, height: 200, elevation: 5, backgroundColor: "#fff", shadowColor: 'black', shadowOpacity: 1, }}>
            <LineChart style={{ flex: 1 }} config={config4} data={data4} />
          </View>
          <View style={{ margin: 10, height: 200, elevation: 5, backgroundColor: "#fff", shadowColor: 'black', shadowOpacity: 1, }}>
            <LineChart style={{ flex: 1 }} config={config5} data={data5} />
          </View>
        </ScrollView>
      </View>
    );
  }
}
const data1 = [-10, -15, 40, 19, 32, 15, 52, 55, 20, 60, 78, 42, 56];
const config1 = {
  line: {
    visible: true,
    strokeWidth: 1,
    strokeColor: '#54a0ff',
  },
  area: {
    visible: false,
  },
  yAxis: {
    labelColor: '#54a0ff',
  },
  interpolation: 'spline',
  insetY: 10,
  insetX: 10,
}

const data2 = [-10, -15, 40, 19, 32, 15, 52, 55, 20, 60, 78, 42, 56];
const config2 = {
  line: {
    visible: true,
    strokeWidth: 2,
    strokeColor: '#341f97',
  },
  area: {
    visible: false,
  },
  yAxis: {
    visible: true,
    labelStepSize: 15,
  },
  insetY: 10,
  insetX: 10,
}

const data3 = [-10, -15, 40, 19, 32, 15, 52, 55, 20, 60, 78, 42, 56];
const config3 = {
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

const data4 = [-10, -15, 40, 19, 32, 15, 52, 55, 20, 60, 78, 42, 56];
const config4 = { 
  interpolation: 'spline',
  line: { strokeColor: '#be2ddd', strokeWidth: 2 },
  yAxis: { visible: false },
  grid: { visible: false }
}

const data5 = [-10, -15, 40, 19, 32, 15, 52, 55, 20, 60, 78, 42, 56];
const config5 = { 
  interpolation: 'spline',
  area: {
    gradientFrom: '#10ac84',
    gradientFromOpacity: 1,
    gradientTo: '#10ac84',
    gradientToOpacity: 0.4,
  },
  line: {
    visible: false
  }
}

