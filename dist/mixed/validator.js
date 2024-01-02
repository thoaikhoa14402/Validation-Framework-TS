"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rule_1 = __importDefault(require("./rule"));
const validation_error_1 = require("../common/errors/validation.error");
const validator_template_1 = require("../common/validator/validator.template");
const errors_1 = require("../common/errors");
class MixedValidator {
    constructor(rules) {
        this.rules = []; // string validation strategies
        if (Array.isArray(rules)) {
            this.rules = rules;
        }
    }
    _typeCheck(value) {
        return value !== null && value !== undefined;
    }
    check(value, options = { stopOnFailure: true }) {
        const ok = (value) => ({ ok: true, value: value });
        const errList = [];
        for (let rule of this.rules) {
            const result = rule.validate(value);
            if (result instanceof validation_error_1.ValidationError) {
                if (options.stopOnFailure) {
                    throw result;
                }
                errList.push(result);
            }
        }
        if (errList.length)
            return errList;
        return ok(value);
    }
    addRule(rule) {
        this.rules.push(rule);
    }
}
class MixedValidatorBuilder extends validator_template_1.ValidatorTemplate {
    constructor(typeCheckCb) {
        super();
        this.validator = new MixedValidator();
        this.typeCheckCb = typeCheckCb;
    }
    _typeCheck(value) {
        return this.validator._typeCheck(value);
    }
    reset() {
        this.validator = new MixedValidator();
        return this;
    }
    addMethod(name, callback) {
        this[name] = () => {
            this.validator.addRule(new rule_1.default(callback));
            return this;
        };
        return this;
    }
    check(value, options = { stopOnFailure: true }) {
        if (this.typeCheckCb) {
            if (!this.typeCheckCb(value)) {
                throw errors_1.errorContext.createError({
                    message: 'Type mismatch error.',
                    type: 'mixed.input.validation',
                    value: value,
                });
            }
        }
        return this.validator.check(value, options);
    }
}
exports.default = (typeCheckCb) => new MixedValidatorBuilder(typeCheckCb);
