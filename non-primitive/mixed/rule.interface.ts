import { ValidationError } from "../../common/errors/validation.error";

export interface IMixedRule {
  validate(args: any): boolean | ValidationError;
}