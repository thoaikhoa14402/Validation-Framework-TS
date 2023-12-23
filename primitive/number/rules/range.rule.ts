import { errorContext } from "../../../common/errors";
import { ValidationError } from "../../../common/errors/validation.error";
import { INumberRule } from "./rule.interface";

export default class RangeRule implements INumberRule {
  static ruleName = 'number.rule.range';
  static errorMessage = 'The number is not within the specified range';
  private min: number;
  private max: number;

  constructor(min: number, max: number, errorMsg?: string) {
    this.min = min;
    this.max = max;
    if (errorMsg) RangeRule.errorMessage = errorMsg;
  }

  validate(value: number): boolean | ValidationError {
    if (!(value >= this.min && value <= this.max)) {
      return errorContext.createError({
        message: RangeRule.errorMessage,
        type: RangeRule.ruleName,
        path: '',
        value: value,
      });
    }
    return true;
  }
}
