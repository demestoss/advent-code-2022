import { Stack } from "../data-structures/index.ts";

export function parseStacks(stacksStr: string): Stack<string>[] {
    const stacks: Stack<string>[] = []

    const stacksStrSplit = stacksStr.split("\r\n")
    const stackNumbers = stacksStrSplit[stacksStrSplit.length - 1].split('')

    stackNumbers.forEach((stackNumber, index) => {
        if (!stackNumber.trim()) {
            return
        }
        const stack = new Stack<string>()
        for (let i = stacksStrSplit.length - 2; i >= 0; i--) {
            const stackStr = stacksStrSplit[i]
            const value = stackStr[index]
            if (!value?.trim()) {
                break
            }
            stack.push(value)
        }
        stacks.push(stack)
    })

    return stacks
}