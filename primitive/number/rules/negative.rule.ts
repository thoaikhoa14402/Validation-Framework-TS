import { errorContext } from "../../../errors";
import { ValidationError } from "../../../errors/validation.error";
import { INumberRule } from "./rule.interface";

export default class NegativeRule implements INumberRule {
  static ruleName = 'number.rule.negative';
  static errorMessage = 'The number is not a negative number'

  constructor(errorMsg?: string) {
    if (errorMsg) NegativeRule.errorMessage = errorMsg;
  }

  validate(value: number): boolean | ValidationError {
    if(!(value<0)) {
      return errorContext.createError({
        message: NegativeRule.errorMessage,
        type: NegativeRule.ruleName,
        path: '',
        value: value,
      });
    }
    return true;
  }
}
