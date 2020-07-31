import React from 'react'
import styled from 'styled-components/native'
import { SafeAreaView, StatusBar } from 'react-native'
import { LineChart } from 'react-native-responsive-linechart'

const App = () => {
  console.log(LineChart)
  return (
    <Container>
      <StatusBar barStyle="dark-content" />
      <LineChart style={{ height: 200, width: '100%' }} config={{ backgroundColor: 'red', backgroundOpacity: 0.5 }} />
    </Container>
  )
}

export default App

const Container = styled.View`
  width: 100%;
  flex: 1;
  background-color: #eee;
`
