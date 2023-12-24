import { ValidationError } from "../../../common/errors/validation.error";

export interface IBooleanRule {
  validate(value: boolean, errorMsg?: string): boolean | ValidationError;
}
