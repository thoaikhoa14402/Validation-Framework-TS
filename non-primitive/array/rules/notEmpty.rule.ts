import { IArrayRule } from "./rule.interface";
import { ValidationError } from "../../../common/errors/validation.error";
import errorContext from "../../../common/errors/error.ctx";

export default class NotEmptyRule implements IArrayRule {
  static ruleName = 'array.rule.notEmpty';
 errorMessage: string = "The arry is empty"

  constructor(errorMsg?: string) {
    if (errorMsg) this.errorMessage = errorMsg;
  }
  
  validate(value: unknown): boolean | ValidationError {
    if (Array.isArray(value) && value.length == 0  ) {
      return errorContext.createError({
        message: this.errorMessage,
        type: NotEmptyRule.ruleName,
        path: '',
        value: value,
      });
    }
    return true;
  }
}

