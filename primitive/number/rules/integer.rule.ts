import { errorContext } from "../../../common/errors";
import { ValidationError } from "../../../common/errors/validation.error";
import { IValidatorRule } from "../../../common/validator/validator.rule.interface";
export default class IntegerRule implements IValidatorRule {
  static ruleName = 'number.rule.integer';
  errorMessage: string = 'The number is not a integer'

  constructor(errorMsg?: string) {
    if (errorMsg) this.errorMessage = errorMsg;
  }

  validate(value: number): boolean | ValidationError {
    if(!(Number.isInteger(value))) {
      return errorContext.createError({
        message: this.errorMessage,
        type: IntegerRule.ruleName,
        path: '',
        value: value,
      });
    }
    return true;
  }
}
