import { errorContext } from "../../../errors";
import { ValidationError } from "../../../errors/validation.error";
import { INumberRule } from "./rule.interface";

export default class MinRule implements INumberRule {
  static ruleName = 'number.rule.min';
  static errorMessage = 'The number is less than minimum'
  private min: number;

  constructor(min: number, errorMsg?: string) {
    this.min = min;
    if (errorMsg) MinRule.errorMessage = errorMsg;
  }

  validate(value: number): boolean | ValidationError {
    if(!(value >= this.min)) {
      return errorContext.createError({
        message: MinRule.errorMessage,
        type: MinRule.ruleName,
        path: '',
        value: value,
      });
    }
    return true;
  }
}
