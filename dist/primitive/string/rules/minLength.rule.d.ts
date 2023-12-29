import { ValidationError } from "../../../common/errors/validation.error";
import { IStringRule } from "./rule.interface";
export default class MinLengthRule implements IStringRule {
    static ruleName: string;
    errorMessage: string;
    private min;
    constructor(min: number, errorMsg?: string);
    validate(value: string): boolean | ValidationError;
}
