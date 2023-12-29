import { ValidationError } from "../../../common/errors/validation.error";
import { IDateRule } from "./rule.interface";
export default class IsValid implements IDateRule {
    static ruleName: string;
    errorMessage: string;
    constructor(errorMsg?: string);
    validate(value: string): boolean | ValidationError;
}
