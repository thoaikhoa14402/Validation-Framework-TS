import { ValidationError } from "../../../errors/validation.error";

export interface IStringRule {
  validate(value: string, errorMsg?: string): boolean | ValidationError;
}