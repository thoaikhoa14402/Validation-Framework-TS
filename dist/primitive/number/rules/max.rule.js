"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../../../common/errors");
class MaxRule {
    constructor(max, errorMsg) {
        this.errorMessage = 'The number is greater than maximum';
        this.max = max;
        if (errorMsg)
            this.errorMessage = errorMsg;
    }
    validate(value) {
        if (!(value <= this.max)) {
            return errors_1.errorContext.createError({
                message: this.errorMessage,
                type: MaxRule.ruleName,
                path: '',
                value: value,
            });
        }
        return true;
    }
}
MaxRule.ruleName = 'number.rule.max';
exports.default = MaxRule;
