import { ValidationError } from "./errors/validation.error";
import { Stack } from "../helpers/stack";
import { PrimitiveType } from "../types";
import { Result } from "./result.interface";

export type NonNullable<T> = T extends null | undefined ? never : T;

export interface IValidator<T> {
    check(value: PrimitiveType, options?: { stopOnFailure: boolean },
    stack?: Stack<keyof T>, // only for non-primitive types
    ): (ValidationError | Result<T>)[] | Result<T>;

    _typeCheck(value: any): value is NonNullable<T>;
}
