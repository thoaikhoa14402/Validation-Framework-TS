"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../../../common/errors");
class FalsyRule {
    constructor(errorMsg) {
        this.errorMessage = 'The value is not falsy';
        if (errorMsg)
            this.errorMessage = errorMsg;
    }
    validate(value) {
        if (value) {
            return errors_1.errorContext.createError({
                message: this.errorMessage,
                type: FalsyRule.ruleName,
                path: '',
                value: value,
            });
        }
        return true;
    }
}
FalsyRule.ruleName = 'boolean.rule.falsy';
exports.default = FalsyRule;
