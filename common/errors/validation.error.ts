export class ValidationError extends Error {
    private type: string
	private path: string
	private value: any

    constructor(message: string) {
        super(message);
        this.type = '';
        this.path = '';
    }

    setType(type: string) {
        this.type = type;
        return this;
    }

    setPath(path: string) {
        this.path = path;
        return this;
    }

    setValue(value: any) {
        this.value = value;
        return this;
    }
}

export class ValidationErrors extends Error {
    private errorMessages: string[];
    private validationErrors: ValidationError[];
    
    constructor() {
        super();
        this.errorMessages = [];
        this.validationErrors = [];
    }

    pushError(error: ValidationError) {
        this.validationErrors.push(error) ;
        this.errorMessages.push(error.message);
        this.message = `${this.validationErrors.length} errors occurred`
    }

    getErrorMessages() {
        return this.errorMessages;
    }

    getValidationErrors() {
        return this.validationErrors;
    }
}