import { ValidationErrorContext } from "../../common/errors/error.ctx";
import { ValidationError } from "../../common/errors/validation.error";
import errorCtx from "../../common/errors/error.ctx";
import { IMixedRule } from "./rule.interface";
import { errorContext } from "../../common/errors";

export default class MixedRule implements IMixedRule {
    private callback: (value: any) => boolean | ValidationError;
    static ruleName = "mixed.rule.custom";
    static errorMessage = "The validation is error"

    constructor(callback: (value: any) => boolean | ValidationError) {
        this.callback = callback;
    }

    validate(value: any) {
        if(!this.callback(value)){
          return errorContext.createError({
            message: MixedRule.errorMessage,
            type: MixedRule.ruleName,
            path: '',
            value: '',
          });
        }
        return this.callback(value);
    }
}
