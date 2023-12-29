import { errorContext } from "../../../common/errors";
import { ValidationError } from "../../../common/errors/validation.error";
import { IDateRule } from "./rule.interface";

export default class Later implements IDateRule {
  static ruleName = 'date.rule.later';
 errorMessage: string = 'The date is not later than the threshold'
  private threshold: string;

  constructor(threshold: string, errorMsg?: string) {
    this.threshold = threshold;
    if (errorMsg) this.errorMessage = errorMsg;
  }

  validate(value: string): boolean | ValidationError {
    if(Date.parse(value) <= Date.parse(this.threshold)) {
      return errorContext.createError({
        message: this.errorMessage,
        type: Later.ruleName,
        path: '',
        value: value,
      });
    }
    return true;
  }
}
