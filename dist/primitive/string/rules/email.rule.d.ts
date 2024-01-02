import { ValidationError } from "../../../common/errors/validation.error";
import { IValidatorRule } from "../../../common/validator/validator.rule.interface";
export default class EmailRule implements IValidatorRule {
    static ruleName: string;
    errorMessage: string;
    constructor(errorMsg?: string);
    validate(value: string): boolean | ValidationError;
}
