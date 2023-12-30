import errorContext from "../../../common/errors/error.ctx";
import { ValidationError } from "../../../common/errors/validation.error";
import { IValidatorRule } from "../../../common/validator/validator.rule.interface";
export default class LengthRule implements IValidatorRule {
  static ruleName = "array.rule.length";
  errorMessage: string = "The length of array is not equal to the value";
  private length: number;

  constructor(length: number, errorMsg?: string) {
    if (errorMsg) this.errorMessage = errorMsg;
    this.length = length;
  }

  validate(value: unknown): boolean | ValidationError {
    if (Array.isArray(value) && value.length !== this.length) {
      return errorContext.createError({
        message: this.errorMessage,
        type: LengthRule.ruleName,
        path: "",
        value: value,
      });
    }
    return true;
  }
}
