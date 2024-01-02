import { Result } from "../common/result.interface";
import { ValidationError } from "../common/errors/validation.error";
import { ValidatorTemplate } from "../common/validator/validator.template";
import { ValidationErrorContext } from "../common/errors/error.ctx";
declare class MixedValidatorBuilder<T extends any> extends ValidatorTemplate<T> {
    private validator;
    [key: string]: any;
    private typeCheckCb?;
    constructor(typeCheckCb?: (value: unknown) => boolean);
    _typeCheck(value: any): value is NonNullable<any>;
    reset(): this;
    addMethod(name: string, callback: (value: any, errCtx?: ValidationErrorContext) => boolean | ValidationError): this;
    check(value: unknown, options?: {
        stopOnFailure: boolean;
    }): ValidationError[] | Result<any>;
}
declare const _default: (typeCheckCb?: ((value: unknown) => boolean) | undefined) => MixedValidatorBuilder<unknown>;
export default _default;
