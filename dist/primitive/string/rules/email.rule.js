"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_ctx_1 = __importDefault(require("../../../common/errors/error.ctx"));
const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
class EmailRule {
    constructor(errorMsg) {
        this.errorMessage = "The string is not an email";
        if (errorMsg)
            this.errorMessage = errorMsg;
    }
    validate(value) {
        if (!regex.test(value)) {
            return error_ctx_1.default.createError({
                message: this.errorMessage,
                type: EmailRule.ruleName,
                path: '',
                value: value,
            });
        }
        return true;
    }
}
EmailRule.ruleName = "string.rule.email";
exports.default = EmailRule;
