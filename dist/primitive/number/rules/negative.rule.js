"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../../../common/errors");
class NegativeRule {
    constructor(errorMsg) {
        this.errorMessage = 'The number is not a negative number';
        if (errorMsg)
            this.errorMessage = errorMsg;
    }
    validate(value) {
        if (!(value < 0)) {
            return errors_1.errorContext.createError({
                message: this.errorMessage,
                type: NegativeRule.ruleName,
                path: '',
                value: value,
            });
        }
        return true;
    }
}
NegativeRule.ruleName = 'number.rule.negative';
exports.default = NegativeRule;
