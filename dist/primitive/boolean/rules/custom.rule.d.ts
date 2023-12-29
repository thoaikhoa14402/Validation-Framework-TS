import { ValidationErrorContext } from "../../../common/errors/error.ctx";
import { ValidationError } from "../../../common/errors/validation.error";
import { IBooleanRule } from "./rule.interface";
export default class CustomRule implements IBooleanRule {
    private callback;
    constructor(callback: (value: boolean, errCtx?: ValidationErrorContext) => boolean | ValidationError);
    validate(value: boolean): boolean | ValidationError;
}
