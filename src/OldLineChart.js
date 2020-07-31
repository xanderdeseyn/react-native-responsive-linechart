import spline from "cubic-spline";
import deepmerge from "deepmerge";
import React, { Component } from "react";
import { View, PanResponder } from "react-native";
import memoizeOne from "memoize-one";
import _ from "lodash";
import Svg, { Polyline, Rect, Text, Line, Polygon, LinearGradient, Defs, Stop, Circle } from "react-native-svg";

class LineChart extends Component {
  constructor(props) {
    super(props);
    this.state = { dimensions: undefined, tooltipIndex: undefined };

    // Memoize data calculations for rendering
    this.recalculate = memoizeOne(this.recalculate);

    // For tooltips to work we need to get funky with the PanResponder.
    // Capturing touch and move events to calculate tooltip index
    if (_.get(props.config, "tooltip.visible", false) && props.config.interpolation !== "spline") {
      this._panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: this.handleTouchEvent,
        onPanResponderMove: this.handleTouchEvent,
        onStartShouldSetPanResponder: this.handleTouchEvent
      });
    }
  }

  handleTouchEvent = (evt, gestureState) => {
    const xTouch = evt.nativeEvent.locationX - this.gridOffset.x;
    if (this.state.dimensions && this.points) {
      idx = Math.round((xTouch / this.gridSize.width) * (this.props.data.length - 1));
      if (this.state.tooltipIndex != idx) {
        if (idx >= 0 && idx <= this.props.data.length - 1) {
          this.setState({ tooltipIndex: idx });
        } else {
          this.setState({ tooltipIndex: undefined });
        }
      }
    }
    return true;
  };

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

  renderYAxisLabels = config => {
    const { yAxis, insetX } = config;

    if (yAxis.visible && this.yLabels) {
      return this.yLabels.slice(1, this.yLabels.length - 1).map(yLabel => (
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
      ));
    }

    return undefined;
  };

  renderXAxisLabels = config => {
    const { xAxis } = config;
    const { xLabels } = this.props;

    if (xAxis.visible && xLabels) {
      return this.xLabelPoints.map((point, i) => (
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
      ));
    }

    return undefined;
  };

  renderGrid = config => {
    const { grid } = config;

    if (grid.visible) {
      return (
        <React.Fragment>
          {this.yLabels.map(yLabel => (
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
      );
    }

    return undefined;
  };

  renderDataArea = config => {
    const { area } = config;
    if (area.visible) {
      return (
        <React.Fragment>
          <Defs>
            <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="0%" stopColor={area.gradientFrom} stopOpacity={area.gradientFromOpacity} />
              <Stop offset="100%" stopColor={area.gradientTo} stopOpacity={area.gradientToOpacity} />
            </LinearGradient>
          </Defs>
          <Polygon x={this.gridOffset.x} points={this.areaPoints} fill="url(#grad)" strokeWidth="0" />
        </React.Fragment>
      );
    }

    return undefined;
  };

  renderDataLine = config => {
    const { line } = config;
    if (line.visible) {
      return (
        <Polyline
          fill="none"
          strokeLinecap="round"
          points={this.formattedPoints}
          x={this.gridOffset.x}
          stroke={line.strokeColor}
          strokeWidth={line.strokeWidth}
        />
      );
    }

    return undefined;
  };

  renderDataPoints = config => {
    const { dataPoint } = config;
    const label = dataPoint.label;

    if (dataPoint.visible && this.points) {
      return this.points.map((point, index) => (
        <React.Fragment key={point.x}>
          <Circle cx={point.x + this.gridOffset.x} cy={point.y} r={dataPoint.radius} fill={dataPoint.color} />
          {label.visible && (
            <Text
              fill={dataPoint.label.labelColor}
              fontSize={label.labelFontSize}
              x={point.x}
              textAlignVertical="center"
              y={this.gridOffset.y + point.y - dataPoint.label.marginBottom}
              dx={this.gridOffset.x}
              textAnchor="middle"
              height={label.labelFontSize}
              dy={label.labelFontSize * 0.3}
              fontWeight="400"
            >
              {label.labelFormatter(this.props.data[index])}
            </Text>
          )}
        </React.Fragment>
      ));
    }
    return undefined;
  };

  renderTooltip = config => {
    if (this.state.tooltipIndex === undefined) {
      return undefined;
    }

    const { tooltip } = config;

    const dataX = this.points[this.state.tooltipIndex].x;
    const dataY = this.points[this.state.tooltipIndex].y;

    const dataValue = this.props.data[this.state.tooltipIndex];
    const label = tooltip.labelFormatter(dataValue, this.state.tooltipIndex)

    const textWidth = label.length * tooltip.labelFontSize * 0.66 + tooltip.boxPaddingX;
    const textHeight = tooltip.labelFontSize * 1.5 + tooltip.boxPaddingY;

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
          fill={tooltip.labelColor}
          fontSize={tooltip.labelFontSize}
          x={dataX}
          textAlignVertical="center"
          y={this.gridOffset.y + dataY - 20 - textHeight / 2}
          dx={this.gridOffset.x}
          textAnchor="middle"
          height={tooltip.labelFontSize}
          dy={tooltip.labelFontSize * 0.3}
          fontWeight="400"
        >
          {label}
        </Text>
      </React.Fragment>
    );
  };

  mergeConfigs = memoizeOne((c1, c2) => deepmerge(c1, c2));

  render() {
    if (this.state.dimensions) {
      const { dimensions } = this.state;
      var { width, height } = dimensions;
    }

    // Don't worry, this is memoized
    this.recalculate(this.state.dimensions, this.props.data, this.props.config);

    const { style, xLabels } = this.props;
    // Merge default config with user provided config
    const config = this.mergeConfigs(defaultConfig, this.props.config);
    const { grid, insetX, insetY, backgroundColor, backgroundOpacity } = config;

    // Ease of use
    const gridSize = this.gridSize;
    const gridOffset = this.gridOffset;

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
            <Rect x="0" y="0" width={width} height={height} fill={backgroundColor} fillOpacity={backgroundOpacity} />
            {/* Draw Y axis label area | TODO: I think this is no longer needed */}
            <Rect x={insetX} y={insetY} width={this.yAxisWidth} height={gridSize.height} fill={backgroundColor} fillOpacity={backgroundOpacity} />
            {/* Draw background for actual chart area */}
            <Rect
              x={gridOffset.x}
              y={gridOffset.y}
              width={gridSize.width}
              height={gridSize.height}
              fill={grid.backgroundColor}
              fillOpacity={backgroundOpacity}
            />
            {this.renderYAxisLabels(config)}
            {this.renderXAxisLabels(config)}
            {this.renderGrid(config)}
            {this.renderDataArea(config)}
            {this.renderDataLine(config)}
            {this.renderTooltip(config)}
            {this.renderDataPoints(config)}
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
    labelFormatter: v => v.toFixed(2),
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
    labelColor: "black",
    labelFontSize: 10
  },
  dataPoint: {
    visible: false,
    color: "#777",
    radius: 5,
    label: {
      visible: false,
      labelFontSize: 12,
      labelColor: "#777",
      labelFormatter: v => String(v),
      marginBottom: 25
    }
  },
  insetY: 0,
  insetX: 0,
  interpolation: "none",
  backgroundColor: "#fff",
  backgroundOpacity: 1
};

const viewStyle = {
  alignSelf: "stretch"
};

LineChart.defaultProps = {
  data: [-10, -15, 40, 19, 32, 15, 52, 55, 20, 60, 78, 42, 56],
  style: {},
  config: {}
};

export default LineChart;
