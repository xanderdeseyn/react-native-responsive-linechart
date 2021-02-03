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
Object.defineProperty(exports, "__esModule", { value: true });
exports.useComponentDimensions = void 0;
var React = __importStar(require("react"));
var useComponentDimensions = function () {
    var _a = React.useState(), dimensions = _a[0], setDimensions = _a[1];
    var onLayout = React.useCallback(function (event) {
        var _a = event.nativeEvent.layout, width = _a.width, height = _a.height;
        setDimensions({ width: width, height: height });
    }, []);
    return { dimensions: dimensions, onLayout: onLayout };
};
exports.useComponentDimensions = useComponentDimensions;
