import { errorContext } from "../../../common/errors";
import { ValidationError } from "../../../common/errors/validation.error";
import { IDateRule } from "./rule.interface";

export default class Equal implements IDateRule {
  static ruleName = 'date.rule.equal';
  static errorMessage = 'The date is not equal to the threshold'
  private threshold: string;

  constructor(threshold: string, errorMsg?: string) {
    this.threshold = threshold;
    if (errorMsg) Equal.errorMessage = errorMsg;
  }

  validate(value: string): boolean | ValidationError {
    if(Date.parse(value) !== Date.parse(this.threshold)) {
      return errorContext.createError({
        message: Equal.errorMessage,
        type: Equal.ruleName,
        path: '',
        value: value,
      });
    }
    return true;
  }
}
