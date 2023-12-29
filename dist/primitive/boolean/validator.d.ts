import { ValidationErrorContext } from "../../common/errors/error.ctx";
import { ValidationError } from "../../common/errors/validation.error";
import { IBooleanRule } from "./rules/rule.interface";
import { NonNullable } from "../../common/validator.interface";
import { Result } from "../../common/result.interface";
import { ValidatorTemplate } from "../../common/validator.template";
import { IValidatorBuilder } from "../../common/validator.builder.interface";
declare class BooleanValidatorBuilder extends ValidatorTemplate<boolean> implements IValidatorBuilder<boolean> {
    private validator;
    [key: string]: any;
    constructor();
    _typeCheck(value: any): value is NonNullable<any>;
    reset(): this;
    check(value: boolean, options?: {
        stopOnFailure: boolean;
    }): ValidationError[] | Result<any>;
    addRule(rule: IBooleanRule): this;
    truthy(errMsg?: string): this;
    falsy(errMsg?: string): this;
    addMethod(name: string, callback: (value: boolean, errCtx?: ValidationErrorContext) => boolean | ValidationError): this;
}
declare const _default: () => BooleanValidatorBuilder;
export default _default;
