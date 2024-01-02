import { NonNullable } from "../../common/validator/validator.interface";
import { Result } from "../../common/result.interface";
import { ValidationErrorContext } from "../../common/errors/error.ctx";
import { ValidationError } from "../../common/errors/validation.error";
import { ValidatorTemplate } from "../../common/validator/validator.template";
import { IValidatorBuilder } from "../../common/validator/validator.builder.interface";
declare class StringValidatorBuilder extends ValidatorTemplate<string> implements IValidatorBuilder<string> {
    private validator;
    [key: string]: any;
    constructor();
    _typeCheck(value: any): value is NonNullable<any>;
    reset(): this;
    notEmpty(errMsg?: string): this;
    minLength(min: number, errMsg?: string): this;
    maxLength(max: number, errMsg?: string): this;
    email(errMsg?: string): this;
    matches(regex: RegExp, errMsg?: string): this;
    test(callback: (value: string, errCtx?: ValidationErrorContext) => boolean | ValidationError): this;
    check(value: string, options?: {
        stopOnFailure: boolean;
    }): ValidationError[] | Result<string>;
    upperCase(errMsg?: string): this;
    specialCharacter(errMsg?: string): this;
    addMethod(name: string, callback: (value: string, errCtx?: ValidationErrorContext) => boolean | ValidationError): this;
}
declare const _default: () => StringValidatorBuilder;
export default _default;
