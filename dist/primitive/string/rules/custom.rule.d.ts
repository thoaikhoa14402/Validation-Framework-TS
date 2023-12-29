import { ValidationErrorContext } from "../../../common/errors/error.ctx";
import { ValidationError } from "../../../common/errors/validation.error";
import { IStringRule } from "./rule.interface";
export default class CustomRule implements IStringRule {
    private callback;
    constructor(callback: (value: string, errCtx?: ValidationErrorContext) => boolean | ValidationError);
    validate(value: string): boolean | ValidationError;
}
