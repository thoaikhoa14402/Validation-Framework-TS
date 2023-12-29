import { ValidationError } from "../../../common/errors/validation.error";
import { INumberRule } from "./rule.interface";
export default class RangeRule implements INumberRule {
    static ruleName: string;
    errorMessage: string;
    private min;
    private max;
    constructor(min: number, max: number, errorMsg?: string);
    validate(value: number): boolean | ValidationError;
}
