import { ValidationError } from "../../../common/errors/validation.error";

export interface IArrayRule {
  validate(value: unknown, errorMsg?: string): boolean | ValidationError;
}