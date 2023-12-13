export type Result<T> = 
    | { ok: true, value: T }
    | { ok: false, message: string }


interface IValidator<T> {
    go(value: unknown): Result<T>;
}

type StringRule = 
    | { type: "equal", value: string }
    | { type: "notEqual", value: string }
    | { type: "minLength", min: number } 
    | { type: "maxLength", max: number }

class StringValidator implements IValidator<string> {
    constructor(private rules?: StringRule[]) {
        if (!Array.isArray(this.rules)) {
            this.rules = [];
        }
    }

    /**
     * Adds a rule to the array of rules, or replaces a rule if it already exists.
     * Use this function to prevent having multiple rules of the same type. 
     */
    private addRule: (rule: StringRule) => StringRule[] = rule => {
        // Filter the current rule set, removing any rule that has the same type of the one being added
        const filtered = this.rules!.filter(r => r.type !== rule.type);

        // Add the new rule to the filtered rule array 
        return [...filtered, rule]
    }

    /**
     * Fails if the value being validated is not equal to @param value.
     */
    equals: (value: string) => StringValidator = value => {
        this.rules = this.addRule({ type: "equal", value: value });
        return this;
    }

    /**
     * Fails if the value being validated is equal to @param value.
     */
    notEquals: (value: string) => StringValidator = value => {
        this.rules = this.addRule({ type: "notEqual", value: value });
        return this;
    }

    /**
     * Fails if the string's length is less than @param min.
     */
    minLength: (min: number) => StringValidator = min => {
        this.rules = this.addRule({ type: "minLength", min: min });
        return this;
    }

    /**
     * Fails if the string's length is greater than @param max.
     */
    maxLength: (max: number) => StringValidator = max => {
        this.rules = this.addRule({ type: "maxLength", max: max });
        return this;
    }

    /**
     * Fails if the string is empty.
     */
    notEmpty: () => StringValidator = () => {
        // We don't need to use a specific rule for notEmpty here, we can just set a min length of 1!
        this.rules = this.addRule({ type: "minLength", min: 1 });
        return this;
    }

    /**
     * Fails if the string is not empty. NOTE that an empty string is _not_ the same as a null or undefined value.
     */
    empty: () => StringValidator = () => {
        // Again, we don't need a specific rule for empty, we just set a max length of 0
        this.rules = this.addRule({ type: "maxLength", max: 0 });
        return this;    
    }

    /**
     * Checks an individual rule against the value being validated.
     */
    checkRule: (rule: StringRule, value: string) => Result<string> = (rule, value) => {
        const err = (msg: string): Result<string>  => ({ ok: false, message: msg});
        const ok = (value: string): Result<string> => ({ ok: true, value: value });
    
        switch (rule.type) {
            case "equal": 
                return rule.value !== value 
                    ? err(`Value was expected to be ${rule.value} but was ${value}.`) 
                    : ok(value);
    
            case "notEqual":
                return rule.value === value 
                    ? err(`Value must not be ${rule.value}.`) 
                    : ok(value);
    
            case "minLength":
                return value.length < rule.min 
                    ? err(`String length must be greater than or equal to ${rule.min} but was ${value.length}.`) 
                    : ok(value);
    
            case "maxLength":
                return value.length > rule.max 
                    ? err(`String length must be less than or equal to ${rule.max} but was ${value.length}.`) 
                    : ok(value);
        } 
    }

    go: (value: unknown) => Result<string> = value => {
        // Since the value is unknown, we must check that the type is string before validating each rule
        if (value === null) {
            return {
                ok: false,
                message: "StringValidator expected a string but received null."
            }       
        } else if (value === undefined) {
            return { 
                ok: false,
                message: "StringValidator expected a string but received undefined."
            }
        } else if (typeof value !== "string") {
            return {
                ok: false,
                message: `StringValidator expected a string but received ${typeof value}.`
            }
        }
    
        // TypeScript compiler now knows that value is a string
        // Iterate over all rules and short-circuit to return an error if any rule fails
        for (let rule of this.rules!) {
            const result = this.checkRule(rule, value);
    
            if (result.ok === false) {
                return result;
            }       
        }
    
        // If none of the rules in the loop had an error, the value passed validation!
        return {
            ok: true,
            value: value
        }
    }

}


// // Testing string validator 
// const validator = new StringValidator().notEmpty().maxLength(20).notEquals("bar");
// const go = (value: string) => {
//     const result = validator.go(value);

//     if (!result.ok) {
//         console.error(result.message);
//     } else {
//         console.log(`String value is valid: ${result.value}.`);
//     }
// }


// // Object validation

// go("foo"); // String value is valid: foo.
// go("bar"); // Value must not be bar.
// go("something longer than 20"); // String length must be less than or equal to 20 but was 24.

// ----------------------------------------------------------------------------------------



type PropertyValidator<T> =
    | IValidator<T>
    | ((value: unknown) => Result<T>);

/**
 * Takes the <T> type and requires all of its properties to be a PropertyValidator.
 */
type Shape<T extends object> = Record<keyof T, PropertyValidator<any>>;

/**
 * Determines whether the value is an IValidator by checking for a .go function.
 */
function isValidator<T>(value: unknown): value is IValidator<T> {
    // Check if the value has a .go function. If so, it's an IValidator
    return typeof (value as IValidator<T>).go === "function";
}


class ShapeValidator<T extends object> implements IValidator<T> {
    constructor(private shape: Shape<T>) { }

    go: (value: unknown) => Result<T> | any = value => {
        const err: (msg: string) => Result<T> = msg => ({ ok: false, message: msg });

        // First check that the value is an object and not an array, null, undefined, etc
        if (value === null || value === undefined) {
            return err("Value cannot be null or undefined.");
        } else if (Array.isArray(value)) {
            return err("Value must be an object but was an array.");
        } else if (typeof value !== "object") {
            return err(`Value must be an object but was ${typeof value}.`);
        }

        // Get the keys of both the expected shape, and the value
        const expectedKeys = Object.getOwnPropertyNames(this.shape);
        const actualKeys = Object.getOwnPropertyNames(value);

        // Check if any expected property is missing from the value
        for (let expected of expectedKeys) {
            if (actualKeys.indexOf(expected) === -1) {
                return err(`Value is missing expected property ${expected}.`);
            }
        }

        // All properties are accounted for! Now loop through each validator on the expected shape and test the value
        for (let expected of expectedKeys) {
            const validator: PropertyValidator<T> = this.shape[expected as keyof T];
            const propValue = (value as {[key: string]: any})[expected];
            // const validator = (this.shape as {[key: string]: PropertyValidator<any>})[expected];
            // const propValue = (value as {[key: string]: any})[expected];

            // TypeScript doesn't yet know if this is an IValidator, or a function. Use the isValidator guard to check.
            const result = isValidator(validator) ? validator.go(propValue) : validator(propValue);
            // If validation failed, short-circuit the loop and return an error
            if (result.ok === false) return result;
        }

        // All validation passed!
        return {
            ok: true,
            value: value
        }
    }
}

type LineItem = {
    name: string;
    manufacturer: string;
}

type PurchaseRequest = {
    token: string;
    line_item: LineItem;
    /**
     * Customer has the option to tell us a date by which they need the order.
     */
    needed_by: string | null;
}

const validator = new ShapeValidator<PurchaseRequest>({
    token: new StringValidator().notEmpty(),
    line_item: new ShapeValidator<LineItem>({
        name: new StringValidator().notEmpty(),
        manufacturer: new StringValidator().notEmpty()
    }),
    needed_by: (value: unknown) => {
        if (value === null) {
            return { ok: true, value: null };
        }

        // Value is not null, so use a string validator to validate it.
        return new StringValidator().notEmpty().go(value);
    }
});

const test_1 = validator.go({
    token: "token",
    line_item: {
        name: "Widget",
        manufacturer: "Foo Co."
    },
    needed_by: null
}); // { ok: true, value: ... }


const test_2 = validator.go({
    token: "token",
    line_item: {
        name: "Widget",
        manufacturer: "Foo Co."
    },
    needed_by: null
}); // { ok: true, value: ... }

const test_3 = validator.go({
    token: "token",
    needed_by: null
}); // { ok: false, message: "Value is missing expected property line_item." }

const test_4 = validator.go("foo"); // { ok: false, message: "Value must be an object but was string." }


console.log('Test 1: ', test_1);
console.log('Test 2: ', test_2);
console.log('Test 3: ', test_3);
console.log('Test 4: ', test_4);
