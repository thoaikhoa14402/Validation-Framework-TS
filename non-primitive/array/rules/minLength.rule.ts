import { IArrayRule } from "./rule.interface";
import { ValidationError } from "../../../common/errors/validation.error";
import errorContext from "../../../common/errors/error.ctx";

export default class MinLengthRule implements IArrayRule {
  static ruleName = 'array.rule.min';
  static errorMessage = "The length of array is longer than minimum"
  private min: number;

  constructor(min: number,errorMsg?: string) {
    if (errorMsg) MinLengthRule.errorMessage = errorMsg;
    this.min = min
  }
  
  validate(value: unknown): boolean | ValidationError {
    if (Array.isArray(value) && value.length < this.min) {
      return errorContext.createError({
        message: MinLengthRule.errorMessage,
        type: MinLengthRule.ruleName,
        path: '',
        value: value,
      });
    }
    return true;
  }
}

