import { ValidationErrorContext } from "../../../common/errors/error.ctx";
import { ValidationError } from "../../../common/errors/validation.error";
import { IValidatorRule } from "../../../common/validator/validator.rule.interface";
export default class CustomRule implements IValidatorRule {
    private callback;
    constructor(callback: (value: boolean, errCtx?: ValidationErrorContext) => boolean | ValidationError);
    validate(value: boolean): boolean | ValidationError;
}
