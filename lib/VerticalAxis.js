"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerticalAxis = void 0;
var deepmerge_1 = __importDefault(require("deepmerge"));
var React = __importStar(require("react"));
var react_native_svg_1 = require("react-native-svg");
var ChartContext_1 = __importDefault(require("./ChartContext"));
var utils_1 = require("./utils");
var Axis_utils_1 = require("./Axis.utils");
var VerticalAxis = function (props) {
    var _a = deepmerge_1.default(defaultProps, props), _b = _a.theme, axis = _b.axis, ticks = _b.ticks, grid = _b.grid, labels = _b.labels, tickValues = _a.tickValues, tickCount = _a.tickCount, includeOriginTick = _a.includeOriginTick;
    var _c = React.useContext(ChartContext_1.default), dimensions = _c.dimensions, viewportDomain = _c.viewportDomain, domain = _c.domain;
    if (!dimensions) {
        return null;
    }
    // fround is used because of potential float comparison errors, see https://github.com/N1ghtly/react-native-responsive-linechart/issues/53
    var finalTickValues = Axis_utils_1.calculateTickValues(tickValues, tickCount, domain.y, includeOriginTick).filter(function (v) { return Math.fround(v) >= Math.fround(viewportDomain.y.min) && Math.fround(v) <= Math.fround(viewportDomain.y.max); });
    return (React.createElement(React.Fragment, null,
        axis.visible && (React.createElement(react_native_svg_1.Line, { x1: axis.dx, y1: 0, x2: axis.dx, y2: dimensions.height, stroke: axis.stroke.color, strokeWidth: axis.stroke.width, strokeOpacity: axis.stroke.opacity, strokeDasharray: axis.stroke.dashArray.length > 0 ? axis.stroke.dashArray.join(',') : undefined })),
        finalTickValues.map(function (value) {
            return (React.createElement(React.Fragment, { key: value },
                grid.visible && (React.createElement(react_native_svg_1.Line, { x1: 0, y1: utils_1.scalePointToDimensions({ x: 0, y: value }, viewportDomain, dimensions).y, x2: dimensions.width, y2: utils_1.scalePointToDimensions({ x: 0, y: value }, viewportDomain, dimensions).y, stroke: grid.stroke.color, strokeWidth: grid.stroke.width, strokeOpacity: grid.stroke.opacity, strokeDasharray: grid.stroke.dashArray.length > 0 ? grid.stroke.dashArray.join(',') : undefined })),
                ticks.visible && (React.createElement(react_native_svg_1.Line, { x1: ticks.dx, y1: utils_1.scalePointToDimensions({ x: 0, y: value }, viewportDomain, dimensions).y, x2: ticks.dx + ticks.length, y2: utils_1.scalePointToDimensions({ x: 0, y: value }, viewportDomain, dimensions).y, stroke: ticks.stroke.color, strokeWidth: ticks.stroke.width, strokeOpacity: ticks.stroke.opacity })),
                labels.visible && (React.createElement(react_native_svg_1.G, { translateX: labels.label.dx, translateY: labels.label.dy + utils_1.scalePointToDimensions({ x: 0, y: value }, viewportDomain, dimensions).y },
                    React.createElement(react_native_svg_1.Text, { fontSize: labels.label.fontSize, fontWeight: labels.label.fontWeight, fontFamily: labels.label.fontFamily, fill: labels.label.color, opacity: labels.label.opacity, textAnchor: labels.label.textAnchor, rotation: labels.label.rotation }, labels.formatter(value))))));
        })));
};
exports.VerticalAxis = VerticalAxis;
var defaultProps = {
    includeOriginTick: true,
    theme: {
        axis: {
            visible: true,
            stroke: {
                color: '#bbb',
                width: 2,
                opacity: 1,
                dashArray: [],
            },
            dx: 0,
        },
        grid: {
            visible: true,
            stroke: {
                color: '#ccc',
                width: 1,
                opacity: 1,
                dashArray: [],
            },
        },
        ticks: {
            visible: true,
            stroke: {
                color: '#000',
                width: 1,
                opacity: 1,
            },
            dx: 0,
            length: 6,
        },
        labels: {
            visible: true,
            label: {
                color: '#000',
                fontSize: 10,
                fontWeight: 300,
                textAnchor: 'end',
                opacity: 1,
                dx: -4,
                dy: 4,
                rotation: 0,
            },
            formatter: function (v) { return String(v); },
        },
    },
};
