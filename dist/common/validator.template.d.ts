import { ValidationError } from "./errors/validation.error";
import { Stack } from "../helpers/stack";
import { Result } from "./result.interface";
export declare abstract class ValidatorTemplate<T> {
    constructor();
    abstract _typeCheck(value: unknown): value is NonNullable<any>;
    abstract check(value: unknown, options?: {
        stopOnFailure: boolean;
    }, stack?: Stack<keyof T>): (ValidationError | Result<T>)[] | Result<T>;
    validate(value: unknown, options?: {
        stopOnFailure: boolean;
    }): Result<T> | Result<T>[];
}
