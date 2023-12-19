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