import { ValidationErrorContext } from "../../common/errors/error.ctx";
import { ValidationError } from "../../common/errors/validation.error";
import { IBooleanRule } from "./rules/rule.interface";
import { IValidator, NonNullable } from "../../common/validator.interface";
import { Result } from "../../common/result.interface";
import { ValidatorTemplate } from "../../common/validator.template";
import TruthyRule from "./rules/truthy.rule";
import FalsyRule from "./rules/falsy.rule";
import CustomRule from "./rules/custom.rule";

class BooleanValidator implements IValidator<boolean> {
  private rules: IBooleanRule[] = [];
  validator: any;

  constructor(rules?: IBooleanRule[]) {
    if (Array.isArray(rules)) {
      this.rules = rules;
    }
  }

  _typeCheck(value: any): value is NonNullable<any> {
    if (value instanceof String) value = value.valueOf();
    // return typeof value === 'boolean' || value === undefined || value === null || typeof TruthyFalsyChecker.check(value) === "boolean";
    return typeof value === "boolean";
  }

  check(value: any, options = { stopOnFailure: true }) {
    const ok = (value: any): Result<any> => ({ ok: true, value: value });
    const errList: ValidationError[] = [];

    for (let rule of this.rules) {
      const result = rule.validate(value);
      if (result instanceof ValidationError) {
        if (options.stopOnFailure) {
          throw result;
        }
        errList.push(result);
      }
    }

    if (errList.length) return errList;

    return ok(value);
  }

  addRule(rule: IBooleanRule) {
    this.rules.push(rule);
  }
}

class BooleanValidatorBuilder extends ValidatorTemplate<boolean> {
  private validator: BooleanValidator;
  [key: string]: any;

  constructor() {
    super();
    this.validator = new BooleanValidator();
  }

  _typeCheck(value: any): value is NonNullable<any> {
    return this.validator._typeCheck(value);
  }

  reset() {
    this.validator = new BooleanValidator();
    return this;
  }

  check(value: boolean, options = { stopOnFailure: true }) {
    return this.validator.check(value, options);
  }

  addRule(rule: IBooleanRule) {
    this.validator.addRule(rule);
    return this;
  }

  truthy(errMsg?: string) {
    this.validator.addRule(new TruthyRule(errMsg));
    return this;
  }

  falsy(errMsg?: string) {
    this.validator.addRule(new FalsyRule(errMsg));
    return this;
  }

  addMethod(
    name: string,
    callback: (
      value: boolean,
      errCtx?: ValidationErrorContext
    ) => boolean | ValidationError
  ) {
    this[name] = () => {
      this.validator.addRule(new CustomRule(callback));
      return this;
    };
    return this;
  }
}

export default () => new BooleanValidatorBuilder();
