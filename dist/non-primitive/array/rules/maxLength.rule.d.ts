import { IArrayRule } from "./rule.interface";
import { ValidationError } from "../../../common/errors/validation.error";
export default class MaxLengthRule implements IArrayRule {
    static ruleName: string;
    errorMessage: string;
    private max;
    constructor(max: number, errorMsg?: string);
    validate(value: unknown): boolean | ValidationError;
}
