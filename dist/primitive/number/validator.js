"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const regex_rule_1 = __importDefault(require("./rules/regex.rule"));
const validation_error_1 = require("../../common/errors/validation.error");
const rules_1 = require("./rules");
const custom_rule_1 = __importDefault(require("./rules/custom.rule"));
const validator_template_1 = require("../../common/validator.template");
class NumberValidator {
    constructor(rules) {
        this.rules = []; // string validation strategies
        if (Array.isArray(rules)) {
            this.rules = rules;
        }
    }
    _typeCheck(value) {
        if (value instanceof Number)
            value = value.valueOf();
        return typeof value === "number";
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
class NumberValidatorBuilder extends validator_template_1.ValidatorTemplate {
    constructor() {
        super();
        this.validator = new NumberValidator();
    }
    _typeCheck(value) {
        return this.validator._typeCheck(value);
    }
    reset() {
        this.validator = new NumberValidator();
        return this;
    }
    integer(errMsg) {
        this.validator.addRule(new rules_1.IntegerRule(errMsg));
        return this;
    }
    min(min, errMsg) {
        this.validator.addRule(new rules_1.MinRule(min, errMsg));
        return this;
    }
    max(max, errMsg) {
        this.validator.addRule(new rules_1.MaxRule(max, errMsg));
        return this;
    }
    negative(errMsg) {
        this.validator.addRule(new rules_1.NegativeRule(errMsg));
        return this;
    }
    positive(errMsg) {
        this.validator.addRule(new rules_1.PositiveRule(errMsg));
        return this;
    }
    matches(regex, errMsg) {
        this.validator.addRule(new regex_rule_1.default(regex, errMsg));
        return this;
    }
    test(callback) {
        this.validator.addRule(new custom_rule_1.default(callback));
        return this;
    }
    check(value, options = { stopOnFailure: true }) {
        return this.validator.check(value, options);
    }
    range(min, max, errMsg) {
        this.validator.addRule(new rules_1.RangeRule(min, max, errMsg));
        return this;
    }
    addMethod(name, callback) {
        this[name] = () => {
            this.validator.addRule(new custom_rule_1.default(callback));
            return this;
        };
        return this;
    }
    decimal(errMsg) {
        this.validator.addRule(new rules_1.DecimalRule(errMsg));
        return this;
    }
}
exports.default = () => new NumberValidatorBuilder();
