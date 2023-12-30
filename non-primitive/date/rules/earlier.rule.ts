import { errorContext } from "../../../common/errors";
import { ValidationError } from "../../../common/errors/validation.error";
import { IValidatorRule } from "../../../common/validator/validator.rule.interface";
export default class EarlierRule implements IValidatorRule {
  static ruleName = 'date.rule.earlier';
  errorMessage: string = 'The date is not earlier than the threshold'
  private threshold: string;

  constructor(threshold: string, errorMsg?: string) {
    this.threshold = threshold;
    if (errorMsg) this.errorMessage = errorMsg;
  }

  validate(value: string): boolean | ValidationError {
    if(Date.parse(value) >= Date.parse(this.threshold)) {
      return errorContext.createError({
        message: this.errorMessage,
        type: EarlierRule.ruleName,
        path: '',
        value: value,
      });
    }
    return true;
  }
}
