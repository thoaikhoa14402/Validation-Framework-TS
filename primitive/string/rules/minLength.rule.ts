import { errorContext } from "../../../errors";
import { ValidationError } from "../../../errors/validation.error";
import { IStringRule } from "./rule.interface";

export default class MinLengthRule implements IStringRule {
  static ruleName = 'string.rule.min';
  static errorMessage = 'The length of string is shorter than minimum'
  private min: number;

  constructor(min: number, errorMsg?: string) {
    this.min = min;
    if (errorMsg) MinLengthRule.errorMessage = errorMsg;
  }

  validate(value: string): boolean | ValidationError {
    if (!(value.length >= this.min)) {
      return errorContext.createError({
        message: MinLengthRule.errorMessage,
        type: MinLengthRule.ruleName,
        path: '',
        value: value,
      })
    }
    return true;
  }
}
