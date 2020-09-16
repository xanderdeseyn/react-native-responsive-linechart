import * as React from 'react'
import { ChartContext as TChartContext } from './types'

const ChartContext = React.createContext<TChartContext>({
  data: [],
  dimensions: undefined,
  domain: { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } },
  viewportDomain: { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } },
  viewportOrigin: { x: 0, y: 0 },
  viewport: { size: { width: 0, height: 0 }, initialOrigin: { x: 0, y: 0 } },
  lastTouch: undefined,
})

export const ChartContextProvider = ChartContext.Provider

export default ChartContext
