import React from 'react'
import styled from 'styled-components/native'
import { StatusBar } from 'react-native'
import { Chart, HorizontalAxis, VerticalAxis, Line } from 'react-native-responsive-linechart'

const App = () => {
  return (
    <Container>
      <StatusBar barStyle="dark-content" />
      <Chart style={{ height: 200, flex: 1, backgroundColor: '#bbb', marginTop: 100 }} data={data} padding={{ left: 20, bottom: 20 }}>
        <VerticalAxis />
        <HorizontalAxis />
        <Line />
      </Chart>
    </Container>
  )
}

export default App

const Container = styled.View`
  width: 100%;
  flex-direction: row
  flex: 1;
  background-color: #eee;
`

const data = [
  { x: 0, y: 1 },
  { x: 1, y: 2 },
  { x: 2, y: 3 },
  { x: 3, y: 1 },
  { x: 4, y: 6 },
  { x: 5, y: 8 },
]
