import { ValidationError } from "../../../common/errors/validation.error";
import { IValidatorRule } from "../../../common/validator/validator.rule.interface";
export default class MinRule implements IValidatorRule {
    static ruleName: string;
    errorMessage: string;
    private min;
    constructor(min: number, errorMsg?: string);
    validate(value: number): boolean | ValidationError;
}
