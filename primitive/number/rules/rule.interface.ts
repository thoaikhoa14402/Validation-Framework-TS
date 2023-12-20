import { ValidationError } from "../../../errors/validation.error";

export interface INumberRule {
  validate(value: number, errorMsg?: string): boolean | ValidationError;
}