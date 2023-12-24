import { errorContext } from "../../../common/errors";
import { ValidationError } from "../../../common/errors/validation.error";
import { IDateRule } from "./rule.interface";

export default class Later implements IDateRule {
  static ruleName = 'date.rule.later';
  static errorMessage = 'The date is not later than the threshold'
  private threshold: string;

  constructor(threshold: string, errorMsg?: string) {
    this.threshold = threshold;
    if (errorMsg) Later.errorMessage = errorMsg;
  }

  validate(value: string): boolean | ValidationError {
    if(Date.parse(value) <= Date.parse(this.threshold)) {
      return errorContext.createError({
        message: Later.errorMessage,
        type: Later.ruleName,
        path: '',
        value: value,
      });
    }
    return true;
  }
}
