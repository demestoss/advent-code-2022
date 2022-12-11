import { Queue } from "../data-structures/index.ts";
import { CommandHandlerFactory, CommandStringParser } from "./commands.ts";
import { DirTree, DirTreeConsolePrinter, DirTreeTraverser } from "./tree.ts";

const file = await Deno.readTextFile("./input.txt");

const logs = Queue.from(file.split("\r\n"));

const availableSpace = 70_000_000
const neededSpace = 30_000_000
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

const printer = new DirTreeConsolePrinter()
const traverser = new DirTreeTraverser()
printer.print(root)

let smallestNeeded = Infinity
const totalSize = root.calculateSize()
const remainder = neededSpace - (availableSpace - totalSize)

traverser.traverseDirectories(root, (node) => {
    const size = node.calculateSize()
    if (size > remainder && size < smallestNeeded) {
        smallestNeeded = size
    }
})

console.log(smallestNeeded)