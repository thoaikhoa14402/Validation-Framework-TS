import { errorContext } from "../../../common/errors";
import { ValidationError } from "../../../common/errors/validation.error";
import { IDateRule } from "./rule.interface";

export default class Earlier implements IDateRule {
  static ruleName = 'date.rule.earlier';
  static errorMessage = 'The date is not earlier than the threshold'
  private threshold: string;

  constructor(threshold: string, errorMsg?: string) {
    this.threshold = threshold;
    if (errorMsg) Earlier.errorMessage = errorMsg;
  }

  validate(value: string): boolean | ValidationError {
    if(Date.parse(value) >= Date.parse(this.threshold)) {
      return errorContext.createError({
        message: Earlier.errorMessage,
        type: Earlier.ruleName,
        path: '',
        value: value,
      });
    }
    return true;
  }
}
