"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validation_error_1 = require("../common/errors/validation.error");
const validator_template_1 = require("../common/validator.template");
const rule_1 = __importDefault(require("./rule"));
class MixedValidator {
    constructor() {
        this.rules = []; // string validation strategies
        this.results = [];
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
    constructor() {
        super();
        this.validator = new MixedValidator();
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
        return this.validator.check(value, options);
    }
}
exports.default = () => new MixedValidatorBuilder();
