import { ValidationError } from "../../../common/errors/validation.error";

export interface IDateRule {
  validate(value: string, errorMsg?: string): boolean | ValidationError;
}