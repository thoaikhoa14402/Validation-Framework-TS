import { errorContext } from "../../../common/errors";
import { ValidationError } from "../../../common/errors/validation.error";
import { IBooleanRule } from "./rule.interface";

export default class FalsyRule implements IBooleanRule {
    static ruleName = 'boolean.rule.falsy';
    static errorMessage = 'The value is not falsy';
  
    constructor(errorMsg?: string) {
      if (errorMsg) FalsyRule.errorMessage = errorMsg;
    }
  
    validate(value: boolean): boolean | ValidationError {
      if (value) {
        return errorContext.createError({
          message: FalsyRule.errorMessage,
          type: FalsyRule.ruleName,
          path: '',
          value: value,
        });
      }
      return true;
    }
  }