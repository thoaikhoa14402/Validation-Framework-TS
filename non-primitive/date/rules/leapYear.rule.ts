import { errorContext } from "../../../common/errors";
import { ValidationError } from "../../../common/errors/validation.error";
import { IValidatorRule } from "../../../common/validator/validator.rule.interface";
export default class LeapYearRule implements IValidatorRule {
  static ruleName = 'date.rule.leapYear';
 errorMessage: string = 'The year is not a leap year';

  constructor(errorMsg?: string) {
    if (errorMsg) this.errorMessage = errorMsg;
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
        message: this.errorMessage,
        type: LeapYearRule.ruleName,
        path: '',
        value: value,
      });
    }
    return true;
  }
}
