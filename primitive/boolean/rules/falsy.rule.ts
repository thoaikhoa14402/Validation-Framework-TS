import { errorContext } from "../../../common/errors";
import { ValidationError } from "../../../common/errors/validation.error";
import { IValidatorRule } from "../../../common/validator/validator.rule.interface";
export default class FalsyRule implements IValidatorRule {
    static ruleName = 'boolean.rule.falsy';
    errorMessage: string = 'The value is not falsy';
  
    constructor(errorMsg?: string) {
      if (errorMsg) this.errorMessage = errorMsg;
    }
  
    validate(value: boolean): boolean | ValidationError {
      if (value) {
        return errorContext.createError({
          message: this.errorMessage,
          type: FalsyRule.ruleName,
          path: '',
          value: value,
        });
      }
      return true;
    }
  }