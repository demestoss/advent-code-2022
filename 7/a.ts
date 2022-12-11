import { Queue } from "../data-structures/index.ts";
import { CommandHandlerFactory, CommandStringParser } from "./commands.ts";
import { DirTree, DirTreeConsolePrinter, DirTreeTraverser } from "./tree.ts";

const file = await Deno.readTextFile("./input.txt");

const logs = Queue.from(file.split("\r\n"));

const maxSize = 100_000
let root = null
let tree: DirTree | null = null

while (logs.size) {
    const commandString = logs.dequeue()
    if (!commandString.startsWith('$')) {
        throw new Error('Invalid command')
    }

    const command = CommandStringParser.parse(commandString, logs)
    const commandHandler = CommandHandlerFactory.create(command)

    tree = commandHandler.execute(tree, command)

    if (!root) {
        root = tree
    }
}

const traverser = new DirTreeTraverser()
const printer = new DirTreeConsolePrinter()
printer.print(root)

let sum = 0

traverser.traverseDirectories(root, (node) => {
    const size = node.calculateSize()
    if (size <= maxSize) {
        sum += size
    }
})

console.log(sum)