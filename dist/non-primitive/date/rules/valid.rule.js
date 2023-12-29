"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../../../common/errors");
class IsValid {
    constructor(errorMsg) {
        this.errorMessage = 'The date is invalid';
        if (errorMsg)
            this.errorMessage = errorMsg;
    }
    validate(value) {
        if (isNaN(new Date(value).getTime())) {
            return errors_1.errorContext.createError({
                message: this.errorMessage,
                type: IsValid.ruleName,
                path: '',
                value: value,
            });
        }
        return true;
    }
}
IsValid.ruleName = 'date.rule.valid';
exports.default = IsValid;
