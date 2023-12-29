import { ValidationError } from "../../../common/errors/validation.error";
import { IDateRule } from "./rule.interface";
export default class LeapYearRule implements IDateRule {
    static ruleName: string;
    errorMessage: string;
    constructor(errorMsg?: string);
    private isLeapYear;
    validate(value: string): boolean | ValidationError;
}
