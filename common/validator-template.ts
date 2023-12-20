import { ValidationErrorContext } from "../errors/error.ctx";
import { ValidationError } from "../errors/validation.error";
import { Stack } from "../helpers/stack";
import { Result } from "./result.interface";

export abstract class ValidatorTemplate<T> {
    constructor() {}
    abstract _typeCheck(value: unknown): value is NonNullable<any> 
    abstract check(value: unknown, options?: {stopOnFailure: boolean}, stack?: Stack<keyof T>) : (ValidationError | Result<T>)[] | Result<T>;
    
    validate(value: unknown, options = { stopOnFailure: true }): (ValidationError | Result<T>)[] | Result<T> {
        try {
            // Step 1: Check expected type
            if (!(this._typeCheck(value))) {
                throw Error(`${typeof value} is not an expected type!`);
            }
            // Step 2: Check value is null or undefined
            if (value === null || value === undefined) {
                throw Error('Value must not be null or undefined!');
            }
            // Step 3: Validate the input value
            const result = this.check(value, options);
            if (Array.isArray(result)) {
                result.forEach((value: any, index) => {
                    if (value instanceof ValidationError) {
                        Error.captureStackTrace(result[index], this.validate);
                    }
                });
            }
            return result;
        } catch(error: any) {
            Error.captureStackTrace(error, this.validate);
            throw error;
        }
    }
}