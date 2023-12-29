import { NonNullable } from "../../common/validator.interface";
import { Result } from "../../common/result.interface";
import { ValidationErrorContext } from "../../common/errors/error.ctx";
import { ValidationError } from "../../common/errors/validation.error";
import { ValidatorTemplate } from "../../common/validator.template";
import { IValidatorBuilder } from "../../common/validator.builder.interface";
declare class NumberValidatorBuilder extends ValidatorTemplate<number> implements IValidatorBuilder<number> {
    private validator;
    [key: string]: any;
    constructor();
    _typeCheck(value: any): value is NonNullable<any>;
    reset(): this;
    integer(errMsg?: string): this;
    min(min: number, errMsg?: string): this;
    max(max: number, errMsg?: string): this;
    negative(errMsg?: string): this;
    positive(errMsg?: string): this;
    matches(regex: RegExp, errMsg?: string): this;
    test(callback: (value: number, errCtx?: ValidationErrorContext) => boolean | ValidationError): this;
    check(value: number, options?: {
        stopOnFailure: boolean;
    }): ValidationError[] | Result<number>;
    range(min: number, max: number, errMsg?: string): this;
    addMethod(name: string, callback: (value: number, errCtx?: ValidationErrorContext) => boolean | ValidationError): this;
    decimal(errMsg?: string): this;
}
declare const _default: () => NumberValidatorBuilder;
export default _default;
