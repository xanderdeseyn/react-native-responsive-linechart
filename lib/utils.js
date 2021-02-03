"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.svgPath = exports.appendPointsToPath = exports.scalePointsToDimensions = exports.scalePointToDimensions = exports.formatDataForSVG = void 0;
var monotone_cubic_spline_1 = __importDefault(require("@yr/monotone-cubic-spline"));
var bezier_1 = __importDefault(require("paths-js/bezier"));
var polygon_1 = __importDefault(require("paths-js/polygon"));
var formatDataForSVG = function (data) {
    return data.map(function (p) { return p.x + ',' + p.y; }).join(' ');
};
exports.formatDataForSVG = formatDataForSVG;
var scalePointToDimensions = function (data, domain, dimensions) { return ({
    x: scaleXValueToDimensions(data.x, domain, dimensions),
    y: scaleYValueToDimensions(data.y, domain, dimensions),
}); };
exports.scalePointToDimensions = scalePointToDimensions;
var scalePointsToDimensions = function (data, domain, dimensions) {
    return data.map(function (p) { return exports.scalePointToDimensions(p, domain, dimensions); });
};
exports.scalePointsToDimensions = scalePointsToDimensions;
var scaleXValueToDimensions = function (x, domain, dimensions) {
    return dimensions.left + ((x - domain.x.min) * dimensions.width) / Math.abs(domain.x.max - domain.x.min);
};
var scaleYValueToDimensions = function (y, domain, dimensions) {
    return dimensions.height + dimensions.top - ((y - domain.y.min) * dimensions.height) / Math.abs(domain.y.max - domain.y.min);
};
var appendPointsToPath = function (path, points) {
    return path + " " + points.map(function (p) { return "L " + p.x + " " + p.y; }).join(' ');
};
exports.appendPointsToPath = appendPointsToPath;
var svgPath = function (points, smoothing, tension) {
    if (smoothing === 'bezier') {
        return bezierPath(points, tension);
    }
    else if (smoothing === 'cubic-spline' && points.length > 1) {
        return splinePath(points);
    }
    else {
        return linearPath(points);
    }
};
exports.svgPath = svgPath;
var bezierPath = function (points, tension) {
    return bezier_1.default({ points: points.map(function (p) { return [p.x, p.y]; }), tension: tension }).path.print();
};
var splinePath = function (points) {
    var splinePoints = monotone_cubic_spline_1.default.points(points.map(function (p) { return [p.x, p.y]; }));
    return monotone_cubic_spline_1.default.svgPath(splinePoints);
};
var linearPath = function (points) {
    return polygon_1.default({ points: points.map(function (p) { return [p.x, p.y]; }) }).path.print();
};
