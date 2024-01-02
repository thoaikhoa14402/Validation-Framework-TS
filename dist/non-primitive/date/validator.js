"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const valid_rule_1 = __importDefault(require("./rules/valid.rule"));
const equal_rule_1 = __importDefault(require("./rules/equal.rule"));
const later_rule_1 = __importDefault(require("./rules/later.rule"));
const earlier_rule_1 = __importDefault(require("./rules/earlier.rule"));
const custom_rule_1 = __importDefault(require("./rules/custom.rule"));
const validation_error_1 = require("../../common/errors/validation.error");
const validator_template_1 = require("../../common/validator/validator.template");
const rules_1 = require("./rules");
class DateValidator {
    constructor(rules) {
        this.rules = []; // string validation strategies
        if (Array.isArray(rules)) {
            this.rules = rules;
        }
    }
    _typeCheck(value) {
        if (value instanceof String)
            value = value.valueOf();
        return typeof value === "string";
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
class DateValidatorBuilder extends validator_template_1.ValidatorTemplate {
    constructor() {
        super();
        this.validator = new DateValidator();
    }
    _typeCheck(value) {
        return this.validator._typeCheck(value);
    }
    reset() {
        this.validator = new DateValidator();
        return this;
    }
    isValid(errMsg) {
        this.validator.addRule(new valid_rule_1.default(errMsg));
        return this;
    }
    equal(threshold, errMsg) {
        this.validator.addRule(new equal_rule_1.default(threshold, errMsg));
        return this;
    }
    later(threshold, errMsg) {
        this.validator.addRule(new later_rule_1.default(threshold, errMsg));
        return this;
    }
    earlier(threshold, errMsg) {
        this.validator.addRule(new earlier_rule_1.default(threshold, errMsg));
        return this;
    }
    check(value, options = { stopOnFailure: true }) {
        return this.validator.check(value, options);
    }
    leapYear(errMsg) {
        this.validator.addRule(new rules_1.LeapYearRule(errMsg));
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
exports.default = () => new DateValidatorBuilder();
