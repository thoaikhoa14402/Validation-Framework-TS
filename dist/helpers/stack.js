"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stack = void 0;
class Stack {
    constructor() {
        this.items = [];
    }
    //  Add an element into top of stack
    push(element) {
        this.items.push(element);
    }
    // Pop element from stack
    pop() {
        return this.items.pop();
    }
    // Peek 
    peek() {
        return this.items[this.items.length - 1];
    }
    // Check size of stack
    size() {
        return this.items.length;
    }
    // Check if stack is empty
    isEmpty() {
        return this.items.length === 0;
    }
    // Clear all elements from stack
    clear() {
        this.items = [];
    }
    // Join all elements in stack -> To create a path error string
    join(separator) {
        return this.items.join(separator);
    }
}
exports.Stack = Stack;
