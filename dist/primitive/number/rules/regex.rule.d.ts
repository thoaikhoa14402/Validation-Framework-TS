import { INumberRule } from "./rule.interface";
import { ValidationError } from "../../../common/errors/validation.error";
export default class RegexMatchingRule implements INumberRule {
    private regex;
    static ruleName: string;
    errorMessage: string;
    constructor(regex: RegExp, errMsg?: string);
    validate(value: number, errorMsg?: string): boolean | ValidationError;
}
