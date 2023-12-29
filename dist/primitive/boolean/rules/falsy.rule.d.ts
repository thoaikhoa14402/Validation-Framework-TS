import { ValidationError } from "../../../common/errors/validation.error";
import { IBooleanRule } from "./rule.interface";
export default class FalsyRule implements IBooleanRule {
    static ruleName: string;
    errorMessage: string;
    constructor(errorMsg?: string);
    validate(value: boolean): boolean | ValidationError;
}
