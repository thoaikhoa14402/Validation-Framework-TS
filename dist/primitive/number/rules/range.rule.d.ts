import { ValidationError } from "../../../common/errors/validation.error";
import { IValidatorRule } from "../../../common/validator/validator.rule.interface";
export default class RangeRule implements IValidatorRule {
    static ruleName: string;
    errorMessage: string;
    private min;
    private max;
    constructor(min: number, max: number, errorMsg?: string);
    validate(value: number): boolean | ValidationError;
}
