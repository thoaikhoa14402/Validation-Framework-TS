import { ValidationError } from "./validation.error";

export class ValidationErrorContext {
    private static instance: ValidationErrorContext

    private constructor() {}

    static getInstance() {
        return this.instance ? this.instance : this.instance = new ValidationErrorContext();
    }

    createError(options: {
        message?: string,
	    type?: string,
	    path?: string,
	    value?: any
    }) {
        return new ValidationError(options.message || '').setType(options.type || '').setPath(options.path || '').setValue(options.value || '');
    }
}

export default ValidationErrorContext.getInstance();