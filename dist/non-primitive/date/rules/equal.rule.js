"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../../../common/errors");
class Equal {
    constructor(threshold, errorMsg) {
        this.errorMessage = 'The date is not equal to the threshold';
        this.threshold = threshold;
        if (errorMsg)
            this.errorMessage = errorMsg;
    }
    validate(value) {
        if (Date.parse(value) !== Date.parse(this.threshold)) {
            return errors_1.errorContext.createError({
                message: this.errorMessage,
                type: Equal.ruleName,
                path: '',
                value: value,
            });
        }
        return true;
    }
}
Equal.ruleName = 'date.rule.equal';
exports.default = Equal;
