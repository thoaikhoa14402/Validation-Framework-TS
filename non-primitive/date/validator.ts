import IsValidRule from "./rules/valid.rule";
import EqualRule from "./rules/equal.rule";
import LaterRule from "./rules/later.rule";
import EarlierRule from "./rules/earlier.rule";
import CustomRule from "./rules/custom.rule";
import { IValidator, NonNullable } from "../../common/validator/validator.interface";
import { Result } from "../../common/result.interface";
import { ValidationErrorContext } from "../../common/errors/error.ctx";
import { ValidationError } from "../../common/errors/validation.error";
import { ValidatorTemplate } from "../../common/validator/validator.template";
import { LeapYearRule } from "./rules";
import { IValidatorRule } from "../../common/validator/validator.rule.interface";

class DateValidator implements IValidator<string> {
  private rules: IValidatorRule[] = []; // string validation strategies

  constructor(rules?: IValidatorRule[]) {
    if (Array.isArray(rules)) {
      this.rules = rules;
    }
  }

  _typeCheck(value: any): value is NonNullable<any> {
    if (value instanceof String) value = value.valueOf();
    return typeof value === "string";
  }

  check(value: string, options = { stopOnFailure: true }) {
    const ok = (value: string): Result<string> => ({ ok: true, value: value });
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

  addRule(rule: IValidatorRule) {
    this.rules.push(rule);
  }
}

class DateValidatorBuilder extends ValidatorTemplate<string> {
  private validator: DateValidator;
  [key: string]: any;

  constructor() {
    super();
    this.validator = new DateValidator();
  }

  _typeCheck(value: any): value is NonNullable<any> {
    return this.validator._typeCheck(value);
  }

  reset() {
    this.validator = new DateValidator();
    return this;
  }

  isValid(errMsg?: string) {
    this.validator.addRule(new IsValidRule(errMsg));
    return this;
  }

  equal(threshold: string, errMsg?: string) {
    this.validator.addRule(new EqualRule(threshold, errMsg));
    return this;
  }

  later(threshold: string, errMsg?: string) {
    this.validator.addRule(new LaterRule(threshold, errMsg));
    return this;
  }

  earlier(threshold: string, errMsg?: string) {
    this.validator.addRule(new EarlierRule(threshold, errMsg));
    return this;
  }

  check(value: string, options = { stopOnFailure: true }) {
    return this.validator.check(value, options);
  }

  leapYear(errMsg?: string) {
    this.validator.addRule(new LeapYearRule(errMsg));
    return this;
  }

  addMethod(
    name: string,
    callback: (
      value: string,
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

export default () => new DateValidatorBuilder();
