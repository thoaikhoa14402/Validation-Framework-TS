import NotEmptyRule from "./rules/notEmpty.rule";
import MinLengthRule from "./rules/minLength.rule";
import MaxLengthRule from "./rules/maxLength.rule";
import EmailRule from "./rules/email.rule";
import RegexMatchingRule from "./rules/regex.rule";
import { IStringRule } from "./rules/rule.interface";
import { IValidator, NonNullable } from "../../common/validator.interface";
import { Result } from "../../common/result.interface";
import CustomRule from "./rules/custom.rule";
import { ValidationErrorContext } from "../../common/errors/error.ctx";
import { ValidationError } from "../../common/errors/validation.error";
import { ValidatorTemplate } from "../../common/validator.template";
import UppercaseRule from "./rules/upperCase.rule";
import { SpecialCharacter } from "./rules";

class StringValidator implements IValidator<string> {
    private rules: IStringRule[] = []; // string validation strategies

    constructor(rules?: IStringRule[]) {
        if (Array.isArray(rules)) {
            this.rules = rules;
        }
    }

    _typeCheck(value: any): value is NonNullable<any> {
        if (value instanceof String) value = value.valueOf();
        return typeof value === 'string';
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

    addRule(rule: IStringRule) {
        this.rules.push(rule);
    }
}   

class StringValidatorBuilder extends ValidatorTemplate<string> {
    private validator: StringValidator;

    constructor() {
        super();
        this.validator = new StringValidator();
    }

    _typeCheck(value: any): value is NonNullable<any> {
        return this.validator._typeCheck(value);
    }

    reset() {
        this.validator = new StringValidator();
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

    email(errMsg?: string) {
        this.validator.addRule(new EmailRule(errMsg));
        return this;
    }

    matches(regex: RegExp, errMsg?: string) {
        this.validator.addRule(new RegexMatchingRule(regex, errMsg));
        return this;
    }

    test(callback: (value: string, errCtx?: ValidationErrorContext) => boolean | ValidationError) {
        this.validator.addRule(new CustomRule(callback))
        return this;
    }

    check(value: string, options = { stopOnFailure: true }) {
        return this.validator.check(value, options);
    }

    upperCase(errMsg?: string) {
        this.validator.addRule(new UppercaseRule(errMsg));
        return this;
    }

    specialCharacter(errMsg?: string) {
        this.validator.addRule(new SpecialCharacter(errMsg));
        return this;
    }
    
}

export default () => new StringValidatorBuilder();