"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateViewportDomain = exports.calculateDataDimensions = void 0;
var calculateDataDimensions = function (dimensions, padding) {
    if (dimensions) {
        return {
            top: 0,
            left: 0,
            width: dimensions.width - padding.left - padding.right,
            height: dimensions.height - padding.top - padding.bottom,
        };
    }
    return { top: 0, left: 0, width: 10, height: 10 };
};
exports.calculateDataDimensions = calculateDataDimensions;
var calculateViewportDomain = function (viewport, domain, panX, panY) {
    var minX = Math.max(panX, domain.x.min);
    var maxX = Math.min(minX + viewport.size.width, domain.x.max);
    var minY = Math.max(panY, domain.y.min);
    var maxY = Math.min(minY + viewport.size.height, domain.y.max);
    return {
        x: { min: Math.min(minX, maxX - viewport.size.width), max: maxX },
        y: { min: Math.min(minY, maxY - viewport.size.height), max: maxY },
    };
};
exports.calculateViewportDomain = calculateViewportDomain;
