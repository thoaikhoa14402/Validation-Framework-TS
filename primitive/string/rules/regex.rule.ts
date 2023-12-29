import { IStringRule } from "./rule.interface";
import errorContext from "../../../common/errors/error.ctx";
import { ValidationError } from "../../../common/errors/validation.error";

// used for an arbitrary regex to match the value 
export default class RegexMatchingRule implements IStringRule { 
    private regex: RegExp;
    static ruleName = "string.rule.regex";
    errorMessage: string = "The string does not match the regex pattern"

    constructor(regex: RegExp, errMsg?: string) {
        this.regex = regex;
        if (errMsg) this.errorMessage = errMsg;
    }

    validate(value: string, errorMsg?: string): boolean | ValidationError {
        if (!this.regex.test(value)) {
          return errorContext.createError({
            message:  errorMsg ?? this.errorMessage,
            type: RegexMatchingRule.ruleName,
            path: '',
            value: value,
          });
        }
        return true;
    }
}