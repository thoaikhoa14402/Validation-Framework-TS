import { ValidationError } from "../errors/validation.error";
export interface IValidatorRule {
    validate(value: any, errorMsg?: string): boolean | ValidationError;
}
