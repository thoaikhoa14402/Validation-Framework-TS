"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../../../common/errors");
class TruthyRule {
    constructor(errorMsg) {
        this.errorMessage = 'The value is not truthy';
        if (errorMsg)
            this.errorMessage = errorMsg;
    }
    validate(value) {
        if (!value) {
            return errors_1.errorContext.createError({
                message: this.errorMessage,
                type: TruthyRule.ruleName,
                path: '',
                value: value,
            });
        }
        return true;
    }
}
TruthyRule.ruleName = 'boolean.rule.truthy';
exports.default = TruthyRule;
