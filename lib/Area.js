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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Area = void 0;
var deepmerge_1 = __importDefault(require("deepmerge"));
var React = __importStar(require("react"));
var react_native_svg_1 = require("react-native-svg");
var ChartContext_1 = __importDefault(require("./ChartContext"));
var utils_1 = require("./utils");
var Area = function (props) {
    var _a = React.useContext(ChartContext_1.default), contextData = _a.data, dimensions = _a.dimensions, viewportDomain = _a.viewportDomain, viewportOrigin = _a.viewportOrigin;
    var randomGradientRef = React.useState(Math.random().toFixed(10).toString())[0];
    var _b = deepmerge_1.default(defaultProps, props), gradient = _b.theme.gradient, _c = _b.data, data = _c === void 0 ? contextData : _c, tension = _b.tension, smoothing = _b.smoothing;
    if (!dimensions) {
        return null;
    }
    var points = utils_1.scalePointsToDimensions(__spreadArrays(data), viewportDomain, dimensions);
    var path = utils_1.svgPath(points, smoothing, tension);
    var firstPoint = points[0];
    var lastPoint = points[points.length - 1];
    var closedPath = utils_1.appendPointsToPath(path, [
        { x: lastPoint.x, y: dimensions.height },
        { x: firstPoint.x, y: dimensions.height },
    ]);
    return (React.createElement(react_native_svg_1.G, { translateX: viewportOrigin.x, translateY: viewportOrigin.y, mask: "url(#Mask)" },
        React.createElement(react_native_svg_1.Defs, null,
            React.createElement(react_native_svg_1.LinearGradient, { id: "grad" + randomGradientRef, x1: "0%", y1: "0%", x2: "0%", y2: "100%" },
                React.createElement(react_native_svg_1.Stop, { offset: "0%", stopColor: gradient.from.color, stopOpacity: gradient.from.opacity }),
                React.createElement(react_native_svg_1.Stop, { offset: "100%", stopColor: gradient.to.color, stopOpacity: gradient.to.opacity }))),
        React.createElement(react_native_svg_1.Path, { d: closedPath, fill: "url(#grad" + randomGradientRef + ")", strokeWidth: "0" })));
};
exports.Area = Area;
var defaultProps = {
    theme: {
        gradient: {
            from: {
                color: 'red',
                opacity: 1,
            },
            to: {
                color: 'red',
                opacity: 0.2,
            },
        },
    },
    smoothing: 'none',
    tension: 0.3,
};
