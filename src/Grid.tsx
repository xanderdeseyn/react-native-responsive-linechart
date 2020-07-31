import React from 'react'
import { Line } from 'react-native-svg'

type Props = {
  onlyVerticalLines?: boolean
  onlyHorizontalLines?: boolean
}

const Grid: React.FC<Props> = ({ onlyVerticalLines, onlyHorizontalLines }) => {
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
      <Line x1={this.gridOffset.x} y1={this.highestLine} x2={this.gridOffset.x} y2={this.lowestLine} stroke={grid.strokeColor} strokeWidth={grid.strokeWidth} />
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

export { Grid }
