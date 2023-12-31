import { ValidationError } from "../errors/validation.error";
import { Result } from "../result.interface";

export interface IValidatorBuilder<T> {
    _typeCheck(value: T): value is NonNullable<any>;
    reset(): IValidatorBuilder<T>;
    check(value: T, options: any): Result<any> | ValidationError[];
}