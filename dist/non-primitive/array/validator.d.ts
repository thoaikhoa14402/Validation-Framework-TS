import { IValidator } from "../../common/validator.interface";
import { Result } from "../../common/result.interface";
import { ValidationError } from "../../common/errors/validation.error";
import { ValidatorTemplate } from "../../common/validator.template";
declare class ArrayValidatorBuilder<T extends any[]> extends ValidatorTemplate<T> {
    private validator;
    constructor();
    _typeCheck(value: any): value is NonNullable<any>;
    reset(): this;
    notEmpty(errMsg?: string): this;
    minLength(min: number, errMsg?: string): this;
    maxLength(max: number, errMsg?: string): this;
    length(value: number, errMsg?: string): this;
    of(value: IValidator<any>): this;
    check(value: unknown, options?: {
        stopOnFailure: boolean;
    }): Result<T> | (ValidationError | Result<T>)[];
}
declare const _default: () => ArrayValidatorBuilder<any[]>;
export default _default;
