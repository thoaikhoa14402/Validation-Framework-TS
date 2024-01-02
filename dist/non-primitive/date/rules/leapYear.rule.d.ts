import { ValidationError } from "../../../common/errors/validation.error";
import { IValidatorRule } from "../../../common/validator/validator.rule.interface";
export default class LeapYearRule implements IValidatorRule {
    static ruleName: string;
    errorMessage: string;
    constructor(errorMsg?: string);
    private isLeapYear;
    validate(value: string): boolean | ValidationError;
}
