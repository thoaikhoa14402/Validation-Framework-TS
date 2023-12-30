import errorContext from "../../../common/errors/error.ctx";
import { ValidationError } from "../../../common/errors/validation.error";
import { IValidatorRule } from "../../../common/validator/validator.rule.interface";
export default class NotEmptyRule implements IValidatorRule {
  static ruleName = 'array.rule.notEmpty';
  errorMessage: string = "The array is empty"

  constructor(errorMsg?: string) {
    if (errorMsg) this.errorMessage = errorMsg;
  }
  
  validate(value: unknown): boolean | ValidationError {
    if (Array.isArray(value) && value.length == 0  ) {
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

