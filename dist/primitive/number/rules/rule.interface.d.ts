import { ValidationError } from "../../../common/errors/validation.error";
export interface INumberRule {
    validate(value: number, errorMsg?: string): boolean | ValidationError;
}
