import InvalidBindException from "../exceptions/InvalidBindException"
import { throwExpression } from "../helpers"

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
        return this.binds.find(b => b.alias == alias)?.callback() ?? throwExpression(new InvalidBindException("Invalid bind for" + alias))
    }

    private checkDuplicate(alias: string): void {
        if (this.binds.find(b => b.alias == alias) != undefined) {
            throwExpression(new InvalidBindException("Bind for this alias already exists: " + alias))
        }
    }
}
