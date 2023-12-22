import { errorContext } from "../../../common/errors";
import { ValidationError } from "../../../common/errors/validation.error";
import { IBooleanRule } from "./rule.interface";

export class TruthyRule implements IBooleanRule {
  static ruleName = 'boolean.rule.truthy';
  static errorMessage = 'The value is not truthy';

  constructor(errorMsg?: string) {
    if (errorMsg) TruthyRule.errorMessage = errorMsg;
  }

  validate(value: boolean): boolean | ValidationError {
    if (!value) {
      return errorContext.createError({
        message: TruthyRule.errorMessage,
        type: TruthyRule.ruleName,
        path: '',
        value: value,
      });
    }
    return true;
  }
}
