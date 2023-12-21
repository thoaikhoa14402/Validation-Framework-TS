import { errorContext } from "../../../common/errors";
import { ValidationError } from "../../../common/errors/validation.error";
import { INumberRule } from "./rule.interface";

export default class MaxRule implements INumberRule {
  static ruleName = 'number.rule.max';
  static errorMessage = 'The number is greater than maximum'
  private max: number;

  constructor(max: number, errorMsg?: string) {
    this.max = max;
    if (errorMsg) MaxRule.errorMessage = errorMsg;
  }

  validate(value: number): boolean | ValidationError {
    if(!(value <= this.max)) {
      return errorContext.createError({
        message: MaxRule.errorMessage,
        type: MaxRule.ruleName,
        path: '',
        value: value,
      });
    }
    return true;
  }
}
