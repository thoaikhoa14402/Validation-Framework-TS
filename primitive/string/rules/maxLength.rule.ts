import { errorContext } from "../../../common/errors";
import { ValidationError } from "../../../common/errors/validation.error";
import { IStringRule } from "./rule.interface";

export default class MaxLengthRule implements IStringRule {
  static ruleName = 'string.rule.max';
  errorMessage: string = 'The length of string is longer than maximum'
  private max: number;

  constructor(max: number, errorMsg?: string) {
    this.max = max;
    if (errorMsg) this.errorMessage = errorMsg;
  }

  validate(value: string): boolean | ValidationError {
    if(!(value.length <= this.max)) {
      return errorContext.createError({
        message: this.errorMessage,
        type: MaxLengthRule.ruleName,
        path: '',
        value: value,
      });
    }
    return true;
  }

}
