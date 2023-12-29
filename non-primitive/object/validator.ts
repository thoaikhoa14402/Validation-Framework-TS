import { Result } from "../../common/result.interface";
import { IValidator, NonNullable } from "../../common/validator/validator.interface";
import { Stack } from "../../helpers/stack";
import { ValidationError } from "../../common/errors/validation.error";
import { ValidatorTemplate } from "../../common/validator/validator.template";
import { ValidationErrorContext } from "../../common/errors/error.ctx";
import { errorContext } from "../../common/errors";

type CustomValidatorFn<T> = (value: unknown, errCtx?: ValidationErrorContext) =>  any;

type PropertyValidator<T> = IValidator<T> | CustomValidatorFn<T>;

/**
 * Takes the <T> type and requires all of its properties to be a PropertyValidator.
 */
type ObjectValidatorSchema<T extends object> = Record<keyof T, PropertyValidator<any>>;

/**
 * Determines whether the value is an IValidator by checking for a .validate function.
 */
function isIValidator<T>(value: any): value is IValidator<T> {
    // Check if the value has .validate function, if so that's an IValidator
    return typeof(value as IValidator<T>).check === "function";
}

class ObjectValidator<T extends object> extends ValidatorTemplate<T> implements IValidator<T>  {
    private objectSchema: ObjectValidatorSchema<T> | undefined
    private errorPath?: Stack<keyof T> 
    private results: (ValidationError | Result<T>)[]

    constructor(objectSchema?: ObjectValidatorSchema<T>) {
        super();
        this.objectSchema = objectSchema ?? undefined
        this.results = [];
    }

    _typeCheck(value: any): value is NonNullable<T> {
        return typeof value === 'object' && !Array.isArray(value);
    }

    check(value: unknown, options = {stopOnFailure: true}, stack?: Stack<keyof T>) {
        const err: (msg: string) => Result<T> = msg => ({ok: false, message: msg});

        if (stack && !stack.isEmpty()) {
            this.errorPath = stack
        } else this.errorPath = new Stack<keyof T>();

        // Get keys of both expected object, and the value
        const expectedKeys = Object.getOwnPropertyNames(this.objectSchema);
        const actualKeys = Object.getOwnPropertyNames(value);

        // Check if any expected property is missing from the value
        for (let expected of expectedKeys) {
            if (actualKeys.indexOf(expected) === -1) {
                return err(`Value is missing expected property ${expected}.`);
            }
        }

        if (this.objectSchema) {
            // Loop through each validator on the expected object and test the value
            for (let expectedKey of expectedKeys) {
                this.errorPath?.push(expectedKey as keyof T);
                const validator: PropertyValidator<T> = this.objectSchema[expectedKey as keyof T];
                const propVal = (value as {[key: string]: any})[expectedKey];

                // Check if this an IValidator or custom function by user defined
                const resultPerKey: Result<T> | ValidationError[] | ValidationError = isIValidator(validator) ? validator.check(propVal, options, this.errorPath) : validator(propVal, errorContext);

                // If this is a custom validator function by user defined, and stopOnFailure set to true
                if (resultPerKey instanceof ValidationError && !options.stopOnFailure) {
                    this.results.push(resultPerKey);
                } else if (resultPerKey instanceof ValidationError) throw resultPerKey;
                
                // Check if resultPerKey is Array of ValidationError instance
                if (Array.isArray(resultPerKey) && resultPerKey.every((el) => el instanceof ValidationError)) { 
                    const currentPath = this.errorPath?.join('.');
                    const updatedErrors: ValidationError[] = resultPerKey.map((el: ValidationError) => {
                        return el.setPath(currentPath);
                    })
                    this.results.push(...updatedErrors);
                } else if (!(resultPerKey instanceof ValidationError)) {
                    this.results.push(resultPerKey as Result<T>);
                }
                this.errorPath?.pop();

            }
        }   
        return this.results.flat();
    }

    shape(newObjectSchema: ObjectValidatorSchema<any>) {
        if (this.objectSchema) {
            Object.assign(this.objectSchema, newObjectSchema);
        }
        this.results = [];
        return this;
    }

    clone() {
        return new ObjectValidator({...this.objectSchema});
    }

}


export default (objectSchema: ObjectValidatorSchema<any>) => new ObjectValidator(objectSchema);