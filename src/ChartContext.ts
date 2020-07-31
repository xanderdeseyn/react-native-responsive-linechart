import React from 'react'
import { ChartContext as TChartContext } from './types'

const ChartContext = React.createContext<TChartContext>({ data: [], dimensions: undefined })

export const ChartContextProvider = ChartContext.Provider

export default ChartContext
