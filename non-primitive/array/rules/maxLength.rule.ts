import { IArrayRule } from "./rule.interface";
import { ValidationError } from "../../../common/errors/validation.error";
import errorContext from "../../../common/errors/error.ctx";

export default class MaxLengthRule implements IArrayRule {
  static ruleName = 'array.rule.max';
 errorMessage: string = "The length of array is longer than maximum"
  private max: number;

  constructor(max: number,errorMsg?: string) {
    if (errorMsg) this.errorMessage = errorMsg;
    this.max = max
  }
  
  validate(value: unknown): boolean | ValidationError {
    if (Array.isArray(value) && value.length > this.max) {
      return errorContext.createError({
        message: this.errorMessage,
        type: MaxLengthRule.ruleName,
        path: '',
        value: value,
      });
    }
    return true;
  }
}

