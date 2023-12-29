import { ValidationErrorContext } from "../common/errors/error.ctx";
import { ValidationError } from "../common/errors/validation.error";
import { IMixedRule } from "./rule.interface";
export default class MixedRule implements IMixedRule {
    private callback;
    constructor(callback: (value: any, errCtx?: ValidationErrorContext) => boolean | ValidationError);
    validate(value: any): boolean | ValidationError;
}
