import { ValidationErrorContext } from "../../../common/errors/error.ctx";
import { ValidationError } from "../../../common/errors/validation.error";
import { IDateRule } from "./rule.interface";
export default class CustomRule implements IDateRule {
    private callback;
    constructor(callback: (value: string, errCtx?: ValidationErrorContext) => boolean | ValidationError);
    validate(value: string): boolean | ValidationError;
}
