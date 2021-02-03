"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
it('Scaling from data and domain to dimensions - simple', function () {
    var dimensions = { top: 0, left: 0, width: 100, height: 100 };
    var domain = { x: { min: 0, max: 10 }, y: { min: 0, max: 10 } };
    var data = [
        { x: 1, y: 5 },
        { x: 3, y: 8 },
    ];
    var result = utils_1.scalePointsToDimensions(data, domain, dimensions);
    expect(result).toMatchObject([
        {
            x: 10,
            y: 50,
        },
        { x: 30, y: 20 },
    ]);
});
it('Scaling from data and domain to dimensions - moderate', function () {
    var dimensions = { top: 20, left: 30, width: 100, height: 100 };
    var domain = { x: { min: -30, max: -20 }, y: { min: -50, max: 500 } };
    var data = [
        { x: -29, y: 5 },
        { x: -20, y: 500 },
    ];
    var result = utils_1.scalePointsToDimensions(data, domain, dimensions);
    expect(result).toMatchObject([
        { x: 40, y: 110 },
        { x: 130, y: 20 },
    ]);
});
