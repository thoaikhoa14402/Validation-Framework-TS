export class Stack<T> {
    private items: T[];

    constructor() {
        this.items = [];
    }

    //  Add an element into top of stack
    push(element: T): void {
        this.items.push(element);
    }

    // Pop element from stack
    pop(): T | undefined { 
        return this.items.pop();
    }

    // Peek 
    peek(): T | undefined {
        return this.items[this.items.length - 1];
    }

    // Check size of stack
    size(): number {
        return this.items.length;
    }

    // Check if stack is empty
    isEmpty(): boolean { 
        return this.items.length === 0;
    }

    // Clear all elements from stack
    clear(): void {
        this.items = [];
    }

    // Join all elements in stack -> To create a path error string
    join(separator: string): string {
        return this.items.join(separator);
    }
}