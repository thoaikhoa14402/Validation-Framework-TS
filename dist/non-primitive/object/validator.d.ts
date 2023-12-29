import { Result } from "../../common/result.interface";
import { IValidator, NonNullable } from "../../common/validator.interface";
import { Stack } from "../../helpers/stack";
import { ValidationError } from "../../common/errors/validation.error";
import { ValidatorTemplate } from "../../common/validator.template";
import { ValidationErrorContext } from "../../common/errors/error.ctx";
type CustomValidatorFn<T> = (value: unknown, errCtx?: ValidationErrorContext) => any;
type PropertyValidator<T> = IValidator<T> | CustomValidatorFn<T>;
/**
 * Takes the <T> type and requires all of its properties to be a PropertyValidator.
 */
type ObjectValidatorSchema<T extends object> = Record<keyof T, PropertyValidator<any>>;
declare class ObjectValidator<T extends object> extends ValidatorTemplate<T> implements IValidator<T> {
    private objectSchema;
    private errorPath?;
    private results;
    constructor(objectSchema?: ObjectValidatorSchema<T>);
    _typeCheck(value: any): value is NonNullable<T>;
    check(value: unknown, options?: {
        stopOnFailure: boolean;
    }, stack?: Stack<keyof T>): Result<T> | (ValidationError | Result<T>)[];
    shape(newObjectSchema: ObjectValidatorSchema<any>): this;
    clone(): ObjectValidator<object>;
}
declare const _default: (objectSchema: ObjectValidatorSchema<any>) => ObjectValidator<any>;
export default _default;
