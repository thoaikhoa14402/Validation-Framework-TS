import { ValidationError } from "../../../common/errors/validation.error";
import { errorContext } from "../../../common/errors";
import { IValidatorRule } from "../../../common/validator/validator.rule.interface";
export default class UppercaseRule implements IValidatorRule {
  static ruleName = 'string.rule.uppercase';
  errorMessage: string = 'The value does not contain uppercase characters';

  constructor(errorMsg?: string) {
    if (errorMsg) this.errorMessage = errorMsg;
  }

  validate(value: string): boolean | ValidationError {
    if (typeof value !== 'string' || !/[A-Z]/.test(value)) {
      return errorContext.createError({
        message: this.errorMessage,
        type: UppercaseRule.ruleName,
        path: '',
        value: value,
      });
    }
    return true;
  }
}
