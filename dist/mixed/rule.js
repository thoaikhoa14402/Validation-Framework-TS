"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_ctx_1 = __importDefault(require("../common/errors/error.ctx"));
class MixedRule {
    constructor(callback) {
        this.callback = callback;
    }
    validate(value) {
        return this.callback(value, error_ctx_1.default);
    }
}
exports.default = MixedRule;
