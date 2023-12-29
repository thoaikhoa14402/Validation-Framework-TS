import { ValidationError } from "../../../common/errors/validation.error";
import { IStringRule } from "./rule.interface";
export default class MaxLengthRule implements IStringRule {
    static ruleName: string;
    errorMessage: string;
    private max;
    constructor(max: number, errorMsg?: string);
    validate(value: string): boolean | ValidationError;
}
