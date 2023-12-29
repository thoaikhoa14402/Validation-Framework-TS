import errorContext from "../../../common/errors/error.ctx";
import { ValidationError } from "../../../common/errors/validation.error";
import { IValidatorRule } from "../../../common/validator/validator.rule.interface";
export default class MinLengthRule implements IValidatorRule {
  static ruleName = 'array.rule.min';
  errorMessage: string = "The length of array is longer than minimum"
  private min: number;

  constructor(min: number,errorMsg?: string) {
    if (errorMsg) this.errorMessage = errorMsg;
    this.min = min
  }
  
  validate(value: unknown): boolean | ValidationError {
    if (Array.isArray(value) && value.length < this.min) {
      return errorContext.createError({
        message: this.errorMessage,
        type: MinLengthRule.ruleName,
        path: '',
        value: value,
      });
    }
    return true;
  }
}

