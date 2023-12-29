import { errorContext } from "../../../common/errors";
import { ValidationError } from "../../../common/errors/validation.error";
import { IValidatorRule } from "../../../common/validator/validator.rule.interface";
export default class LaterRule implements IValidatorRule {
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
        type: LaterRule.ruleName,
        path: '',
        value: value,
      });
    }
    return true;
  }
}
