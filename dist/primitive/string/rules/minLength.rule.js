"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../../../common/errors");
class MinLengthRule {
    constructor(min, errorMsg) {
        this.errorMessage = 'The length of string is shorter than minimum';
        this.min = min;
        if (errorMsg)
            this.errorMessage = errorMsg;
    }
    validate(value) {
        if (!(value.length >= this.min)) {
            return errors_1.errorContext.createError({
                message: this.errorMessage,
                type: MinLengthRule.ruleName,
                path: '',
                value: value,
            });
        }
        return true;
    }
}
MinLengthRule.ruleName = 'string.rule.min';
exports.default = MinLengthRule;
