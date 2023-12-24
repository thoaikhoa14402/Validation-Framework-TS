import { errorContext } from "../../../common/errors";
import { ValidationError } from "../../../common/errors/validation.error";
import { INumberRule } from "./rule.interface";

export default class DecimalRule implements INumberRule {
  static ruleName = 'number.rule.decimal';
  static errorMessage = 'The value is not a decimal number';

  constructor(errorMsg?: string) {
    if (errorMsg) DecimalRule.errorMessage = errorMsg;
  }

  validate(value: number): boolean | ValidationError {
    if (typeof value !== 'number' || isNaN(value) || Number.isInteger(value)) {
      return errorContext.createError({
        message: DecimalRule.errorMessage,
        type: DecimalRule.ruleName,
        path: '',
        value: value,
      });
    }
    return true;
  }
}
