import { ValidationErrorContext } from "../../../common/errors/error.ctx";
import { ValidationError } from "../../../common/errors/validation.error";
import { INumberRule } from "./rule.interface";
export default class CustomRule implements INumberRule {
    private callback;
    constructor(callback: (value: number, errCtx?: ValidationErrorContext) => boolean | ValidationError);
    validate(value: number): boolean | ValidationError;
}
