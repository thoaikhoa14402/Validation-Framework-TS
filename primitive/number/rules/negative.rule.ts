import { errorContext } from "../../../common/errors";
import { ValidationError } from "../../../common/errors/validation.error";
import { IValidatorRule } from "../../../common/validator/validator.rule.interface";
export default class NegativeRule implements IValidatorRule {
  static ruleName = 'number.rule.negative';
  errorMessage: string = 'The number is not a negative number'

  constructor(errorMsg?: string) {
    if (errorMsg) this.errorMessage = errorMsg;
  }

  validate(value: number): boolean | ValidationError {
    if(!(value<0)) {
      return errorContext.createError({
        message: this.errorMessage,
        type: NegativeRule.ruleName,
        path: '',
        value: value,
      });
    }
    return true;
  }
}
