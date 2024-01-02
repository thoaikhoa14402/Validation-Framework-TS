"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../../../common/errors");
class DecimalRule {
    constructor(errorMsg) {
        this.errorMessage = 'The value is not a decimal number';
        if (errorMsg)
            this.errorMessage = errorMsg;
    }
    validate(value) {
        if (typeof value !== 'number' || isNaN(value) || Number.isInteger(value)) {
            return errors_1.errorContext.createError({
                message: this.errorMessage,
                type: DecimalRule.ruleName,
                path: '',
                value: value,
            });
        }
        return true;
    }
}
DecimalRule.ruleName = 'number.rule.decimal';
exports.default = DecimalRule;
