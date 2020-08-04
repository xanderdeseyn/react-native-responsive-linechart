import React from 'react'
import styled from 'styled-components/native'
import { StatusBar } from 'react-native'
import { Chart, HorizontalAxis, VerticalAxis, Line } from 'react-native-responsive-linechart'

const App = () => {
  return (
    <Container>
      <StatusBar barStyle="dark-content" />
      <Chart
        style={{ height: 200, width: '100%', backgroundColor: '#eee', marginTop: 100 }}
        data={data}
        xDomain={{ min: -2, max: 10 }}
        yDomain={{ min: -2, max: 20 }}
        padding={{ left: 20, top: 10, bottom: 10 }}
      >
        <VerticalAxis tickValues={[0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20]} theme={{ axis: { dx: 0 }, ticks: { dx: 0 } }} />
        <HorizontalAxis />
        <Line />
      </Chart>
      <Chart
        style={{ height: 200, width: '100%', backgroundColor: '#eee', marginTop: 100 }}
        data={data}
        padding={{ left: 20, bottom: 20, right: 20, top: 20 }}
        xDomain={{ min: -2, max: 10 }}
        yDomain={{ min: -2, max: 20 }}
      >
        <VerticalAxis tickCount={10} theme={{ axis: { stroke: { color: '#aaa', width: 2 } }, ticks: { stroke: { color: '#aaa', width: 2 } } }} />
        <HorizontalAxis tickCount={3} theme={{ axis: { stroke: { color: '#aaa', width: 2 } }, ticks: { stroke: { color: '#aaa', width: 2 } } }} />
        <Line theme={{ stroke: { color: 'red', width: 3 } }} />
      </Chart>
    </Container>
  )
}

export default App

const Container = styled.View`
  width: 100%;
  flex: 1;
  padding: 24px;
  background-color: #fff;
`

const data = [
  { x: -2, y: 1 },
  { x: -1, y: 0 },
  { x: 0, y: 1 },
  { x: 1, y: 2 },
  { x: 2, y: 3 },
  { x: 3, y: 1 },
  { x: 4, y: 6 },
  { x: 5, y: 8 },
  { x: 6, y: 12 },
  { x: 7, y: 15 },
  { x: 8, y: 13 },
  { x: 9, y: 11.5 },
  { x: 10, y: 12 },
]
