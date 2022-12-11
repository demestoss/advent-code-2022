class Stack<T> {
    private items: T[] = []
    #size = 0

    get size() {
        return this.#size
    }

    push(item: T) {
        this.items.push(item)
        return ++this.#size
    }

    populate(items: T[]) {
        items.forEach(item => this.push(item))
    }

    pop(): T | undefined {
        if (this.#size === 0) return undefined
        this.#size--
        return this.items.pop()
    }

    peek(): T | undefined {
        return this.items[this.#size - 1]
    }

    static from(items: T[]) {
        const stack = new Stack<T>()
        items.forEach(item => stack.push(item))
        return stack
    }
}

export { Stack };