import { ValidationError } from "../../../common/errors/validation.error";
import { IStringRule } from "./rule.interface";
export default class MixedRule implements IStringRule {
    private callback;
    static ruleName: string;
    errorMessage: string;
    constructor(callback: (value: any) => boolean | ValidationError, errorMsg?: string);
    validate(value: any): boolean | ValidationError;
}
