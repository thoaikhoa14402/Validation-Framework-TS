"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_ctx_1 = __importDefault(require("../../../common/errors/error.ctx"));
// used for an arbitrary regex to match the value 
class RegexMatchingRule {
    constructor(regex, errMsg) {
        this.errorMessage = "The number does not match the regex pattern";
        this.regex = regex;
        if (errMsg)
            this.errorMessage = errMsg;
    }
    validate(value, errorMsg) {
        if (!this.regex.test(value.toString())) {
            return error_ctx_1.default.createError({
                message: errorMsg !== null && errorMsg !== void 0 ? errorMsg : this.errorMessage,
                type: RegexMatchingRule.ruleName,
                path: '',
                value: value,
            });
        }
        return true;
    }
}
RegexMatchingRule.ruleName = "number.rule.regex";
exports.default = RegexMatchingRule;
