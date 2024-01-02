import { ValidationError } from "../../../common/errors/validation.error";
import { IValidatorRule } from "../../../common/validator/validator.rule.interface";
export default class LengthRule implements IValidatorRule {
    static ruleName: string;
    errorMessage: string;
    private length;
    constructor(length: number, errorMsg?: string);
    validate(value: unknown): boolean | ValidationError;
}
