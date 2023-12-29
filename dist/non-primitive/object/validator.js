"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stack_1 = require("../../helpers/stack");
const validation_error_1 = require("../../common/errors/validation.error");
const validator_template_1 = require("../../common/validator.template");
const errors_1 = require("../../common/errors");
/**
 * Determines whether the value is an IValidator by checking for a .validate function.
 */
function isIValidator(value) {
    // Check if the value has .validate function, if so that's an IValidator
    return typeof value.check === "function";
}
class ObjectValidator extends validator_template_1.ValidatorTemplate {
    constructor(objectSchema) {
        super();
        this.objectSchema = objectSchema !== null && objectSchema !== void 0 ? objectSchema : undefined;
        this.results = [];
    }
    _typeCheck(value) {
        return typeof value === 'object' && !Array.isArray(value);
    }
    check(value, options = { stopOnFailure: true }, stack) {
        var _a, _b, _c;
        const err = msg => ({ ok: false, message: msg });
        if (stack && !stack.isEmpty()) {
            this.errorPath = stack;
        }
        else
            this.errorPath = new stack_1.Stack();
        // Get keys of both expected object, and the value
        const expectedKeys = Object.getOwnPropertyNames(this.objectSchema);
        const actualKeys = Object.getOwnPropertyNames(value);
        // Check if any expected property is missing from the value
        for (let expected of expectedKeys) {
            if (actualKeys.indexOf(expected) === -1) {
                return err(`Value is missing expected property ${expected}.`);
            }
        }
        if (this.objectSchema) {
            // Loop through each validator on the expected object and test the value
            for (let expectedKey of expectedKeys) {
                (_a = this.errorPath) === null || _a === void 0 ? void 0 : _a.push(expectedKey);
                const validator = this.objectSchema[expectedKey];
                const propVal = value[expectedKey];
                // Check if this an IValidator or custom function by user defined
                const resultPerKey = isIValidator(validator) ? validator.check(propVal, options, this.errorPath) : validator(propVal, errors_1.errorContext);
                // If this is a custom validator function by user defined, and stopOnFailure set to true
                if (resultPerKey instanceof validation_error_1.ValidationError && !options.stopOnFailure) {
                    this.results.push(resultPerKey);
                }
                else if (resultPerKey instanceof validation_error_1.ValidationError)
                    throw resultPerKey;
                // Check if resultPerKey is Array of ValidationError instance
                if (Array.isArray(resultPerKey) && resultPerKey.every((el) => el instanceof validation_error_1.ValidationError)) {
                    const currentPath = (_b = this.errorPath) === null || _b === void 0 ? void 0 : _b.join('.');
                    const updatedErrors = resultPerKey.map((el) => {
                        return el.setPath(currentPath);
                    });
                    this.results.push(...updatedErrors);
                }
                else if (!(resultPerKey instanceof validation_error_1.ValidationError)) {
                    this.results.push(resultPerKey);
                }
                (_c = this.errorPath) === null || _c === void 0 ? void 0 : _c.pop();
            }
        }
        return this.results.flat();
    }
    shape(newObjectSchema) {
        if (this.objectSchema) {
            Object.assign(this.objectSchema, newObjectSchema);
        }
        this.results = [];
        return this;
    }
    clone() {
        return new ObjectValidator(Object.assign({}, this.objectSchema));
    }
}
exports.default = (objectSchema) => new ObjectValidator(objectSchema);
