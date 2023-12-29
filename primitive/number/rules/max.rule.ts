import { errorContext } from "../../../common/errors";
import { ValidationError } from "../../../common/errors/validation.error";
import { IValidatorRule } from "../../../common/validator/validator.rule.interface";
export default class MaxRule implements IValidatorRule {
  static ruleName = 'number.rule.max';
  errorMessage: string = 'The number is greater than maximum'
  private max: number;

  constructor(max: number, errorMsg?: string) {
    this.max = max;
    if (errorMsg) this.errorMessage = errorMsg;
  }

  validate(value: number): boolean | ValidationError {
    if(!(value <= this.max)) {
      return errorContext.createError({
        message: this.errorMessage,
        type: MaxRule.ruleName,
        path: '',
        value: value,
      });
    }
    return true;
  }
}
