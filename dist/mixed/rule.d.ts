import { ValidationErrorContext } from "../common/errors/error.ctx";
import { ValidationError } from "../common/errors/validation.error";
import { IValidatorRule } from "../common/validator/validator.rule.interface";
export default class MixedRule implements IValidatorRule {
    private callback;
    constructor(callback: (value: any, errCtx?: ValidationErrorContext) => boolean | ValidationError);
    validate(value: any): boolean | ValidationError;
}
