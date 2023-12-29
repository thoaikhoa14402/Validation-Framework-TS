import { ValidationError } from "../errors/validation.error";
import { ValidationErrors } from "../errors/validation.error";
import { Stack } from "../../helpers/stack";
import { Result } from "../result.interface";

export abstract class ValidatorTemplate<T> {
  constructor() {}
  abstract _typeCheck(value: unknown): value is NonNullable<any>;
  abstract check(
    value: unknown,
    options?: { stopOnFailure: boolean },
    stack?: Stack<keyof T>
  ): (ValidationError | Result<T>)[] | Result<T>;

  validate(
    value: unknown,
    options = { stopOnFailure: true }
  ): Result<T> | Result<T>[] {
    try {
      // Step 1: Check expected type
      if (!this._typeCheck(value)) {
        throw Error(`${typeof value} is not an expected type!`);
      }
      // Step 2: Check value is null or undefined
      if (value === null || value === undefined) {
        throw Error("Value must not be null or undefined!");
      }
      // Step 3: Validate the input value
      const result = this.check(value, options) as
        | Result<T>
        | (Result<T> | ValidationError)[];

      // Step 4: Return result
      // If result is an array of validation errors or success messages
      if (Array.isArray(result)) {
        // Filter array of validation error to capture stack trace for every single validation error
        result.forEach((value: any, index) => {
          if (value instanceof ValidationError) {
            Error.captureStackTrace(result[index], this.validate);
          }
        });

        // Filter array of validation error
        const errors = result.filter((el: ValidationError | Result<T>) => {
          return el instanceof ValidationError;
        }) as ValidationError[];

        // Push validation error to the global error object
        const globalError = new ValidationErrors();
        errors.forEach((el: ValidationError) => {
          globalError.pushError(el);
        });

        // Throw if errors are exist
        if (errors.length) throw globalError;

        // If errors does not exist, return array of success messages
        return result as Result<T>[];
      }

      return result; // Return a success message
    } catch (err: any) {
      const globalError = new ValidationErrors();
      Error.captureStackTrace(globalError, this.validate);
      // if err is instance of ValidationErrors
      if (err instanceof ValidationErrors) {
        err.getValidationErrors().forEach((el: ValidationError) => {
          globalError.pushError(el);
        });
      }
      // if just one error (instance of ValidationError class) by setting stopOnFailure = true
      else {
        Error.captureStackTrace(err, this.validate);
        globalError.pushError(err);
      }
      throw globalError;
    }
  }
}
