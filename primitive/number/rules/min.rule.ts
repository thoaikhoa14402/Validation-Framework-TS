import { errorContext } from "../../../common/errors";
import { ValidationError } from "../../../common/errors/validation.error";
import { IValidatorRule } from "../../../common/validator/validator.rule.interface";
export default class MinRule implements IValidatorRule {
  static ruleName = 'number.rule.min';
  errorMessage: string = 'The number is less than minimum'
  private min: number;

  constructor(min: number, errorMsg?: string) {
    this.min = min;
    if (errorMsg) this.errorMessage = errorMsg;
  }

  validate(value: number): boolean | ValidationError {
    if(!(value >= this.min)) {
      return errorContext.createError({
        message: this.errorMessage,
        type: MinRule.ruleName,
        path: '',
        value: value,
      });
    }
    return true;
  }
}
