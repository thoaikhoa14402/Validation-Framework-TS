import { ValidationError } from "../../../common/errors/validation.error";
import { IValidatorRule } from "../../../common/validator/validator.rule.interface";
export default class RegexMatchingRule implements IValidatorRule {
    private regex;
    static ruleName: string;
    errorMessage: string;
    constructor(regex: RegExp, errMsg?: string);
    validate(value: number, errorMsg?: string): boolean | ValidationError;
}
