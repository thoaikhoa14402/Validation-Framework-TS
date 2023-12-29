import { errorContext } from "../../../common/errors";
import { ValidationError } from "../../../common/errors/validation.error";
import { IStringRule } from "./rule.interface";

export default class SpecialCharacterRule implements IStringRule {
  static ruleName = 'string.rule.specialCharacter';
  errorMessage: string = 'The string does not contain special characters';

  constructor(errorMsg?: string) {
    if (errorMsg) this.errorMessage = errorMsg;
  }

  validate(value: string): boolean | ValidationError {
    if (typeof value !== 'string' || !/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
      return errorContext.createError({
        message: this.errorMessage,
        type: SpecialCharacterRule.ruleName,
        path: '',
        value: value,
      });
    }
    return true;
  }
}
