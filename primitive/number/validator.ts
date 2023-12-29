import RegexMatchingRule from "./rules/regex.rule";
import { INumberRule } from "./rules/rule.interface";
import { IValidator, NonNullable } from "../../common/validator.interface";
import { Result } from "../../common/result.interface";
import { ValidationErrorContext } from "../../common/errors/error.ctx";
import { ValidationError } from "../../common/errors/validation.error";
import {
  IntegerRule,
  MaxRule,
  MinRule,
  NegativeRule,
  PositiveRule,
  RangeRule,
  DecimalRule,
} from "./rules";
import CustomRule from "./rules/custom.rule";
import { ValidatorTemplate } from "../../common/validator.template";

class NumberValidator implements IValidator<number> {
  private rules: INumberRule[] = []; // string validation strategies

  constructor(rules?: INumberRule[]) {
    if (Array.isArray(rules)) {
      this.rules = rules;
    }
  }

  _typeCheck(value: any): value is NonNullable<any> {
    if (value instanceof Number) value = value.valueOf();
    return typeof value === "number";
  }

  check(value: number, options = { stopOnFailure: true }) {
    const ok = (value: number): Result<number> => ({ ok: true, value: value });
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

  addRule(rule: INumberRule) {
    this.rules.push(rule);
  }
}

class NumberValidatorBuilder extends ValidatorTemplate<number> {
  private validator: NumberValidator;
  [key: string]: any;

  constructor() {
    super();
    this.validator = new NumberValidator();
  }

  _typeCheck(value: any): value is NonNullable<any> {
    return this.validator._typeCheck(value);
  }

  reset() {
    this.validator = new NumberValidator();
    return this;
  }

  integer(errMsg?: string) {
    this.validator.addRule(new IntegerRule(errMsg));
    return this;
  }

  min(min: number, errMsg?: string) {
    this.validator.addRule(new MinRule(min, errMsg));
    return this;
  }

  max(max: number, errMsg?: string) {
    this.validator.addRule(new MaxRule(max, errMsg));
    return this;
  }

  negative(errMsg?: string) {
    this.validator.addRule(new NegativeRule(errMsg));
    return this;
  }

  positive(errMsg?: string) {
    this.validator.addRule(new PositiveRule(errMsg));
    return this;
  }

  matches(regex: RegExp, errMsg?: string) {
    this.validator.addRule(new RegexMatchingRule(regex, errMsg));
    return this;
  }

  test(
    callback: (
      value: number,
      errCtx?: ValidationErrorContext
    ) => boolean | ValidationError
  ) {
    this.validator.addRule(new CustomRule(callback));
    return this;
  }

  check(value: number, options = { stopOnFailure: true }) {
    return this.validator.check(value, options);
  }

  range(min: number, max: number, errMsg?: string) {
    this.validator.addRule(new RangeRule(min, max, errMsg));
    return this;
  }

  addMethod(
    name: string,
    callback: (
      value: number,
      errCtx?: ValidationErrorContext
    ) => boolean | ValidationError
  ) {
    this[name] = () => {
      this.validator.addRule(new CustomRule(callback));
      return this;
    };
    return this;
  }

  decimal(errMsg?: string) {
    this.validator.addRule(new DecimalRule(errMsg));
    return this;
  }
}

export default () => new NumberValidatorBuilder();
