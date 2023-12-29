import { ValidationError } from "../../../common/errors/validation.error";
import { INumberRule } from "./rule.interface";
export default class PositiveRule implements INumberRule {
    static ruleName: string;
    errorMessage: string;
    constructor(errorMsg?: string);
    validate(value: number): boolean | ValidationError;
}
