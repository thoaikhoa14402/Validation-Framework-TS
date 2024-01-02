import MixedRule from "./rule";
import { IValidator } from "../common/validator/validator.interface";
import { Result } from "../common/result.interface";
import { ValidationError } from "../common/errors/validation.error";
import { ValidatorTemplate } from "../common/validator/validator.template";
import { ValidationErrorContext } from "../common/errors/error.ctx";
import { IValidatorRule } from "../common/validator/validator.rule.interface";
import { errorContext } from "../common/errors";

class MixedValidator<T extends any> implements IValidator<T> {
  private rules: IValidatorRule[] = []; // string validation strategies

  constructor(rules?: IValidatorRule[]) {
    if (Array.isArray(rules)) {
      this.rules = rules;
    }
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

  addRule(rule: IValidatorRule) {
    this.rules.push(rule);
  }
}

class MixedValidatorBuilder<T extends any> extends ValidatorTemplate<T> {
  private validator: MixedValidator<T>;
  [key: string]: any;
  private typeCheckCb?: (value: unknown) => boolean; // validate the input value by user-defined

  constructor(typeCheckCb?: (value: unknown) => boolean) {
    super();
    this.validator = new MixedValidator();
    this.typeCheckCb = typeCheckCb;
  }

  _typeCheck(value: any): value is NonNullable<any> {
    return this.validator._typeCheck(value);
  }

  reset() {
    this.validator = new MixedValidator();
    return this;
  }

  addMethod(
    name: string,
    callback: (
      value: any,
      errCtx?: ValidationErrorContext
    ) => boolean | ValidationError
  ) {
    this[name] = () => {
      this.validator.addRule(new MixedRule(callback));
      return this;
    }
    return this;
  }

  check(value: unknown, options = { stopOnFailure: true }) {
    if (this.typeCheckCb) {
      if (!this.typeCheckCb(value)) {
        throw errorContext.createError({
          message: 'Type mismatch error.',
          type : 'mixed.input.validation',
          value: value,
        })
      }
    }
    return this.validator.check(value, options);
  }
}

export default (typeCheckCb?: (value: unknown) => boolean) => new MixedValidatorBuilder(typeCheckCb);
