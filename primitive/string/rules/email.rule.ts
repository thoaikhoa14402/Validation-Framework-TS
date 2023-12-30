import errorContext from "../../../common/errors/error.ctx";
import { ValidationError } from "../../../common/errors/validation.error";
import { IValidatorRule } from "../../../common/validator/validator.rule.interface";

const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
export default class EmailRule implements IValidatorRule {
  static ruleName = "string.rule.email";
  errorMessage: string = "The string is not an email"

  constructor(errorMsg?: string) {
    if (errorMsg) this.errorMessage = errorMsg;
  }

  validate(value: string): boolean | ValidationError {
    if (!regex.test(value)) {
      return errorContext.createError({
        message: this.errorMessage,
        type: EmailRule.ruleName,
        path: '',
        value: value,
      });
    }
    return true;
  }
}
