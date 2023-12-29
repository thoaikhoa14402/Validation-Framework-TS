import { ValidationErrorContext } from "../../../common/errors/error.ctx";
import { ValidationError } from "../../../common/errors/validation.error";
import { IDateRule } from "./rule.interface";
import errorCtx from "../../../common/errors/error.ctx";

export default class CustomRule implements IDateRule {
    private callback: (value: string, errCtx?: ValidationErrorContext) => boolean | ValidationError;

    constructor(callback: (value: string, errCtx?: ValidationErrorContext) => boolean | ValidationError) {
        this.callback = callback;
    }

    validate(value: string) {
        return this.callback(value, errorCtx);
    }
}
