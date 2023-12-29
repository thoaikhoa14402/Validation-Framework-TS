import { INumberRule } from "./rule.interface";
import errorContext from "../../../common/errors/error.ctx";
import { ValidationError } from "../../../common/errors/validation.error";

// used for an arbitrary regex to match the value 
export default class RegexMatchingRule implements INumberRule { 
    private regex: RegExp;
    static ruleName = "number.rule.regex";
    errorMessage: string = "The number does not match the regex pattern"

    constructor(regex: RegExp, errMsg?: string) {
        this.regex = regex;
        if (errMsg) this.errorMessage = errMsg;
    }

    validate(value: number, errorMsg?: string): boolean | ValidationError {
        if (!this.regex.test(value.toString())) {
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