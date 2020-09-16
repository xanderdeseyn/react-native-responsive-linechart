import * as React from 'react'
import styled from 'styled-components/native'
import { StatusBar } from 'react-native'
import { Chart, HorizontalAxis, VerticalAxis, Line, Area, Tooltip } from 'react-native-responsive-linechart'

const App = () => {
  return (
    <Container>
      <StatusBar barStyle="dark-content" />
      <Chart
        style={{ height: 200, width: '100%', marginTop: 40 }}
        padding={{ left: 40, bottom: 20, right: 20, top: 20 }}
        xDomain={{ min: -2, max: 10 }}
        yDomain={{ min: 0, max: 20 }}
      >
        <VerticalAxis tickCount={10} theme={{ labels: { formatter: (v) => v.toFixed(2) } }} />
        <HorizontalAxis />
        <Area
          theme={{ gradient: { from: { color: '#1abc9c', opacity: 0.4 }, to: { color: '#1abc9c', opacity: 0.4 } } }}
          smoothing="cubic-spline"
          data={[
            { x: -2, y: 15 },
            { x: -1, y: 10 },
            { x: 0, y: 12 },
            { x: 5, y: 8 },
            { x: 6, y: 12 },
            { x: 9, y: 13.5 },
            { x: 10, y: 15 },
          ]}
        />
        <Area
          theme={{ gradient: { from: { color: '#f39c12', opacity: 0.4 }, to: { color: '#f39c12', opacity: 0.4 } } }}
          smoothing="cubic-spline"
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
        style={{ height: 200, width: '100%' }}
        data={data2}
        padding={{ left: 40, bottom: 20, right: 20, top: 20 }}
        xDomain={{ min: 0, max: 10 }}
        yDomain={{ min: 0, max: 20 }}
        viewport={{ size: { width: 5, height: 15 }, initialOrigin: { x: 5, y: 5 } }}
      >
        <VerticalAxis
          tickValues={[0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20]}
          theme={{
            axis: { stroke: { color: '#aaa', width: 2 } },
            ticks: { stroke: { color: '#aaa', width: 2 } },
            labels: { formatter: (v: number) => v.toFixed(2) },
          }}
        />
        <HorizontalAxis
          tickValues={[0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20]}
          theme={{
            axis: { stroke: { color: '#aaa', width: 2 } },
            ticks: { stroke: { color: '#aaa', width: 2 } },
            labels: { label: { rotation: 50 }, formatter: (v) => v.toFixed(1) },
          }}
        />
        <Line
          theme={{
            stroke: { color: 'red', width: 2 },
          }}
          smoothing="cubic-spline"
        />
        <Area theme={{ gradient: { from: { color: '#f39c12', opacity: 0.4 }, to: { color: '#f39c12', opacity: 0.4 } } }} smoothing="cubic-spline" />
        {/* <Line smoothing="bezier" tension={0.15} theme={{ stroke: { color: 'blue', width: 2 } }} />
        <Line smoothing="cubic-spline" tension={0.3} theme={{ stroke: { color: 'green', width: 2 } }} />
        <Line tension={0.3} theme={{ stroke: { color: 'orange', width: 2 }, scatter: { default: { width: 4, height: 4 } } }} /> */}
      </Chart>
      <Chart
        style={{ height: 200, width: '100%' }}
        data={[
          { x: -2, y: 15 },
          { x: -1, y: 10 },
          { x: 0, y: 12 },
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
        disableGestures
      >
        <VerticalAxis tickCount={10} theme={{ labels: { formatter: (v) => v.toFixed(2) } }} />
        <HorizontalAxis tickCount={3} />
        <Area theme={{ gradient: { from: { color: '#44bd32' }, to: { color: '#44bd32', opacity: 0.2 } } }} />
        <Line theme={{ stroke: { color: '#44bd32', width: 5 } }} />
      </Chart>
      <Chart
        style={{ height: 200, width: '100%' }}
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
        <Area theme={{ gradient: { from: { color: '#44bd32' }, to: { color: '#44bd32', opacity: 0.2 } } }} />
        <Line
          tooltipComponent={<Tooltip />}
          theme={{ stroke: { color: '#44bd32', width: 5 }, scatter: { default: { width: 8, height: 8, rx: 4, color: '#44ad32' }, selected: { color: 'red' } } }}
        />
      </Chart>
      <Chart
        style={{ height: 200, width: '100%' }}
        data={[
          { x: 5, y: 15 },
          { x: 6, y: 6 },
          { x: 7, y: 15 },
          { x: 8, y: 3 },
        ]}
        padding={{ left: 40, bottom: 20, right: 20, top: 20 }}
        xDomain={{ min: 5, max: 8 }}
      >
        <VerticalAxis
          tickValues={[0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20]}
          theme={{
            axis: { stroke: { color: '#aaa', width: 2 } },
            ticks: { stroke: { color: '#aaa', width: 2 } },
            labels: { formatter: (v) => v.toFixed(2) },
          }}
        />
        <HorizontalAxis
          tickCount={9}
          theme={{
            axis: { stroke: { color: '#aaa', width: 2 } },
            ticks: { stroke: { color: '#aaa', width: 2 } },
            labels: { label: { rotation: 50 }, formatter: (v) => v.toFixed(1) },
          }}
        />
        <Line theme={{ stroke: { color: 'red', width: 2 } }} tooltipComponent={<Tooltip />} />
        <Line smoothing="bezier" tension={0.15} theme={{ stroke: { color: 'blue', width: 2 } }} />
        <Line smoothing="bezier" tension={0.3} theme={{ stroke: { color: 'green', width: 2 } }} />
        <Line smoothing="cubic-spline" tension={0.3} theme={{ stroke: { color: 'orange', width: 2 } }} />
      </Chart>
    </Container>
  )
}

export default App

const Container = styled.ScrollView.attrs(() => ({ contentContainerStyle: { paddingBottom: 64 } }))`
  width: 100%;
  flex: 1;
  padding: 24px;
  background-color: #fff;
`

const data1 = [
  { x: 5, y: 15 },
  { x: 6, y: 6 },
  { x: 7, y: 15 },
  { x: 8, y: 3 },
]

const data2 = new Array(500).fill(undefined).map((v, i) => ({ x: i / 10, y: Math.random() * 10 + 5 }))
