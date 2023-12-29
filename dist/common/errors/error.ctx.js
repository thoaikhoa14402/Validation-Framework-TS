"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationErrorContext = void 0;
const validation_error_1 = require("./validation.error");
class ValidationErrorContext {
    constructor() { }
    static getInstance() {
        return this.instance ? this.instance : this.instance = new ValidationErrorContext();
    }
    createError(options) {
        return new validation_error_1.ValidationError(options.message || '').setType(options.type || '').setPath(options.path || '').setValue(options.value || '');
    }
}
exports.ValidationErrorContext = ValidationErrorContext;
exports.default = ValidationErrorContext.getInstance();
