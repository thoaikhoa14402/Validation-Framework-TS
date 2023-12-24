import { errorContext } from "../../../common/errors";
import { ValidationError } from "../../../common/errors/validation.error";
import { IDateRule } from "./rule.interface";

export default class LeapYearRule implements IDateRule {
  static ruleName = 'date.rule.leapYear';
  static errorMessage = 'The year is not a leap year';

  constructor(errorMsg?: string) {
    if (errorMsg) LeapYearRule.errorMessage = errorMsg;
  }

  private isLeapYear(year: number): boolean {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }

  validate(value: string): boolean | ValidationError {
    const parsedDate = new Date(value);
    const year = parsedDate.getFullYear();
    
    if (isNaN(year)) {
      throw new Error('Invalid date format'); // Handle invalid date format
    }

    if (!this.isLeapYear(year)) {
      return errorContext.createError({
        message: LeapYearRule.errorMessage,
        type: LeapYearRule.ruleName,
        path: '',
        value: value,
      });
    }
    return true;
  }
}
