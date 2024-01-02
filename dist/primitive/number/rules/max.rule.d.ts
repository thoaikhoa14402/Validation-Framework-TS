import { ValidationError } from "../../../common/errors/validation.error";
import { IValidatorRule } from "../../../common/validator/validator.rule.interface";
export default class MaxRule implements IValidatorRule {
    static ruleName: string;
    errorMessage: string;
    private max;
    constructor(max: number, errorMsg?: string);
    validate(value: number): boolean | ValidationError;
}
