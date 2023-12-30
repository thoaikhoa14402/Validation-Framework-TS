import { ValidationError } from "../../../common/errors/validation.error";
import { IValidatorRule } from "../../../common/validator/validator.rule.interface";
import errorContext from "../../../common/errors/error.ctx";

export default class NotEmptyRule implements IValidatorRule {
  static ruleName = 'string.rule.notEmpty';
  errorMessage: string = "The string is empty"

  constructor(errorMsg?: string) {
    if (errorMsg) this.errorMessage = errorMsg;
  }
  
  validate(value: string): boolean | ValidationError {
    if (!(value.trim() !== '')) {
      return errorContext.createError({
        message: this.errorMessage,
        type: NotEmptyRule.ruleName,
        path: '',
        value: value,
      });
    }
    return true;
  }
}

