import { IValidator } from "../../primitive/validator.interface";
import { Result } from "../../common/result.interface";
import { ValidationError } from "../../common/errors/validation.error";
import { ValidatorTemplate } from "../../common/validator.template";

class MixedValidator<T extends any> implements IValidator<T> {
  private iValidator?: IValidator<any>;
  private results: (ValidationError | Result<T>)[];

  constructor() {
    this.results = [];
  }

  _typeCheck<T>(value: T): value is NonNullable<T> {
    return value !== null && value !== undefined;
  }

  check(value: unknown, options = { stopOnFailure: true }) {
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

    return this.results.length > 0
      ? this.results
      : ({ ok: true, value: value as T } as Result<T>);
  }

  // addRule(rule: IArrayRule) {
  //   this.rules.push(rule);
  // }
}

class MixedValidatorBuilder<T extends any> extends ValidatorTemplate<T> {
  private validator: MixedValidator<T>;
  [key: string]: any;

  constructor() {
    super();
    this.validator = new MixedValidator();
  }

  _typeCheck(value: any): value is NonNullable<any> {
    return this.validator._typeCheck(value);
  }

  reset() {
    this.validator = new MixedValidator();
    return this;
  }

  addMethod(type: any, name: string, implementation: Function) {
    if (!(name in type.prototype)) {
      type.prototype[name] = implementation;
    } else {
      console.error(`Method ${name} already exists in ${type.name}`);
    }
  }

  check(value: unknown, options = { stopOnFailure: true }) {
    return this.validator.check(value, options);
  }
}

export default () => new MixedValidatorBuilder();
