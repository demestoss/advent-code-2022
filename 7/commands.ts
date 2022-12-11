import { DirTree } from "./tree.ts";
import {Queue} from "../data-structures/index.ts";

interface ICommand {}

interface ICommandHandler<T extends ICommand> {
    execute(tree: DirTree | null, command: T): DirTree | null
}

class CdCommand implements ICommand {
    constructor(public readonly dirName: string) {}
}

class CdCommandHandler implements ICommandHandler<CdCommand> {
    execute(tree: DirTree | null, command: CdCommand): DirTree | null {
        if (command.dirName === '..') {
            if (!tree || !tree.prev) {
                throw new Error('Cannot go back from root')
            }

            return tree.prev
        }

        if (!tree) {
            return new DirTree(command.dirName)
        }

        tree.addDir(command.dirName)
        return tree.getDir(command.dirName)
    }
}

class LsCommand implements ICommand {
    constructor(public readonly logs: string[]) {}
}

class LsCommandHandler implements ICommandHandler<LsCommand> {
    execute(tree: DirTree | null, command: LsCommand): DirTree | null {
        if (!tree) {
            throw new Error('Cannot list files in unknown directory')
        }

        for (const log of command.logs) {
            const [firstArg, secondArg] = log.split(' ')
            if (firstArg === 'dir') {
                tree.addDir(secondArg)
            } else {
                tree.addFile(secondArg, parseInt(firstArg, 10))
            }
        }

        return tree
    }
}

class CommandFactory {
    static create(commandName: string, args: string[], logs: string[]): ICommand {
        switch (commandName) {
            case 'cd':
                return new CdCommand(args[0])
            case 'ls':
                return new LsCommand(logs)
            default:
                throw new Error(`Unknown command: ${commandName}`)
        }
    }
}

export class CommandHandlerFactory {
    static create(command: ICommand): ICommandHandler<ICommand> {
        switch (command.constructor) {
            case CdCommand:
                return new CdCommandHandler()
            case LsCommand:
                return new LsCommandHandler()
            default:
                throw new Error(`Unknown command: ${command.constructor.name}`)
        }
    }
}

export class CommandStringParser {
    static parse(commandString: string, logs: Queue<string>): ICommand {
        const [commandName, ...args] = commandString.split(' ').slice(1)
        const commandLogs = this.#getCommandLogs(logs)

        return CommandFactory.create(commandName, args, commandLogs)
    }

    static #getCommandLogs(logs: Queue<string>): string[] {
        const args: string[] = []
        let peek = logs.peek()
        while (peek && !peek.startsWith('$')) {
            args.push(logs.dequeue())
            peek = logs.peek()
        }
        return args
    }
}
