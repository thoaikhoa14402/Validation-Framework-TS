import { ValidationErrorContext } from "../common/errors/error.ctx";
import { ValidationError } from "../common/errors/validation.error";
import errorCtx from "../common/errors/error.ctx";
import { IMixedRule } from "./rule.interface";
import { errorContext } from "../common/errors";

export default class MixedRule implements IMixedRule {
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
