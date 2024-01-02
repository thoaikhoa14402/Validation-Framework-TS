"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_ctx_1 = __importDefault(require("../../../common/errors/error.ctx"));
class RegexMatchingRule {
    constructor(regex, errMsg) {
        this.errorMessage = "The string does not match the regex pattern";
        this.regex = regex;
        if (errMsg)
            this.errorMessage = errMsg;
    }
    validate(value, errorMsg) {
        if (!this.regex.test(value)) {
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
RegexMatchingRule.ruleName = "string.rule.regex";
exports.default = RegexMatchingRule;
