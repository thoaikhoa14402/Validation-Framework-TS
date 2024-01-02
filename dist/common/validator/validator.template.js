"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidatorTemplate = void 0;
const validation_error_1 = require("../errors/validation.error");
const validation_error_2 = require("../errors/validation.error");
class ValidatorTemplate {
    constructor() { }
    validate(value, options = { stopOnFailure: true }) {
        try {
            // Step 1: Check expected type
            if (!this._typeCheck(value)) {
                throw Error(`${typeof value} is not an expected type!`);
            }
            // Step 2: Check value is null or undefined
            if (value === null || value === undefined) {
                throw Error("Value must not be null or undefined!");
            }
            // Step 3: Validate the input value
            const result = this.check(value, options);
            // Step 4: Return result
            // If result is an array of validation errors or success messages
            if (Array.isArray(result)) {
                // Filter array of validation error to capture stack trace for every single validation error
                result.forEach((value, index) => {
                    if (value instanceof validation_error_1.ValidationError) {
                        Error.captureStackTrace(result[index], this.validate);
                    }
                });
                // Filter array of validation error
                const errors = result.filter((el) => {
                    return el instanceof validation_error_1.ValidationError;
                });
                // Push validation error to the global error object
                const globalError = new validation_error_2.ValidationErrors();
                errors.forEach((el) => {
                    globalError.pushError(el);
                });
                // Throw if errors are exist
                if (errors.length)
                    throw globalError;
                // If errors does not exist, return array of success messages
                return result;
            }
            return result; // Return a success message
        }
        catch (err) {
            const globalError = new validation_error_2.ValidationErrors();
            Error.captureStackTrace(globalError, this.validate);
            // if err is instance of ValidationErrors
            if (err instanceof validation_error_2.ValidationErrors) {
                err.getValidationErrors().forEach((el) => {
                    globalError.pushError(el);
                });
            }
            // if just one error (instance of ValidationError class) by setting stopOnFailure = true
            else {
                Error.captureStackTrace(err, this.validate);
                globalError.pushError(err);
            }
            throw globalError;
        }
    }
}
exports.ValidatorTemplate = ValidatorTemplate;
