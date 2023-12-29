import { ValidationError } from "../../../common/errors/validation.error";
import { INumberRule } from "./rule.interface";
export default class MaxRule implements INumberRule {
    static ruleName: string;
    errorMessage: string;
    private max;
    constructor(max: number, errorMsg?: string);
    validate(value: number): boolean | ValidationError;
}
