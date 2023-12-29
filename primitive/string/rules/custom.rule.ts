import errorCtx from "../../../common/errors/error.ctx";
import { ValidationErrorContext } from "../../../common/errors/error.ctx";
import { ValidationError } from "../../../common/errors/validation.error";
import { IValidatorRule } from "../../../common/validator/validator.rule.interface";
export default class CustomRule implements IValidatorRule {
    private callback: (value: string, errCtx?: ValidationErrorContext) => boolean | ValidationError;

    constructor(callback: (value: string, errCtx?: ValidationErrorContext) => boolean | ValidationError) {
        this.callback = callback;
    }

    validate(value: string) {
        return this.callback(value, errorCtx);
    }

}
