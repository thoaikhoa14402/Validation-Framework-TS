import { ValidationErrorContext } from "../../../errors/error.ctx";
import { ValidationError } from "../../../errors/validation.error";
import { IStringRule } from "./rule.interface";
import errorCtx from "../../../errors/error.ctx";

export default class CustomRule implements IStringRule {
    private callback: (value: string, errCtx?: ValidationErrorContext) => boolean | ValidationError;

    constructor(callback: (value: string, errCtx?: ValidationErrorContext) => boolean | ValidationError) {
        this.callback = callback;
    }

    validate(value: string) {
        return this.callback(value, errorCtx);
    }

}
