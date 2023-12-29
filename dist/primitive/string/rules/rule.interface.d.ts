import { ValidationError } from "../../../common/errors/validation.error";
export interface IStringRule {
    validate(value: string, errorMsg?: string): boolean | ValidationError;
}
