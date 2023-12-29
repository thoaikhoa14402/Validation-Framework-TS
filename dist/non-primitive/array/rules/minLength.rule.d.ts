import { IArrayRule } from "./rule.interface";
import { ValidationError } from "../../../common/errors/validation.error";
export default class MinLengthRule implements IArrayRule {
    static ruleName: string;
    errorMessage: string;
    private min;
    constructor(min: number, errorMsg?: string);
    validate(value: unknown): boolean | ValidationError;
}
