import spline from 'cubic-spline';
import React, { Component } from 'react';
import { View}  from 'react-native';
import { Dimensions } from 'react-native';
import Svg, { Polyline, Rect, Text, Line, Polygon, LinearGradient, Defs, Stop } from 'react-native-svg';

class LineChart extends Component {

  constructor(props) {
    super(props);
    this.state = { dimensions: undefined };
  }

  recalculate() {
    if(!this.state.dimensions) {
      return;
    }

    const { width, height } = this.state.dimensions;
    const { data, config } = this.props;
    const mergedConfig = Object.assign({}, defaultConfig, config);
    const { grid, line, area, yAxis, insetX, insetY, backgroundColor} = mergedConfig;
    
    console.log('Updating props');

    this.highestDataPoint = Math.max(...data);
    this.lowestDataPoint = Math.min(...data);
    this.dataRange = this.highestDataPoint - this.lowestDataPoint;

    this.lowestYLabel = (Math.floor(this.lowestDataPoint / yAxis.labelStepSize) - 1) * yAxis.labelStepSize;
    this.highestYLabel = (Math.ceil(this.highestDataPoint / yAxis.labelStepSize) + 1) * yAxis.labelStepSize;

    this.top = this.highestYLabel;
    this.bottom = this.lowestYLabel;
    this.range = this.top - this.bottom;

    const labelAmount = Math.ceil(this.range / yAxis.labelStepSize);
    this.yLabels = Array(labelAmount).fill().map((e,i)=>  this.lowestYLabel + yAxis.labelStepSize * i);

    if(yAxis.labelWidth) {
      this.yAxisWidth = yAxis.labelWidth;
    } else {
      const lengths = this.yLabels.map(v => yAxis.labelFormatter(v).length);
      const maxLength = Math.max(...lengths);
      this.yAxisWidth = maxLength * yAxis.labelFontSize * 0.66;
    }

    this.gridOffset = {
      x: insetX + this.yAxisWidth,
      y: insetY,
    }
  
    this.gridSize = {
      width: width - insetX*2 - this.yAxisWidth,
      height: height - insetY*2,
    }

    this.highestLine = this.realY(this.yLabels[this.yLabels.length - 1]);
    this.lowestLine = this.realY(this.yLabels[0]);
    
  }

  scaleY(y) { return 1 - ((y - this.bottom) / this.range) }

  realX(x) { return (x * this.gridSize.width / (this.props.data.length - 1) ) }

  realY(y) { return this.scaleY(y) * this.gridSize.height; }

  scaleXYPoints() {
    return this.props.data.map((y, x) => ({
      x: this.realX(x),
      y: this.realY(y),
    }));
  }

  linearPoints() {
    const tuples = this.scaleXYPoints();
    const xs = tuples.map(t => t.x);
    const ys = tuples.map(t => t.y);
    const lastXCoordinate = Math.max(...xs);
    const points = [];
    for (let x = 0; x <= lastXCoordinate ; x += 1) {
      const y = spline(x, xs, ys);
      points.push({x,y});
    }

    return points;
  }

  splinePoints() {
    const tuples = this.scaleXYPoints();
    const xs = tuples.map(t => t.x);
    const ys = tuples.map(t => t.y);
    const lastXCoordinate = Math.max(...xs);
    const points = [];
    for (let x = 0; x <= lastXCoordinate ; x += 1) {
      const y = spline(x, xs, ys);
      points.push({x,y});
    }

    return points;
  }

  linePoints() {
    return this.formatPoints(this.splinePoints());
  }

  formatPoints(points) {
    return points.map(p => p.x + ',' + p.y).join(' ');
  }

  polygonPoints() {
    const points = this.splinePoints();
    points.push({x: points[points.length -1].x + 0.5, y: points[points.length -1].y}) // pixel fix
    points.push({x: this.gridSize.width, y: this.lowestLine - this.gridOffset.y})
    points.push({x: 0, y: this.lowestLine - this.gridOffset.y})
    return this.formatPoints(points);
  }

  onLayout = event => {
    const { width, height } = event.nativeEvent.layout;
    this.setState({dimensions: { width, height }});
  }

  render() {
    this.recalculate();
    
    if (this.state.dimensions) {
      const { dimensions } = this.state;
      var { width, height } = dimensions;
    }
    
    const { style, config } = this.props;
    const mergedConfig = Object.assign({}, defaultConfig, config);
    const { grid, line, area, yAxis, insetX, insetY, backgroundColor} = mergedConfig;
    const yLabels = this.yLabels;
    const gridSize = this.gridSize;
    const gridOffset = this.gridOffset;
    
    return (
      <View style={Object.assign({}, viewStyle, this.props.style)} onLayout={this.onLayout}>
        {
          this.state.dimensions ?
          <Svg width={width} height={height}>
            <Rect x="0" y="0" width={width} height={height} fill={backgroundColor} />
            <Rect x={insetX} y={insetY} width={this.yAxisWidth} height={height - insetY*2} fill={'#fff'} />
            <Rect x={gridOffset.x} y={gridOffset.y} width={gridSize.width} height={gridSize.height} fill={grid.backgroundColor} />
            {
              yLabels.map(yLabel => 
                <Line
                  key={yLabel}
                  x1={gridOffset.x}
                  y1={this.realY(yLabel)}
                  x2={gridOffset.x + gridSize.width}
                  y2={this.realY(yLabel)}
                  stroke={grid.strokeColor}
                  strokeWidth={grid.strokeWidth}
                />
              )
            }
            {
              yLabels.slice(1, yLabels.length - 1).map(yLabel => 
                <Text
                  key={yLabel}
                  fill={yAxis.labelColor}
                  fontSize={yAxis.labelFontSize}
                  x={insetX + this.yAxisWidth - 5}
                  y={this.realY(yLabel)}
                  textAnchor="end"
                  height={yAxis.labelFontSize}
                  fontWeight="400"
                  dy={yAxis.labelFontSize * -2}>
                  {yAxis.labelFormatter(yLabel)}
                </Text>
              )
            }
            <Line
              x1={gridOffset.x}
              y1={this.highestLine}
              x2={gridOffset.x}
              y2={this.lowestLine}
              stroke={grid.strokeColor}
              strokeWidth={grid.strokeWidth}
            />
            <Line
              x1={gridOffset.x + gridSize.width}
              y1={this.lowestLine}
              x2={gridOffset.x + gridSize.width}
              y2={this.highestLine}
              stroke={grid.strokeColor}
              strokeWidth={grid.strokeWidth}
            />
            <Defs>
              <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <Stop offset="0%" stopColor={area.gradientFrom} stopOpacity={area.gradientFromOpacity} />
                <Stop offset="100%" stopColor={area.gradientTo} stopOpacity={area.gradientToOpacity} />
              </LinearGradient>
            </Defs>
            <Polyline
              fill="none"
              strokeLinecap="round"
              points={this.linePoints()}
              x={gridOffset.x}
              y={gridOffset.y}
              stroke={line.color}
              strokeWidth={line.strokeWidth}></Polyline>
            <Polygon
              x={gridOffset.x}
              y={gridOffset.y}
              points={this.polygonPoints()}
              fill="url(#grad)"
              strokeWidth="0"
            />
          </Svg>
          : undefined}
      </View>
    );
  }
}

const defaultConfig = {
  grid: {
    backgroundColor: '#fff',
    strokeWidth: 1,
    strokeColor: '#ededed',
  },
  line: {
    strokeWidth: 1,
    color: '#333',
  },
  area: {
    gradientFrom: '#be2ddd',
    gradientFromOpacity: 1,
    gradientTo: '#e056fd',
    gradientToOpacity: 0.4,
  },
  yAxis: {
    labelStepSize: 20,
    labelFontSize: 12,
    labelColor: 'black',
    labelFormatter: v => String(v),
  },
  insetY: 10,
  insetX: 10,
  backgroundColor: '#fff',
}

const viewStyle = {
  alignSelf: 'stretch',
  backgroundColor: '#fff',
}

LineChart.defaultProps = {
  data: [-10, -15, 40, 19, 32, 15, 52, 55, 20, 60, 78, 42, 56],
  style: {},
  config: {},
}

export default LineChart;