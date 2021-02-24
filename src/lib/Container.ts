import InvalidBindException from "../exceptions/InvalidBindException"

export default class Container {
    private binds: Array<{ alias: string, callback: () => any }> = []

    bindSingleton<T>(alias: string, type: T) {
        this.checkDuplicate(alias)

        this.binds.push({
            alias: alias,
            callback: () => { return type }
        })
    }

    bindFactory<T>(alias: string, callback: () => T) {
        this.checkDuplicate(alias)

        this.binds.push({
            alias: alias,
            callback: callback
        })
    }

    getBind<T>(alias: string): T {
        return this.binds.find(b => b.alias == alias)?.callback() ?? null
    }

    private checkDuplicate(alias: string): void {
        if (this.binds.find(b => b.alias == alias) != undefined) {
            throw new InvalidBindException()
        }
    }
}
