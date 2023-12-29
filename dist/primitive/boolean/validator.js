"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validation_error_1 = require("../../common/errors/validation.error");
const validator_template_1 = require("../../common/validator.template");
const truthy_rule_1 = __importDefault(require("./rules/truthy.rule"));
const falsy_rule_1 = __importDefault(require("./rules/falsy.rule"));
const custom_rule_1 = __importDefault(require("./rules/custom.rule"));
class BooleanValidator {
    constructor(rules) {
        this.rules = [];
        if (Array.isArray(rules)) {
            this.rules = rules;
        }
    }
    _typeCheck(value) {
        if (value instanceof String)
            value = value.valueOf();
        // return typeof value === 'boolean' || value === undefined || value === null || typeof TruthyFalsyChecker.check(value) === "boolean";
        return typeof value === "boolean";
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
class BooleanValidatorBuilder extends validator_template_1.ValidatorTemplate {
    constructor() {
        super();
        this.validator = new BooleanValidator();
    }
    _typeCheck(value) {
        return this.validator._typeCheck(value);
    }
    reset() {
        this.validator = new BooleanValidator();
        return this;
    }
    check(value, options = { stopOnFailure: true }) {
        return this.validator.check(value, options);
    }
    addRule(rule) {
        this.validator.addRule(rule);
        return this;
    }
    truthy(errMsg) {
        this.validator.addRule(new truthy_rule_1.default(errMsg));
        return this;
    }
    falsy(errMsg) {
        this.validator.addRule(new falsy_rule_1.default(errMsg));
        return this;
    }
    addMethod(name, callback) {
        this[name] = () => {
            this.validator.addRule(new custom_rule_1.default(callback));
            return this;
        };
        return this;
    }
}
exports.default = () => new BooleanValidatorBuilder();
