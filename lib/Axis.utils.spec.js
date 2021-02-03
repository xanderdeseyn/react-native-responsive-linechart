"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Axis_utils_1 = require("./Axis.utils");
it('Calculating tick values for domain - simple', function () {
    var domain = { min: 0, max: 10 };
    var tickCount = 2;
    var result = Axis_utils_1.calculateTickValues(undefined, tickCount, domain);
    expect(result).toMatchObject([5, 10]);
});
it('Calculating tick values for domain - moderate', function () {
    var domain = { min: -10, max: 10 };
    var tickCount = 2;
    var result = Axis_utils_1.calculateTickValues(undefined, tickCount, domain);
    expect(result).toMatchObject([0, 10]);
});
it('Calculating tick values for domain - moderate 2', function () {
    var domain = { min: -10, max: 10 };
    var tickCount = 5;
    var result = Axis_utils_1.calculateTickValues(undefined, tickCount, domain);
    expect(result).toMatchObject([-6, -2, 2, 6, 10]);
});
