import { IArrayRule } from "./rule.interface";
import { ValidationError } from "../../../errors/validation.error";
import errorContext from "../../../errors/error.ctx";

export default class MaxLengthRule implements IArrayRule {
  static ruleName = 'array.rule.max';
  static errorMessage = "The length of array is longer than maximum"
  private max: number;

  constructor(max: number,errorMsg?: string) {
    if (errorMsg) MaxLengthRule.errorMessage = errorMsg;
    this.max = max
  }
  
  validate(value: unknown): boolean | ValidationError {
    if (Array.isArray(value) && value.length > this.max) {
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

