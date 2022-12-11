interface IDirTreeNode {
    name: string;
    calculateSize(): number;
}

class DirTree implements IDirTreeNode {
    readonly #name: string
    readonly #childrenMap = new Map<string, DirTree | FileTreeNode>()
    #prev: DirTree | null = null

    constructor(name: string, prev: DirTree | null = null) {
        this.#name = name
        this.#prev = prev
    }

    get name() {
        return this.#name
    }

    get prev() {
        return this.#prev
    }

    get children() {
        return Array.from(this.#childrenMap.values())
    }

    addFile(name: string, size: number) {
        if (this.#childrenMap.has(name)) {
            return
        }

        this.#childrenMap.set(name, new FileTreeNode(name, size))
    }

    addDir(name: string) {
        if (this.#childrenMap.has(name)) {
            return
        }

        this.#childrenMap.set(name, new DirTree(name, this))
    }

    getDir(name: string) {
        return this.#childrenMap.get(name)
    }

    calculateSize() {
        return this.children.reduce((acc, child) => acc + child.calculateSize(), 0)
    }
}

class FileTreeNode implements IDirTreeNode {
    readonly #name: string
    readonly #size: number

    constructor(name: string, size: number) {
        this.#name = name
        this.#size = size
    }

    get name() {
        return this.#name
    }

    calculateSize(): number {
        return this.#size
    }
}

interface DirTreePrinter {
    print(tree: DirTree): void
}

class DirTreeConsolePrinter implements DirTreePrinter {
    print(tree: DirTree) {
        this.#printNested(tree, 0)
    }

    #printNested(tree: DirTree, depth: number) {
        if (!tree) {
            return
        }

        this.#printDir(tree, depth)

        tree.children.forEach(child => {
            if (child instanceof DirTree) {
                this.#printNested(child, depth + 1)
            } else {
                this.#printFile(child, depth + 1)
            }
        })
    }

    #printDir(dir: DirTree, depth = 0) {
        this.#logWithDepth(`- ${dir.name} (dir)`, depth)
    }

    #printFile(file: FileTreeNode, depth = 0) {
        this.#logWithDepth(`- ${file.name} (file size=${file.calculateSize()})`, depth)
    }

    #logWithDepth(text: string, depth = 0) {
        const depthString = depth ? ' '.repeat(depth * 2) : ''
        console.log(`${depthString}${text}`)
    }
}

class DirTreeTraverser {
    traverseDirectories(tree: DirTree, predicate: (dir: DirTree) => boolean) {
        predicate(tree)

        tree.children.forEach(child => {
          if (child instanceof DirTree) {
            this.traverseDirectories(child, predicate)
          }
        })
    }
}

export { DirTree, DirTreeConsolePrinter, DirTreeTraverser }
