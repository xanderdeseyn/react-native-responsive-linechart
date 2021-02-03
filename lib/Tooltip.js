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
exports.Tooltip = void 0;
var deepmerge_1 = __importDefault(require("deepmerge"));
var React = __importStar(require("react"));
var react_native_svg_1 = require("react-native-svg");
var ChartContext_1 = __importDefault(require("./ChartContext"));
var Tooltip = function (props) {
    var dimensions = React.useContext(ChartContext_1.default).dimensions;
    var _a = deepmerge_1.default(defaultProps, props), _b = _a.theme, label = _b.label, formatter = _b.formatter, shape = _b.shape, value = _a.value, position = _a.position;
    if (!dimensions || !value || !position) {
        return null;
    }
    return (React.createElement(React.Fragment, null,
        React.createElement(react_native_svg_1.Rect, { x: position.x - shape.width / 2 + shape.dx, y: position.y - shape.height / 2 - shape.dy, rx: shape.rx, fill: shape.color, opacity: shape.opacity, height: shape.height, width: shape.width }),
        React.createElement(react_native_svg_1.Text, { x: position.x + label.dx, y: position.y - label.dy, fontSize: label.fontSize, fontWeight: label.fontWeight, fontFamily: label.fontFamily, fill: label.color, opacity: label.opacity, textAnchor: label.textAnchor }, formatter(value))));
};
exports.Tooltip = Tooltip;
var defaultProps = {
    theme: {
        label: {
            color: 'white',
            fontSize: 12,
            fontWeight: 700,
            textAnchor: 'middle',
            opacity: 1,
            dx: 0,
            dy: 16.5,
        },
        shape: {
            width: 35,
            height: 20,
            dx: 0,
            dy: 20,
            rx: 4,
            color: 'black',
        },
        formatter: function (v) { return String(v.y); },
    },
};
