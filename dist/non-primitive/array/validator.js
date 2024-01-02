"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const notEmpty_rule_1 = __importDefault(require("./rules/notEmpty.rule"));
const minLength_rule_1 = __importDefault(require("./rules/minLength.rule"));
const maxLength_rule_1 = __importDefault(require("./rules/maxLength.rule"));
const length_rule_1 = __importDefault(require("./rules/length.rule"));
const validation_error_1 = require("../../common/errors/validation.error");
const validator_template_1 = require("../../common/validator/validator.template");
class ArrayValidator {
    constructor(rules) {
        this.rules = []; // string validation strategies
        if (Array.isArray(rules)) {
            this.rules = rules;
        }
        this.results = [];
    }
    _typeCheck(value) {
        if (value instanceof Array)
            value = value.valueOf();
        return Array.isArray(value);
    }
    check(value, options = { stopOnFailure: true }) {
        var _a;
        const err = (msg) => ({
            ok: false,
            message: msg,
        });
        // First check that the value is an object and not other type
        if (value === null || value === undefined) {
            return err("Value cannot be null or undefined!");
        }
        else if (!Array.isArray(value)) {
            return err(`Value must be an array but was ${typeof value}`);
        }
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
        this.results.push(...errList);
        if (this.iValidator) {
            for (let item of value) {
                const _res = (_a = this.iValidator) === null || _a === void 0 ? void 0 : _a.check(item, {
                    stopOnFailure: options.stopOnFailure,
                });
                // Check if resultPerKey is Array of ValidationError instance
                if (Array.isArray(_res) &&
                    _res.every((el) => el instanceof validation_error_1.ValidationError)) {
                    this.results.push(..._res);
                }
                else {
                    this.results.push(_res);
                }
            }
        }
        return this.results.length > 0
            ? this.results
            : { ok: true, value: value };
    }
    addRule(rule) {
        this.rules.push(rule);
    }
    of(iValidator) {
        this.iValidator = iValidator;
    }
}
class ArrayValidatorBuilder extends validator_template_1.ValidatorTemplate {
    constructor() {
        super();
        this.validator = new ArrayValidator();
    }
    _typeCheck(value) {
        return this.validator._typeCheck(value);
    }
    reset() {
        this.validator = new ArrayValidator();
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
    length(value, errMsg) {
        this.validator.addRule(new length_rule_1.default(value, errMsg));
        return this;
    }
    of(value) {
        this.validator.of(value);
        return this;
    }
    check(value, options = { stopOnFailure: true }) {
        return this.validator.check(value, options);
    }
}
exports.default = () => new ArrayValidatorBuilder();
