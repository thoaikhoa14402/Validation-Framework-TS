import { errorContext } from "../../../common/errors";
import { ValidationError } from "../../../common/errors/validation.error";
import { IValidatorRule } from "../../../common/validator/validator.rule.interface";
export default class MinLengthRule implements IValidatorRule {
  static ruleName = 'string.rule.min';
  errorMessage: string = 'The length of string is shorter than minimum'
  private min: number;

  constructor(min: number, errorMsg?: string) {
    this.min = min;
    if (errorMsg) this.errorMessage = errorMsg;
  }

  validate(value: string): boolean | ValidationError {
    if (!(value.length >= this.min)) {
      return errorContext.createError({
        message: this.errorMessage,
        type: MinLengthRule.ruleName,
        path: '',
        value: value,
      })
    }
    return true;
  }
}
