import { IStringRule } from "./rule.interface";
import { ValidationError } from "../../../common/errors/validation.error";
export default class EmailRule implements IStringRule {
    static ruleName: string;
    errorMessage: string;
    constructor(errorMsg?: string);
    validate(value: string): boolean | ValidationError;
}
