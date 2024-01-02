import { ValidationError } from "../../../common/errors/validation.error";
import { IValidatorRule } from "../../../common/validator/validator.rule.interface";
export default class MixedRule implements IValidatorRule {
    private callback;
    static ruleName: string;
    errorMessage: string;
    constructor(callback: (value: any) => boolean | ValidationError, errorMsg?: string);
    validate(value: any): boolean | ValidationError;
}
