import { NonNullable } from "../../common/validator/validator.interface";
import { Result } from "../../common/result.interface";
import { ValidationErrorContext } from "../../common/errors/error.ctx";
import { ValidationError } from "../../common/errors/validation.error";
import { ValidatorTemplate } from "../../common/validator/validator.template";
declare class DateValidatorBuilder extends ValidatorTemplate<string> {
    private validator;
    [key: string]: any;
    constructor();
    _typeCheck(value: any): value is NonNullable<any>;
    reset(): this;
    isValid(errMsg?: string): this;
    equal(threshold: string, errMsg?: string): this;
    later(threshold: string, errMsg?: string): this;
    earlier(threshold: string, errMsg?: string): this;
    check(value: string, options?: {
        stopOnFailure: boolean;
    }): ValidationError[] | Result<string>;
    leapYear(errMsg?: string): this;
    addMethod(name: string, callback: (value: string, errCtx?: ValidationErrorContext) => boolean | ValidationError): this;
}
declare const _default: () => DateValidatorBuilder;
export default _default;
