import { IArrayRule } from "./rule.interface";
import { ValidationError } from "../../../common/errors/validation.error";
import errorContext from "../../../common/errors/error.ctx";

export default class LengthRule implements IArrayRule {
  static ruleName = "array.rule.length";
  static errorMessage = "The length of array is not equal length value";
  private length: number;

  constructor(length: number, errorMsg?: string) {
    if (errorMsg) LengthRule.errorMessage = errorMsg;
    this.length = length;
  }

  validate(value: unknown): boolean | ValidationError {
    if (Array.isArray(value) && value.length !== this.length) {
      return errorContext.createError({
        message: LengthRule.errorMessage,
        type: LengthRule.ruleName,
        path: "",
        value: value,
      });
    }
    return true;
  }
}
