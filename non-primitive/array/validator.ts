import { IValidator } from "../../primitive/validator.interface";
import { IArrayRule } from "./rules/rule.interface";
import { Result } from "../../primitive/result.interface";
import { ValidationError } from "../../errors/validation.error";
import NotEmptyRule from "./rules/notEmpty.rule";
import MinLengthRule from "./rules/minLength.rule";
import MaxLengthRule from "./rules/maxLength.rule";
import LengthRule from "./rules/length.rule";

class ArrayValidator<T extends any[]> implements IValidator<T> {
  private rules: IArrayRule[] = []; // string validation strategies
  private iValidator?: IValidator<any>;
  private results: (ValidationError | Result<T>)[];

  constructor(rules?: IArrayRule[]) {
    if (Array.isArray(rules)) {
      this.rules = rules;
    }
    this.results = [];
  }

  _typeCheck(value: any): value is NonNullable<any> {
    if (value instanceof Array) value = value.valueOf();
    return Array.isArray(value);
  }

  validate(value: unknown, options = { stopOnFailure: true }) {
    const err: (msg: string) => Result<T> = (msg) => ({
      ok: false,
      message: msg,
    });

    // First check that the value is an object and not other type
    if (value === null || value === undefined) {
      return err("Value cannot be null or undefined!");
    } else if (!Array.isArray(value)) {
      return err(`Value must be an array but was ${typeof value}`);
    }

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

    this.results.push(...errList);

    if (this.iValidator) {
      for (let item of value) {
        const _res = this.iValidator?.validate(item, {
          stopOnFailure: options.stopOnFailure,
        });
        // Check if resultPerKey is Array of ValidationError instance
        if (
          Array.isArray(_res) &&
          _res.every((el) => el instanceof ValidationError)
        ) {
          this.results.push(..._res);
        } else {
          this.results.push(_res as Result<T>);
        }
      }
    }

    return this.results.length > 0
      ? this.results
      : ({ ok: true, value: value as T } as Result<T>);
  }

  addRule(rule: IArrayRule) {
    this.rules.push(rule);
  }

  of(iValidator: IValidator<any>) {
    this.iValidator = iValidator;
  }
}

class ArrayValidatorBuilder<T extends any[]> {
  private validator: ArrayValidator<T>;

  constructor() {
    this.validator = new ArrayValidator();
  }

  _typeCheck(value: any): value is NonNullable<any> {
    return this.validator._typeCheck(value);
  }

  reset() {
    this.validator = new ArrayValidator();
    return this;
  }

  notEmpty(errMsg?: string) {
    this.validator.addRule(new NotEmptyRule(errMsg));
    return this;
  }

  minLength(min: number, errMsg?: string) {
    this.validator.addRule(new MinLengthRule(min, errMsg));
    return this;
  }

  maxLength(max: number, errMsg?: string) {
    this.validator.addRule(new MaxLengthRule(max, errMsg));
    return this;
  }

  length(value: number, errMsg?: string) {
    this.validator.addRule(new LengthRule(value, errMsg));
    return this;
  }

  of(value: IValidator<any>) {
    this.validator.of(value);
    return this;
  }

  validate(value: unknown, options = { stopOnFailure: true }) {
    return this.validator.validate(value, options);
  }
}

export default () => new ArrayValidatorBuilder();