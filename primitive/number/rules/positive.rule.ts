import { errorContext } from "../../../common/errors";
import { ValidationError } from "../../../common/errors/validation.error";
import { INumberRule } from "./rule.interface";

export default class PositiveRule implements INumberRule {
  static ruleName = 'number.rule.positive';
  errorMessage: string = 'The number is not a positive number'

  constructor(errorMsg?: string) {
    if (errorMsg) this.errorMessage = errorMsg;
  }

  validate(value: number): boolean | ValidationError {
    if(!(value>0)) {
      return errorContext.createError({
        message: this.errorMessage,
        type: PositiveRule.ruleName,
        path: '',
        value: value,
      });
    }
    return true;
  }
}
