import { errorContext } from "../../../common/errors";
import { ValidationError } from "../../../common/errors/validation.error";
import { IValidatorRule } from "../../../common/validator/validator.rule.interface";
export default class RangeRule implements IValidatorRule {
  static ruleName = 'number.rule.range';
  errorMessage: string = 'The number is not within the specified range';
  private min: number;
  private max: number;

  constructor(min: number, max: number, errorMsg?: string) {
    this.min = min;
    this.max = max;
    if (errorMsg) this.errorMessage = errorMsg;
  }

  validate(value: number): boolean | ValidationError {
    if (!(value >= this.min && value <= this.max)) {
      return errorContext.createError({
        message: this.errorMessage,
        type: RangeRule.ruleName,
        path: '',
        value: value,
      });
    }
    return true;
  }
}
