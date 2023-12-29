import { IStringRule } from "./rule.interface";
import { ValidationError } from "../../../common/errors/validation.error";
export default class RegexMatchingRule implements IStringRule {
    private regex;
    static ruleName: string;
    errorMessage: string;
    constructor(regex: RegExp, errMsg?: string);
    validate(value: string, errorMsg?: string): boolean | ValidationError;
}
