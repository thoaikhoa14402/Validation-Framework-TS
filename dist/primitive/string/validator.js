"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const notEmpty_rule_1 = __importDefault(require("./rules/notEmpty.rule"));
const minLength_rule_1 = __importDefault(require("./rules/minLength.rule"));
const maxLength_rule_1 = __importDefault(require("./rules/maxLength.rule"));
const email_rule_1 = __importDefault(require("./rules/email.rule"));
const regex_rule_1 = __importDefault(require("./rules/regex.rule"));
const custom_rule_1 = __importDefault(require("./rules/custom.rule"));
const upperCase_rule_1 = __importDefault(require("./rules/upperCase.rule"));
const validation_error_1 = require("../../common/errors/validation.error");
const validator_template_1 = require("../../common/validator/validator.template");
const rules_1 = require("./rules");
class StringValidator {
    constructor(rules) {
        this.rules = []; // string validation strategies
        if (Array.isArray(rules)) {
            this.rules = rules;
        }
    }
    _typeCheck(value) {
        if (value instanceof String)
            value = value.valueOf();
        return typeof value === 'string';
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
class StringValidatorBuilder extends validator_template_1.ValidatorTemplate {
    constructor() {
        super();
        this.validator = new StringValidator();
    }
    _typeCheck(value) {
        return this.validator._typeCheck(value);
    }
    reset() {
        this.validator = new StringValidator();
        return this;
    }
    notEmpty(errMsg) {
        this.validator.addRule(new notEmpty_rule_1.default(errMsg));
        return this;
    }
    minLength(min, errMsg) {
        this.validator.addRule(new minLength_rule_1.default(min, errMsg));
        return this;
    }
    maxLength(max, errMsg) {
        this.validator.addRule(new maxLength_rule_1.default(max, errMsg));
        return this;
    }
    email(errMsg) {
        this.validator.addRule(new email_rule_1.default(errMsg));
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
    upperCase(errMsg) {
        this.validator.addRule(new upperCase_rule_1.default(errMsg));
        return this;
    }
    specialCharacter(errMsg) {
        this.validator.addRule(new rules_1.SpecialCharacter(errMsg));
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
exports.default = () => new StringValidatorBuilder();
