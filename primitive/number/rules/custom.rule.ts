import { ValidationErrorContext } from "../../../common/errors/error.ctx";
import { ValidationError } from "../../../common/errors/validation.error";
import { INumberRule } from "./rule.interface";
import errorCtx from "../../../common/errors/error.ctx";

export default class CustomRule implements INumberRule {
    private callback: (value: number, errCtx?: ValidationErrorContext) => boolean | ValidationError;

    constructor(callback: (value: number, errCtx?: ValidationErrorContext) => boolean | ValidationError) {
        this.callback = callback;
    }

    validate(value: number) {
        return this.callback(value, errorCtx);
    }
}
