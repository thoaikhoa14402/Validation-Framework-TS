export declare class Stack<T> {
    private items;
    constructor();
    push(element: T): void;
    pop(): T | undefined;
    peek(): T | undefined;
    size(): number;
    isEmpty(): boolean;
    clear(): void;
    join(separator: string): string;
}
