import { ValidationError } from "../../../common/errors/validation.error";
import { INumberRule } from "./rule.interface";
export default class MinRule implements INumberRule {
    static ruleName: string;
    errorMessage: string;
    private min;
    constructor(min: number, errorMsg?: string);
    validate(value: number): boolean | ValidationError;
}
