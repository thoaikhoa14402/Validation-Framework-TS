"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../../../common/errors");
class PositiveRule {
    constructor(errorMsg) {
        this.errorMessage = 'The number is not a positive number';
        if (errorMsg)
            this.errorMessage = errorMsg;
    }
    validate(value) {
        if (!(value > 0)) {
            return errors_1.errorContext.createError({
                message: this.errorMessage,
                type: PositiveRule.ruleName,
                path: '',
                value: value,
            });
        }
        return true;
    }
}
PositiveRule.ruleName = 'number.rule.positive';
exports.default = PositiveRule;
