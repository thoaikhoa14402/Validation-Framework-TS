import { IStringRule } from "./rule.interface";
import { ValidationError } from "../../../errors/validation.error";
import errorContext from "../../../errors/error.ctx";

export default class NotEmptyRule implements IStringRule {
  static ruleName = 'string.rule.notEmpty';
  static errorMessage = "The string is empty"

  constructor(errorMsg?: string) {
    if (errorMsg) NotEmptyRule.errorMessage = errorMsg;
  }
  
  validate(value: string): boolean | ValidationError {
    if (!(value.trim() !== '')) {
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

