"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../../../common/errors");
class MixedRule {
    constructor(callback, errorMsg) {
        this.errorMessage = "The validation is error";
        this.callback = callback;
        if (errorMsg)
            this.errorMessage = errorMsg;
    }
    validate(value) {
        if (!this.callback(value)) {
            return errors_1.errorContext.createError({
                message: this.errorMessage,
                type: MixedRule.ruleName,
                path: '',
                value: value,
            });
        }
        return this.callback(value);
    }
}
MixedRule.ruleName = "string.rule.mixed";
exports.default = MixedRule;
