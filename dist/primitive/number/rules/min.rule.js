"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../../../common/errors");
class MinRule {
    constructor(min, errorMsg) {
        this.errorMessage = 'The number is less than minimum';
        this.min = min;
        if (errorMsg)
            this.errorMessage = errorMsg;
    }
    validate(value) {
        if (!(value >= this.min)) {
            return errors_1.errorContext.createError({
                message: this.errorMessage,
                type: MinRule.ruleName,
                path: '',
                value: value,
            });
        }
        return true;
    }
}
MinRule.ruleName = 'number.rule.min';
exports.default = MinRule;
