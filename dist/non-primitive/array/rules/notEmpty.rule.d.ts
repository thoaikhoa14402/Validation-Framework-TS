import { IArrayRule } from "./rule.interface";
import { ValidationError } from "../../../common/errors/validation.error";
export default class NotEmptyRule implements IArrayRule {
    static ruleName: string;
    errorMessage: string;
    constructor(errorMsg?: string);
    validate(value: unknown): boolean | ValidationError;
}
