import { errorContext } from "../../../errors";
import { ValidationError } from "../../../errors/validation.error";
import { IStringRule } from "./rule.interface";

export default class MaxLengthRule implements IStringRule {
  static ruleName = 'string.rule.max';
  static errorMessage = 'The length of string is longer than maximum'
  private max: number;

  constructor(max: number, errorMsg?: string) {
    this.max = max;
    if (errorMsg) MaxLengthRule.errorMessage = errorMsg;
  }

  validate(value: string): boolean | ValidationError {
    if(!(value.length <= this.max)) {
      return errorContext.createError({
        message: MaxLengthRule.errorMessage,
        type: MaxLengthRule.ruleName,
        path: '',
        value: value,
      });
    }
    return true;
  }
}
