class Queue<T> {
    #items: T[] = []
    #size = 0

    get size() {
        return this.#size
    }

    enqueue(item: T) {
        this.#items.push(item)
        return ++this.#size
    }

    dequeue() {
        if (this.#size === 0) {
            return undefined
        }
        this.#size--
        return this.#items.shift()
    }

    peek() {
        return this.#items[0]
    }

    static from(items: T[]) {
        const queue = new Queue<T>()
        for (const item of items) {
            queue.enqueue(item)
        }
        return queue
    }
}

export { Queue }