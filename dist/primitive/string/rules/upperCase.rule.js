"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../../../common/errors");
class UppercaseRule {
    constructor(errorMsg) {
        this.errorMessage = 'The value does not contain uppercase characters';
        if (errorMsg)
            this.errorMessage = errorMsg;
    }
    validate(value) {
        if (typeof value !== 'string' || !/[A-Z]/.test(value)) {
            return errors_1.errorContext.createError({
                message: this.errorMessage,
                type: UppercaseRule.ruleName,
                path: '',
                value: value,
            });
        }
        return true;
    }
}
UppercaseRule.ruleName = 'string.rule.uppercase';
exports.default = UppercaseRule;
