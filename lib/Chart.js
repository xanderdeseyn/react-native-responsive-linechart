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
exports.Chart = void 0;
var React = __importStar(require("react"));
var deepmerge_1 = __importDefault(require("deepmerge"));
var react_native_1 = require("react-native");
var react_native_gesture_handler_1 = require("react-native-gesture-handler");
var react_1 = __importDefault(require("fast-deep-equal/react"));
var lodash_clamp_1 = __importDefault(require("lodash.clamp"));
var lodash_minby_1 = __importDefault(require("lodash.minby"));
var lodash_maxby_1 = __importDefault(require("lodash.maxby"));
var lodash_debounce_1 = __importDefault(require("lodash.debounce"));
var react_native_svg_1 = __importStar(require("react-native-svg"));
var useComponentDimensions_1 = require("./useComponentDimensions");
var ChartContext_1 = require("./ChartContext");
var Chart_utils_1 = require("./Chart.utils");
var utils_1 = require("./utils");
var Chart = React.memo(React.forwardRef(function (props, ref) {
    var _a = deepmerge_1.default(computeDefaultProps(props), props), style = _a.style, children = _a.children, _b = _a.data, data = _b === void 0 ? [] : _b, padding = _a.padding, xDomain = _a.xDomain, yDomain = _a.yDomain, viewport = _a.viewport, disableGestures = _a.disableGestures, disableTouch = _a.disableTouch;
    var _c = useComponentDimensions_1.useComponentDimensions(), dimensions = _c.dimensions, onLayout = _c.onLayout;
    var dataDimensions = Chart_utils_1.calculateDataDimensions(dimensions, padding);
    var tapGesture = React.createRef(); // declared within constructor
    var panGesture = React.createRef();
    var _d = React.useState(undefined), lastTouch = _d[0], setLastTouch = _d[1];
    var _e = React.useState(viewport.initialOrigin.x), panX = _e[0], setPanX = _e[1];
    var _f = React.useState(viewport.initialOrigin.y), panY = _f[0], setPanY = _f[1];
    var offset = React.useState(new react_native_1.Animated.ValueXY({ x: viewport.initialOrigin.x, y: viewport.initialOrigin.y }))[0];
    var viewportDomain = Chart_utils_1.calculateViewportDomain(viewport, {
        x: xDomain,
        y: yDomain,
    }, panX, panY);
    var handleTouchEvent = React.useCallback(lodash_debounce_1.default(function (x, y) {
        if (dataDimensions) {
            setLastTouch({
                position: {
                    x: lodash_clamp_1.default(x - padding.left, 0, dataDimensions.width),
                    y: lodash_clamp_1.default(y - padding.top, 0, dataDimensions.height),
                },
                type: 'tap',
            });
        }
        return true;
    }, 300, { leading: true, trailing: false }), [JSON.stringify(dataDimensions)]);
    var scrollXValue = function (x) {
        if (dataDimensions) {
            var factorX = viewport.size.width / dataDimensions.width;
            setPanX(offset.x._value - x * factorX);
            offset.x.setValue(lodash_clamp_1.default(offset.x._value - x, xDomain.min, xDomain.max - viewport.size.width));
        }
    };
    React.useImperativeHandle(ref, function () { return ({ scrollXValue: scrollXValue }); });
    var handlePanEvent = function (evt) {
        if (dataDimensions) {
            var factorX = viewport.size.width / dataDimensions.width;
            setPanX(offset.x._value - evt.nativeEvent.translationX * factorX);
            var factorY = viewport.size.height / dataDimensions.height;
            setPanY(offset.y._value + evt.nativeEvent.translationY * factorY);
            if (evt.nativeEvent.state === react_native_gesture_handler_1.State.END) {
                offset.x.setValue(lodash_clamp_1.default(offset.x._value - evt.nativeEvent.translationX * factorX, xDomain.min, xDomain.max - viewport.size.width));
                offset.y.setValue(lodash_clamp_1.default(offset.y._value + evt.nativeEvent.translationY * factorY, yDomain.min, yDomain.max - viewport.size.height));
                setLastTouch({
                    position: {
                        x: lodash_clamp_1.default(evt.nativeEvent.x - padding.left, 0, dataDimensions.width),
                        y: lodash_clamp_1.default(evt.nativeEvent.y - padding.top, 0, dataDimensions.height),
                    },
                    translation: {
                        x: evt.nativeEvent.translationX,
                        y: evt.nativeEvent.translationY,
                    },
                    type: 'panEnd',
                });
            }
            else {
                setLastTouch({
                    position: {
                        x: lodash_clamp_1.default(evt.nativeEvent.x - padding.left, 0, dataDimensions.width),
                        y: lodash_clamp_1.default(evt.nativeEvent.y - padding.top, 0, dataDimensions.height),
                    },
                    translation: {
                        x: evt.nativeEvent.translationX,
                        y: evt.nativeEvent.translationY,
                    },
                    type: 'pan',
                });
            }
        }
        return true;
    };
    var _onTouchGestureEvent = react_native_1.Animated.event([{ nativeEvent: {} }], {
        useNativeDriver: true,
        listener: function (evt) {
            // Necessary to debounce function, see https://medium.com/trabe/react-syntheticevent-reuse-889cd52981b6
            if (evt.nativeEvent.state === react_native_gesture_handler_1.State.ACTIVE) {
                handleTouchEvent(evt.nativeEvent.x, evt.nativeEvent.y);
            }
        },
    });
    var _onPanGestureEvent = react_native_1.Animated.event([{ nativeEvent: {} }], {
        useNativeDriver: true,
        listener: handlePanEvent,
    });
    var childComponents = React.Children.toArray(children);
    // undefined because ForwardRef (Line) has name undefined
    var lineAndAreaComponents = childComponents.filter(function (c) { var _a, _b; return ['Area', undefined].includes((_b = (_a = c) === null || _a === void 0 ? void 0 : _a.type) === null || _b === void 0 ? void 0 : _b.name); });
    var otherComponents = childComponents.filter(function (c) { var _a, _b; return !['Area', undefined].includes((_b = (_a = c) === null || _a === void 0 ? void 0 : _a.type) === null || _b === void 0 ? void 0 : _b.name); });
    return (React.createElement(react_native_1.View, { style: style, onLayout: onLayout }, !!dimensions && (React.createElement(react_native_gesture_handler_1.TapGestureHandler, { enabled: !disableTouch, onHandlerStateChange: _onTouchGestureEvent, ref: tapGesture },
        React.createElement(react_native_1.Animated.View, { style: { width: dimensions.width, height: dimensions.height } },
            React.createElement(react_native_gesture_handler_1.PanGestureHandler, { enabled: !disableGestures, minDeltaX: 10, minDeltaY: 10, onGestureEvent: _onPanGestureEvent, onHandlerStateChange: _onPanGestureEvent, ref: panGesture },
                React.createElement(react_native_1.Animated.View, { style: { width: dimensions.width, height: dimensions.height } },
                    React.createElement(ChartContext_1.ChartContextProvider, { value: {
                            data: data,
                            dimensions: dataDimensions,
                            domain: {
                                x: xDomain,
                                y: yDomain,
                            },
                            viewportDomain: viewportDomain,
                            viewportOrigin: utils_1.scalePointToDimensions({ x: viewportDomain.x.min, y: viewportDomain.y.max }, viewportDomain, dataDimensions),
                            viewport: viewport,
                            lastTouch: lastTouch,
                        } },
                        React.createElement(react_native_svg_1.default, { width: dimensions.width, height: dimensions.height },
                            React.createElement(react_native_svg_1.G, { translateX: padding.left, translateY: padding.top },
                                otherComponents,
                                React.createElement(react_native_svg_1.Defs, null,
                                    React.createElement(react_native_svg_1.Mask, { id: "Mask", x: 0, y: 0, width: dataDimensions.width, height: dataDimensions.height },
                                        React.createElement(react_native_svg_1.Rect, { x: "0", y: "0", width: dataDimensions.width, height: dataDimensions.height, fill: "#ffffff" }))),
                                lineAndAreaComponents))))))))));
}), react_1.default);
exports.Chart = Chart;
var computeDefaultProps = function (props) {
    var _a, _b;
    var _c = props.data, data = _c === void 0 ? [] : _c;
    var xDomain = (_a = props.xDomain) !== null && _a !== void 0 ? _a : {
        min: data.length > 0 ? lodash_minby_1.default(data, function (d) { return d.x; }).x : 0,
        max: data.length > 0 ? lodash_maxby_1.default(data, function (d) { return d.x; }).x : 10,
    };
    var yDomain = (_b = props.yDomain) !== null && _b !== void 0 ? _b : {
        min: data.length > 0 ? lodash_minby_1.default(data, function (d) { return d.y; }).y : 0,
        max: data.length > 0 ? lodash_maxby_1.default(data, function (d) { return d.y; }).y : 10,
    };
    return {
        padding: {
            left: 0,
            top: 0,
            bottom: 0,
            right: 0,
        },
        xDomain: xDomain,
        yDomain: yDomain,
        viewport: {
            size: { width: Math.abs(xDomain.max - xDomain.min), height: Math.abs(yDomain.max - yDomain.min) },
            initialOrigin: { x: xDomain.min, y: yDomain.min },
        },
    };
};
