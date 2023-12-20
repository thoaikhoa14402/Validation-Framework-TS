import { errorContext } from "../../../errors";
import { ValidationError } from "../../../errors/validation.error";
import { INumberRule } from "./rule.interface";

export default class PositiveRule implements INumberRule {
  static ruleName = 'number.rule.positive';
  static errorMessage = 'The number is not a positive number'

  constructor(errorMsg?: string) {
    if (errorMsg) PositiveRule.errorMessage = errorMsg;
  }

  validate(value: number): boolean | ValidationError {
    if(!(value>0)) {
      return errorContext.createError({
        message: PositiveRule.errorMessage,
        type: PositiveRule.ruleName,
        path: '',
        value: value,
      });
    }
    return true;
  }
}
