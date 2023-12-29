import { errorContext } from "../../../common/errors";
import { ValidationError } from "../../../common/errors/validation.error";
import { IValidatorRule } from "../../../common/validator/validator.rule.interface";
export default class IsValidRule implements IValidatorRule {
  static ruleName = 'date.rule.valid';
  errorMessage: string = 'The date is invalid'

  constructor(errorMsg?: string) {
    if (errorMsg) this.errorMessage = errorMsg;
  }

  validate(value: string): boolean | ValidationError {
    if(isNaN(new Date(value).getTime())) {
      return errorContext.createError({
        message: this.errorMessage,
        type: IsValidRule.ruleName,
        path: '',
        value: value,
      });
    }
    return true;
  }
}
