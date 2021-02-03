"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateTickValues = exports.filterValuesForDomain = void 0;
var filterValuesForDomain = function (values, domain) {
    return values.filter(function (v) { return v >= domain.min && v <= domain.max; });
};
exports.filterValuesForDomain = filterValuesForDomain;
var calculateTickValues = function (tickValues, tickCount, domain, includeOriginTick) {
    var ticks = tickValues;
    var difference = Math.abs(domain.max - domain.min);
    var originTickOffset = includeOriginTick ? 1 : 0;
    if (!ticks && tickCount) {
        ticks = new Array(tickCount)
            .fill(undefined)
            .map(function (v, i) { return domain.min + (difference * (i + 1 - originTickOffset)) / (tickCount - originTickOffset); });
    }
    if (ticks) {
        return exports.filterValuesForDomain(ticks, domain);
    }
    return [];
};
exports.calculateTickValues = calculateTickValues;
