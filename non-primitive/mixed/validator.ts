import { IValidator } from "../../common/validator.interface";
import { Result } from "../../common/result.interface";
import { ValidationError } from "../../common/errors/validation.error";
import { ValidatorTemplate } from "../../common/validator.template";
import { IMixedRule } from "./rule.interface";
import MixedRule from "./rule";

class MixedValidator<T extends any> implements IValidator<T> {
  private rules: IMixedRule[] = []; // string validation strategies
  private iValidator?: IValidator<any>;
  private results: (ValidationError | Result<T>)[];

  constructor() {
    this.results = [];
  }

  _typeCheck<T>(value: T): value is NonNullable<T> {
    return value !== null && value !== undefined;
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

  addRule(rule: IMixedRule) {
    this.rules.push(rule);
  }
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

  addMethod(
    type: any,
    name: string,
    implementation: (value: any) => boolean | ValidationError
  ) {
    type[name] = () => {
      this.validator.addRule(new MixedRule(implementation));
      return this;
    };
    console.log(type[name]);
    // } else {
    //   console.error(`Method ${name} already exists in ${type.name}`);
    // }
  }

  check(value: unknown, options = { stopOnFailure: true }) {
    return this.validator.check(value, options);
  }
}

export default () => new MixedValidatorBuilder();
