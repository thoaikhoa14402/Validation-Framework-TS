import { ValidationErrorContext } from "../../../common/errors/error.ctx";
import { ValidationError } from "../../../common/errors/validation.error";
import errorCtx from "../../../common/errors/error.ctx";
import { errorContext } from "../../../common/errors";
import { INumberRule } from "./rule.interface";

export default class MixedRule implements INumberRule {
  private callback: (value: any) => boolean | ValidationError;
  static ruleName = "number.rule.mixed";
  static errorMessage = "The validation is error";

  constructor(callback: (value: any) => boolean | ValidationError) {
    this.callback = callback;
  }

  validate(value: any) {
    if (!this.callback(value)) {
      return errorContext.createError({
        message: MixedRule.errorMessage,
        type: MixedRule.ruleName,
        path: "",
        value: value,
      });
    }
    return this.callback(value);
  }
}
