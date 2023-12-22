import { ValidationError } from "../../../common/errors/validation.error";
import { IStringRule } from "./rule.interface";
import { errorContext } from "../../../common/errors";

export default class UppercaseRule implements IStringRule {
  static ruleName = 'string.rule.uppercase';
  static errorMessage = 'The value does not contain uppercase characters';

  constructor(errorMsg?: string) {
    if (errorMsg) UppercaseRule.errorMessage = errorMsg;
  }

  validate(value: string): boolean | ValidationError {
    if (typeof value !== 'string' || !/[A-Z]/.test(value)) {
      return errorContext.createError({
        message: UppercaseRule.errorMessage,
        type: UppercaseRule.ruleName,
        path: '',
        value: value,
      });
    }
    return true;
  }
}
