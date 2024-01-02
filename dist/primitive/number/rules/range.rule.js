"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../../../common/errors");
class RangeRule {
    constructor(min, max, errorMsg) {
        this.errorMessage = 'The number is not within the specified range';
        this.min = min;
        this.max = max;
        if (errorMsg)
            this.errorMessage = errorMsg;
    }
    validate(value) {
        if (!(value >= this.min && value <= this.max)) {
            return errors_1.errorContext.createError({
                message: this.errorMessage,
                type: RangeRule.ruleName,
                path: '',
                value: value,
            });
        }
        return true;
    }
}
RangeRule.ruleName = 'number.rule.range';
exports.default = RangeRule;
