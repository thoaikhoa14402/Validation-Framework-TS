import { ValidationError } from "../../../common/errors/validation.error";
import { IStringRule } from "./rule.interface";
export default class UppercaseRule implements IStringRule {
    static ruleName: string;
    errorMessage: string;
    constructor(errorMsg?: string);
    validate(value: string): boolean | ValidationError;
}
