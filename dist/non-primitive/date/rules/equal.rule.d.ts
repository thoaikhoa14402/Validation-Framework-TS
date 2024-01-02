import { ValidationError } from "../../../common/errors/validation.error";
import { IValidatorRule } from "../../../common/validator/validator.rule.interface";
export default class EqualRule implements IValidatorRule {
    static ruleName: string;
    errorMessage: string;
    private threshold;
    constructor(threshold: string, errorMsg?: string);
    validate(value: string): boolean | ValidationError;
}
