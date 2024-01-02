import { ValidationError } from "./validation.error";
export declare class ValidationErrorContext {
    private static instance;
    private constructor();
    static getInstance(): ValidationErrorContext;
    createError(options: {
        message?: string;
        type?: string;
        path?: string;
        value?: any;
    }): ValidationError;
}
declare const _default: ValidationErrorContext;
export default _default;
