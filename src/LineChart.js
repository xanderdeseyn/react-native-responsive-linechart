import spline from "cubic-spline";
import deepmerge from "deepmerge";
import React, { Component } from "react";
import { View, PanResponder } from "react-native";
import memoizeOne from "memoize-one";
import _ from "lodash";
import Svg, { Polyline, Rect, Text, Line, Polygon, LinearGradient, Defs, Stop, Circle } from "react-native-svg";

const RenderValuePoint = ({ point, offset, color, radius }) => {
  const dataX = point.x;
  const dataY = point.y;

  return (
    <React.Fragment>
      <Circle cx={dataX + offset.x} cy={dataY} r={radius} fill={color} />
    </React.Fragment>
  );
};

class LineChart extends Component {
  constructor(props) {
    super(props);
    this.state = { dimensions: undefined, tooltipIndex: undefined, layoutX: 0 };

    // Memoize data calculations for rendering
    this.recalculate = memoizeOne(this.recalculate);

    // For tooltips to work we need to get funky with the PanResponder.
    // Capturing touch and move events to calculate tooltip index
    if (_.get(props.config, "tooltip.visible", false) && props.config.interpolation !== "spline") {
      this._panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: (evt, gestureState) => {
          // Only capture if we are not actively swiping left or right, otherwise horizontal scrollviews are broken.
          // TODO: maybe remove as it is probably never a good idea to put a chart in a horizontal scrollview
          if (Math.abs(gestureState.dx) > 10) {
            return;
          }

          const xTouch = -this.state.layoutX + gestureState.moveX - this.gridOffset.x + this.props.scrollOffset;
          if (this.state.dimensions && this.points) {
            idx = Math.round((xTouch / this.gridSize.width) * (this.props.data.length - 1));
            if (this.state.tooltipIndex != idx) {
              this.setState({ tooltipIndex: idx });
            }
          }
          return false;
        }
      });
    }
  }

  recalculate(dimensions, data, config) {
    if (!dimensions) {
      return;
    }

    const { width, height } = dimensions;
    const mergedConfig = deepmerge(defaultConfig, config);
    const { grid, line, area, yAxis, xAxis, insetX, insetY, interpolation, backgroundColor } = mergedConfig;

    this.highestDataPoint = Math.max(...data);
    this.lowestDataPoint = Math.min(...data);
    this.dataRange = this.highestDataPoint - this.lowestDataPoint;

    if (!config.grid || !config.grid.stepSize) {
      // default grid
      if (this.dataRange === 0) {
        //edge case for 1 value or multiple times the same value
        grid.stepSize = 1.0;
        this.lowestYLabel = this.lowestDataPoint - 2;
        this.highestYLabel = this.highestDataPoint + 3;
      } else {
        grid.stepSize = this.dataRange / 6.0;
        this.lowestYLabel = (Math.floor(this.lowestDataPoint / grid.stepSize) - 1) * grid.stepSize;
        this.highestYLabel = (Math.ceil(this.highestDataPoint / grid.stepSize) + 1) * grid.stepSize;
      }
    } else {
      // grid specified in config
      this.lowestYLabel = (Math.floor(this.lowestDataPoint / grid.stepSize) - 1) * grid.stepSize;
      this.highestYLabel = (Math.ceil(this.highestDataPoint / grid.stepSize) + 1) * grid.stepSize;
    }

    this.top = this.highestYLabel;
    this.bottom = this.lowestYLabel;
    this.range = this.top - this.bottom;

    const labelAmount = Math.ceil(this.range / grid.stepSize);

    this.yLabels = Array(labelAmount)
      .fill()
      .map((e, i) => this.lowestYLabel + grid.stepSize * i);

    if (!yAxis.visible) {
      this.yAxisWidth = 0;
    } else if (yAxis.labelWidth) {
      this.yAxisWidth = yAxis.labelWidth;
    } else {
      const lengths = this.yLabels.map(v => yAxis.labelFormatter(v).length);
      const maxLength = Math.max(...lengths);
      this.yAxisWidth = maxLength * yAxis.labelFontSize * 0.66;
    }

    this.gridOffset = {
      x: insetX + this.yAxisWidth,
      y: insetY
    };

    this.gridSize = {
      width: width - insetX * 2 - this.yAxisWidth,
      height: height - insetY * 2
    };

    this.highestLine = this.realY(this.yLabels[this.yLabels.length - 1]);
    this.lowestLine = this.realY(this.yLabels[0]);

    this.points = this.calculatePoints(interpolation);
    this.formattedPoints = this.formatPoints(this.points);
    this.areaPoints = this.formatPoints(this.calculateAreaPoints(interpolation));

    if (xAxis.visible) {
      this.xLabelPoints = data.map((y, x) => ({
        x: this.gridOffset.x + this.realX(x),
        y: this.gridSize.height
      }));
    }
  }

  scaleY(y) {
    return 1 - (y - this.bottom) / this.range;
  }

  realX(x) {
    return (x * this.gridSize.width) / (this.props.data.length - 1);
  }

  realY(y) {
    return this.scaleY(y) * this.gridSize.height;
  }

  scaleXYPoints() {
    return this.props.data.map((y, x) => ({
      x: this.realX(x),
      y: this.realY(y)
    }));
  }

  linearPoints() {
    const points = this.scaleXYPoints();
    return points;
  }

  splinePoints() {
    const tuples = this.scaleXYPoints();
    const xs = tuples.map(t => t.x);
    const ys = tuples.map(t => t.y);
    const lastXCoordinate = Math.max(...xs);
    const points = [];
    for (let x = 0; x <= lastXCoordinate; x += 1) {
      const y = spline(x, xs, ys);
      points.push({ x, y });
    }

    return points;
  }

  calculatePoints(interpolation) {
    if (interpolation === "spline") {
      return this.splinePoints();
    } else {
      return this.linearPoints();
    }
  }

  formatPoints(points) {
    return points.map(p => p.x + "," + p.y).join(" ");
  }

  calculateAreaPoints(interpolation) {
    const points = this.calculatePoints(interpolation);
    points.push({
      x: points[points.length - 1].x + 0.5, // pixel fix
      y: points[points.length - 1].y
    });
    points.push({ x: this.gridSize.width, y: this.lowestLine });
    points.push({ x: 0, y: this.lowestLine });
    return points;
  }

  onLayout = event => {
    const { width, height } = event.nativeEvent.layout;
    this.setState({ dimensions: { width, height } });
  };

  renderTooltip(mergedConfig) {
    const { tooltip } = mergedConfig;

    const dataX = this.points[this.state.tooltipIndex].x;
    const dataY = this.points[this.state.tooltipIndex].y;

    const dataValue = this.props.data[this.state.tooltipIndex];

    const textWidth = tooltip.textFormatter(dataValue).length * tooltip.textFontSize * 0.66 + tooltip.boxPaddingX;
    const textHeight = tooltip.textFontSize * 1.5 + tooltip.boxPaddingY;

    return (
      <React.Fragment>
        <Line
          x1={dataX + this.gridOffset.x}
          x2={dataX + this.gridOffset.x}
          y1={dataY}
          y2={dataY - 20}
          stroke={tooltip.lineColor}
          strokeWidth={tooltip.lineWidth}
        />
        <Rect
          x={this.gridOffset.x + dataX - textWidth / 2}
          y={this.gridOffset.y + dataY - 20 - textHeight}
          rx={tooltip.boxBorderRadius}
          width={textWidth}
          height={textHeight}
          fill={tooltip.boxColor}
          strokeWidth={tooltip.boxBorderWidth}
          stroke={tooltip.boxBorderColor}
        />
        <Text
          fill={tooltip.textColor}
          fontSize={tooltip.textFontSize}
          x={dataX}
          textAlignVertical="center"
          y={this.gridOffset.y + dataY - 20 - textHeight / 2}
          dx={this.gridOffset.x}
          textAnchor="middle"
          height={tooltip.textFontSize}
          dy={tooltip.textFontSize * 0.3}
          fontWeight="400"
        >
          {tooltip.textFormatter(dataValue)}
        </Text>
      </React.Fragment>
    );
  }

  // We need absolute position for tooltip
  componentDidMount() {
    setTimeout(() => {
      if (this.myComponent) {
        this.myComponent.measure((fx, fy, width, height, px, py) => {
          this.setState({ layoutX: px });
        });
      }
    }, 500);
  }

  render() {
    if (this.state.dimensions) {
      const { dimensions } = this.state;
      var { width, height } = dimensions;
    }

    // Don't worry, this is memoized
    this.recalculate(this.state.dimensions, this.props.data, this.props.config);

    const { style, config, xLabels } = this.props;
    // Merge default config with user provided config
    const mergedConfig = deepmerge(defaultConfig, config);
    const { grid, line, area, yAxis, xAxis, insetX, insetY, backgroundColor, valuePoint } = mergedConfig;

    // Ease of use
    const yLabels = this.yLabels;
    const xLabelPoints = this.xLabelPoints;
    const gridSize = this.gridSize;
    const gridOffset = this.gridOffset;

    //
    const dots =
      valuePoint.visible && this.points
        ? this.points.map(point => <RenderValuePoint key={point.x} point={point} offset={gridOffset} color={valuePoint.color} radius={valuePoint.radius} />)
        : undefined;

    return (
      <View
        style={Object.assign({}, viewStyle, this.props.style, { backgroundColor })}
        onLayout={this.onLayout}
        {..._.get(this._panResponder, "panHandlers", {})}
        ref={view => {
          this.myComponent = view;
        }}
      >
        {this.points ? (
          <Svg width={width} height={height}>
            {/* Draw background */}
            <Rect x="0" y="0" width={width} height={height} fill={backgroundColor} />
            {/* Draw Y axis label area | TODO: I think this is no longer needed */}
            <Rect x={insetX} y={insetY} width={this.yAxisWidth} height={gridSize.height} fill={backgroundColor} />
            {/* Draw background for actual chart area */}
            <Rect x={gridOffset.x} y={gridOffset.y} width={gridSize.width} height={gridSize.height} fill={grid.backgroundColor} />
            {/* Draw Y axis labels */}
            {yAxis.visible &&
              yLabels &&
              yLabels.slice(1, yLabels.length - 1).map(yLabel => (
                <Text
                  key={yLabel}
                  fill={yAxis.labelColor}
                  fontSize={yAxis.labelFontSize}
                  x={insetX + this.yAxisWidth - 5}
                  y={this.realY(yLabel)}
                  textAnchor="end"
                  height={yAxis.labelFontSize}
                  fontWeight="400"
                  dy={yAxis.labelFontSize * 0.3}
                >
                  {yAxis.labelFormatter(yLabel)}
                </Text>
              ))}
            {/* Draw X axis labels */}
            {xAxis.visible &&
              xLabels &&
              xLabelPoints.map((point, i) => (
                <Text
                  key={point.x}
                  fill={xAxis.labelColor}
                  fontSize={xAxis.labelFontSize}
                  x={point.x}
                  y={point.y}
                  textAnchor="middle"
                  height={xAxis.labelFontSize}
                  dy={xAxis.labelFontSize}
                  fontWeight="400"
                >
                  {xLabels[i]}
                </Text>
              ))}
            {/* Draw grid lines */}
            {grid.visible &&
              yLabels.map(yLabel => (
                <Line
                  key={yLabel}
                  x1={gridOffset.x}
                  y1={this.realY(yLabel)}
                  x2={gridOffset.x + gridSize.width}
                  y2={this.realY(yLabel)}
                  stroke={grid.strokeColor}
                  strokeWidth={grid.strokeWidth}
                />
              ))}
            {/* Draw vertical grid lines on the sides */}
            {grid.visible && (
              <React.Fragment>
                <Line x1={gridOffset.x} y1={this.highestLine} x2={gridOffset.x} y2={this.lowestLine} stroke={grid.strokeColor} strokeWidth={grid.strokeWidth} />
                <Line
                  x1={gridOffset.x + gridSize.width}
                  y1={this.lowestLine}
                  x2={gridOffset.x + gridSize.width}
                  y2={this.highestLine}
                  stroke={grid.strokeColor}
                  strokeWidth={grid.strokeWidth}
                />
              </React.Fragment>
            )}
            {/* Define gradient used by area under data line */}
            <Defs>
              <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <Stop offset="0%" stopColor={area.gradientFrom} stopOpacity={area.gradientFromOpacity} />
                <Stop offset="100%" stopColor={area.gradientTo} stopOpacity={area.gradientToOpacity} />
              </LinearGradient>
            </Defs>
            {/* Draw area under data line */}
            {area.visible && <Polygon x={gridOffset.x} points={this.areaPoints} fill="url(#grad)" strokeWidth="0" />}
            {/* Draw data line */}
            {line.visible && (
              <Polyline
                fill="none"
                strokeLinecap="round"
                points={this.formattedPoints}
                x={gridOffset.x}
                stroke={line.strokeColor}
                strokeWidth={line.strokeWidth}
              />
            )}
            {/* Draw tooltip */}
            {this.state.tooltipIndex && this.renderTooltip(mergedConfig)}
            {/* Draw dots on data points */}
            {dots}
          </Svg>
        ) : (
          undefined
        )}
      </View>
    );
  }
}

const defaultConfig = {
  grid: {
    visible: true,
    backgroundColor: "#fff",
    strokeWidth: 1,
    strokeColor: "#ededed",
    stepSize: 15
  },
  line: {
    visible: true,
    strokeWidth: 1,
    strokeColor: "#333"
  },
  area: {
    visible: true,
    gradientFrom: "#be2ddd",
    gradientFromOpacity: 1,
    gradientTo: "#e056fd",
    gradientToOpacity: 0.4
  },
  yAxis: {
    visible: true,
    labelFontSize: 12,
    labelColor: "#777",
    labelFormatter: v => String(v)
  },
  xAxis: {
    visible: false,
    labelFontSize: 12,
    labelColor: "#777"
  },
  tooltip: {
    visible: false,
    textFormatter: v => v.toFixed(2),
    lineColor: "#777",
    lineWidth: 1,
    circleColor: "#fff",
    circleBorderColor: "#fff",
    circleBorderWidth: 1,
    boxColor: "#fff",
    boxBorderWidth: 1,
    boxBorderColor: "#777",
    boxBorderRadius: 5,
    boxPaddingY: 0,
    boxPaddingX: 0,
    textColor: "black",
    textFontSize: 10
  },
  valuePoint: {
    visible: false,
    color: "#777",
    radius: 5
  },
  insetY: 0,
  insetX: 0,
  interpolation: "none",
  backgroundColor: "#fff"
};

const viewStyle = {
  alignSelf: "stretch",
  backgroundColor: "#888"
};

LineChart.defaultProps = {
  data: [-10, -15, 40, 19, 32, 15, 52, 55, 20, 60, 78, 42, 56],
  style: {},
  config: {},
  scrollOffset: 0
};

export default LineChart;
