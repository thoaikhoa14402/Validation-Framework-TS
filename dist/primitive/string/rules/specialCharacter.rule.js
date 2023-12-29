"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../../../common/errors");
class SpecialCharacterRule {
    constructor(errorMsg) {
        this.errorMessage = 'The string does not contain special characters';
        if (errorMsg)
            this.errorMessage = errorMsg;
    }
    validate(value) {
        if (typeof value !== 'string' || !/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
            return errors_1.errorContext.createError({
                message: this.errorMessage,
                type: SpecialCharacterRule.ruleName,
                path: '',
                value: value,
            });
        }
        return true;
    }
}
SpecialCharacterRule.ruleName = 'string.rule.specialCharacter';
exports.default = SpecialCharacterRule;
