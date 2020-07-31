import React from 'react'
import { Line } from 'react-native-svg'
import { ChartConfig } from './types'

type Props = {
  config: ChartConfig
}

const Grid: React.FC<Props> = ({ config }) => {
  const { grid } = config

  if (grid.visible) {
    return (
      <React.Fragment>
        {this.yLabels.map((yLabel) => (
          <Line
            key={yLabel}
            x1={this.gridOffset.x}
            y1={this.realY(yLabel)}
            x2={this.gridOffset.x + this.gridSize.width}
            y2={this.realY(yLabel)}
            stroke={grid.strokeColor}
            strokeWidth={grid.strokeWidth}
          />
        ))}
        <Line
          x1={this.gridOffset.x}
          y1={this.highestLine}
          x2={this.gridOffset.x}
          y2={this.lowestLine}
          stroke={grid.strokeColor}
          strokeWidth={grid.strokeWidth}
        />
        <Line
          x1={this.gridOffset.x + this.gridSize.width}
          y1={this.lowestLine}
          x2={this.gridOffset.x + this.gridSize.width}
          y2={this.highestLine}
          stroke={grid.strokeColor}
          strokeWidth={grid.strokeWidth}
        />
      </React.Fragment>
    )
  }

  return null
}

export { Grid }
