import { INumberRule } from "./rule.interface";
import errorContext from "../../../errors/error.ctx";
import { ValidationError } from "../../../errors/validation.error";

// used for an arbitrary regex to match the value 
export default class RegexMatchingRule implements INumberRule { 
    private regex: RegExp;
    static ruleName = "number.rule.regex";
    static errorMessage = "The number does not match the regex pattern"

    constructor(regex: RegExp, errMsg?: string) {
        this.regex = regex;
        if (errMsg) RegexMatchingRule.errorMessage = errMsg;
    }

    validate(value: number, errorMsg?: string): boolean | ValidationError {
        if (!this.regex.test(value.toString())) {
          return errorContext.createError({
            message:  errorMsg ?? RegexMatchingRule.errorMessage,
            type: RegexMatchingRule.ruleName,
            path: '',
            value: value,
          });
        }
        return true;
    }
}