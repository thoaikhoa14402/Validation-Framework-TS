"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../../../common/errors");
class Later {
    constructor(threshold, errorMsg) {
        this.errorMessage = 'The date is not later than the threshold';
        this.threshold = threshold;
        if (errorMsg)
            this.errorMessage = errorMsg;
    }
    validate(value) {
        if (Date.parse(value) <= Date.parse(this.threshold)) {
            return errors_1.errorContext.createError({
                message: this.errorMessage,
                type: Later.ruleName,
                path: '',
                value: value,
            });
        }
        return true;
    }
}
Later.ruleName = 'date.rule.later';
exports.default = Later;
