"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateTooltipIndex = exports.adjustPointsForThickStroke = void 0;
var lodash_clonedeep_1 = __importDefault(require("lodash.clonedeep"));
var adjustPointsForThickStroke = function (originalPoints, stroke) {
    var points = lodash_clonedeep_1.default(originalPoints);
    // First and last points are adjusted to prevent "fat" lines from flowing out of the chart
    if (points.length >= 2) {
        points[0].x = points[0].x + Math.floor(stroke.width / 2);
        points[points.length - 1].x = points[points.length - 1].x - stroke.width / 2;
    }
    return points;
};
exports.adjustPointsForThickStroke = adjustPointsForThickStroke;
var smallestIndex = function (arr) {
    var lowest = 0;
    for (var i = 1; i < arr.length; i++) {
        if (arr[i] < arr[lowest])
            lowest = i;
    }
    return lowest;
};
var calculateTooltipIndex = function (points, lastTouch) {
    if (!lastTouch || points.length < 2) {
        return undefined;
    }
    return smallestIndex(points.map(function (p) { return Math.abs(p.x - lastTouch.x); }));
};
exports.calculateTooltipIndex = calculateTooltipIndex;
