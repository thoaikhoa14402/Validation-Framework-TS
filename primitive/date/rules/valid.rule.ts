import { errorContext } from "../../../common/errors";
import { ValidationError } from "../../../common/errors/validation.error";
import { IDateRule } from "./rule.interface";

export default class IsValid implements IDateRule {
  static ruleName = 'date.rule.valid';
  static errorMessage = 'The date is invalid'

  constructor(errorMsg?: string) {
    if (errorMsg) IsValid.errorMessage = errorMsg;
  }

  validate(value: string): boolean | ValidationError {
    if(isNaN(new Date(value).getTime())) {
      return errorContext.createError({
        message: IsValid.errorMessage,
        type: IsValid.ruleName,
        path: '',
        value: value,
      });
    }
    return true;
  }
}
