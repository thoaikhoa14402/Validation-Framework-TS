"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../../../common/errors");
class LeapYearRule {
    constructor(errorMsg) {
        this.errorMessage = 'The year is not a leap year';
        if (errorMsg)
            this.errorMessage = errorMsg;
    }
    isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }
    validate(value) {
        const parsedDate = new Date(value);
        const year = parsedDate.getFullYear();
        if (isNaN(year)) {
            throw new Error('Invalid date format'); // Handle invalid date format
        }
        if (!this.isLeapYear(year)) {
            return errors_1.errorContext.createError({
                message: this.errorMessage,
                type: LeapYearRule.ruleName,
                path: '',
                value: value,
            });
        }
        return true;
    }
}
LeapYearRule.ruleName = 'date.rule.leapYear';
exports.default = LeapYearRule;
