import { ValidationError } from "../../../common/errors/validation.error";
import { errorContext } from "../../../common/errors";
import { IValidatorRule } from "../../../common/validator/validator.rule.interface";
export default class MixedRule implements IValidatorRule {
  private callback: (value: any) => boolean | ValidationError;
  static ruleName = "string.rule.mixed";
  errorMessage: string = "The validation is error";

  constructor(callback: (value: any) => boolean | ValidationError, errorMsg?: string) {
    this.callback = callback;
    if(errorMsg) this.errorMessage = errorMsg
  }

  validate(value: any) {
    if (!this.callback(value)) {
      return errorContext.createError({
        message: this.errorMessage,
        type: MixedRule.ruleName,
        path: '',
        value: value,
      });
    }
    return this.callback(value);
  }
}
