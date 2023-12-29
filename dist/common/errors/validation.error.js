"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationErrors = exports.ValidationError = void 0;
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.type = '';
        this.path = '';
    }
    setType(type) {
        this.type = type;
        return this;
    }
    setPath(path) {
        this.path = path;
        return this;
    }
    setValue(value) {
        this.value = value;
        return this;
    }
}
exports.ValidationError = ValidationError;
class ValidationErrors extends Error {
    constructor() {
        super();
        this.errorMessages = [];
        this.validationErrors = [];
    }
    pushError(error) {
        this.validationErrors.push(error);
        this.errorMessages.push(error.message);
        this.message = `${this.validationErrors.length} errors occurred`;
    }
    getErrorMessages() {
        return this.errorMessages;
    }
    getValidationErrors() {
        return this.validationErrors;
    }
}
exports.ValidationErrors = ValidationErrors;
