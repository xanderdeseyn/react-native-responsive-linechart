import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LineChart from './src/LineChart';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        {/* <View style={{ flexDirection: 'row' }} >
          <LineChart />
          <LineChart />
        </View> */}
        <View style={{ margin: 10, height: '30%', width: '90%', elevation: 5, backgroundColor : "#fff", shadowColor: 'black',shadowOpacity: 1, }}>
          <LineChart style={{ flex: 1}} config={{ line: { strokeWidth: 3} }}/>
        </View>
        <View style={{ margin: 10, height: '30%', width: '90%', elevation: 5, backgroundColor : "#fff", shadowColor: 'black',shadowOpacity: 1, }}>
          <LineChart style={{ flex: 1}}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
