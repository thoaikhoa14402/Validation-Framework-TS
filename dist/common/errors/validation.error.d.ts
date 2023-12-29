export declare class ValidationError extends Error {
    private type;
    private path;
    private value;
    constructor(message: string);
    setType(type: string): this;
    setPath(path: string): this;
    setValue(value: any): this;
}
export declare class ValidationErrors extends Error {
    private errorMessages;
    private validationErrors;
    constructor();
    pushError(error: ValidationError): void;
    getErrorMessages(): string[];
    getValidationErrors(): ValidationError[];
}
