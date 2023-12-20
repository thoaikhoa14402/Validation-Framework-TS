import { ValidationError } from "../../../errors/validation.error";

export interface IArrayRule {
  validate(value: unknown, errorMsg?: string): boolean | ValidationError;
}