type Task = () => void
export class CallOnce {
    private isCalled = false
    private task?: Task
    set(task: Task) {
        this.task = task
    }
    run() {
        if (this.isCalled || !this.task) {
            return
        }
        this.task?.()
        this.isCalled = true;
    }
}

type Enum = { [key: string]: number | string };
export function* enumValues<E extends Enum>(e: E): Iterable<E[keyof E]> {
    for (const key in e) {
        const value = e[key];
        if (typeof value === "number")
            yield value;
    }
}
export function* enumNames<E extends Enum>(e: E): Iterable<keyof E> {
    for (const key in e) {
        const value = e[key];
        if (typeof value === "number")
            yield key;
    }
}

export function hasDuplicateElement<T>(array: T[], equals: (a: T, b: T) => boolean): boolean {
    for (let i = 0; i < array.length; i++) {
        if (array.findIndex(element => equals(array[i], element)) !== i) {
            return true
        }
    }
    return false
}