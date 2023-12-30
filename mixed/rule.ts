import errorCtx from "../common/errors/error.ctx";
import { ValidationErrorContext } from "../common/errors/error.ctx";
import { ValidationError } from "../common/errors/validation.error";
import { IValidatorRule } from "../common/validator/validator.rule.interface";
export default class MixedRule implements IValidatorRule {
  private callback: (
    value: any,
    errCtx?: ValidationErrorContext
  ) => boolean | ValidationError;

  constructor(
    callback: (
      value: any,
      errCtx?: ValidationErrorContext
    ) => boolean | ValidationError
  ) {
    this.callback = callback;
  }

  validate(value: any) {
    return this.callback(value, errorCtx);
  }
}
