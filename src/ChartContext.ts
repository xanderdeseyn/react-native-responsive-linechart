import React from 'react'
import { ChartContext as TChartContext } from './types'

const ChartContext = React.createContext<TChartContext>({ data: [], dimensions: undefined, domain: { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } } })

export const ChartContextProvider = ChartContext.Provider

export default ChartContext
