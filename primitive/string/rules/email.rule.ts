import { IStringRule } from "./rule.interface";
import { ValidationError } from "../../../common/errors/validation.error";
import errorContext from "../../../common/errors/error.ctx";

const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export default class EmailRule implements IStringRule {
  static ruleName = "string.rule.email";
  static errorMessage = "The string is not an email"

  constructor(errorMsg?: string) {
    if (errorMsg) EmailRule.errorMessage = errorMsg;
  }

  validate(value: string): boolean | ValidationError {
    if (!regex.test(value)) {
      return errorContext.createError({
        message: EmailRule.errorMessage,
        type: EmailRule.ruleName,
        path: '',
        value: value,
      });
    }
    return true;
  }
}
