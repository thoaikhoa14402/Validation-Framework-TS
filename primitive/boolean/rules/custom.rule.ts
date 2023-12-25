import { ValidationErrorContext } from "../../../common/errors/error.ctx";
import { ValidationError } from "../../../common/errors/validation.error";
import { IBooleanRule } from "./rule.interface";
import errorCtx from "../../../common/errors/error.ctx";

export default class CustomRule implements IBooleanRule {
    private callback: (value: boolean, errCtx?: ValidationErrorContext) => boolean | ValidationError;

    constructor(callback: (value: boolean, errCtx?: ValidationErrorContext) => boolean | ValidationError) {
        this.callback = callback;
    }

    validate(value: boolean) {
        return this.callback(value, errorCtx);
    }
}
