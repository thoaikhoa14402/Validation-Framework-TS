import { IArrayRule } from "./rule.interface";
import { ValidationError } from "../../../errors/validation.error";
import errorContext from "../../../errors/error.ctx";

export default class NotEmptyRule implements IArrayRule {
  static ruleName = 'array.rule.notEmpty';
  static errorMessage = "The arry is empty"

  constructor(errorMsg?: string) {
    if (errorMsg) NotEmptyRule.errorMessage = errorMsg;
  }
  
  validate(value: unknown): boolean | ValidationError {
    if (Array.isArray(value) && value.length == 0  ) {
      return errorContext.createError({
        message: NotEmptyRule.errorMessage,
        type: NotEmptyRule.ruleName,
        path: '',
        value: value,
      });
    }
    return true;
  }
}

