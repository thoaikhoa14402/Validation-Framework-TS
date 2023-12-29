import { IArrayRule } from "./rule.interface";
import { ValidationError } from "../../../common/errors/validation.error";
export default class LengthRule implements IArrayRule {
    static ruleName: string;
    errorMessage: string;
    private length;
    constructor(length: number, errorMsg?: string);
    validate(value: unknown): boolean | ValidationError;
}
