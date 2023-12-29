import { ValidationError } from "../../../common/errors/validation.error";
import { IDateRule } from "./rule.interface";
export default class Earlier implements IDateRule {
    static ruleName: string;
    errorMessage: string;
    private threshold;
    constructor(threshold: string, errorMsg?: string);
    validate(value: string): boolean | ValidationError;
}
