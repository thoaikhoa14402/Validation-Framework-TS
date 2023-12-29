import { ValidationError } from "../../../common/errors/validation.error";
import { IDateRule } from "./rule.interface";
export default class MixedRule implements IDateRule {
    private callback;
    static ruleName: string;
    errorMessage: string;
    constructor(callback: (value: any) => boolean | ValidationError, errorMsg?: string);
    validate(value: any): boolean | ValidationError;
}
