"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../../../common/errors");
class IntegerRule {
    constructor(errorMsg) {
        this.errorMessage = 'The number is not a integer';
        if (errorMsg)
            this.errorMessage = errorMsg;
    }
    validate(value) {
        if (!(Number.isInteger(value))) {
            return errors_1.errorContext.createError({
                message: this.errorMessage,
                type: IntegerRule.ruleName,
                path: '',
                value: value,
            });
        }
        return true;
    }
}
IntegerRule.ruleName = 'number.rule.integer';
exports.default = IntegerRule;
