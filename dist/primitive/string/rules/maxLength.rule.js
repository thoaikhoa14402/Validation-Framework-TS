"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../../../common/errors");
class MaxLengthRule {
    constructor(max, errorMsg) {
        this.errorMessage = 'The length of string is longer than maximum';
        this.max = max;
        if (errorMsg)
            this.errorMessage = errorMsg;
    }
    validate(value) {
        if (!(value.length <= this.max)) {
            return errors_1.errorContext.createError({
                message: this.errorMessage,
                type: MaxLengthRule.ruleName,
                path: '',
                value: value,
            });
        }
        return true;
    }
}
MaxLengthRule.ruleName = 'string.rule.max';
exports.default = MaxLengthRule;
