"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../../../common/errors");
class EarlierRule {
    constructor(threshold, errorMsg) {
        this.errorMessage = 'The date is not earlier than the threshold';
        this.threshold = threshold;
        if (errorMsg)
            this.errorMessage = errorMsg;
    }
    validate(value) {
        if (Date.parse(value) >= Date.parse(this.threshold)) {
            return errors_1.errorContext.createError({
                message: this.errorMessage,
                type: EarlierRule.ruleName,
                path: '',
                value: value,
            });
        }
        return true;
    }
}
EarlierRule.ruleName = 'date.rule.earlier';
exports.default = EarlierRule;
