import { ImplementationOptions } from "../options/ImplementationOptions"

export class InternalFactoryRegister {

    private static instance: InternalFactoryRegister = new InternalFactoryRegister()

    private implRegsiters: Map<string, string> = new Map()

    private constructor() {}

    static getInstance() {
        return this.instance
    }

    registerImpl(prototypeName: string, options: ImplementationOptions): void {
        const implName = options.implName || prototypeName
        const key = `${options.key}${options.ref || ''}`
        this.implRegsiters.set(key, implName)
    }

    findImpl(key: string, ref?: string): string | undefined {
        const keyFind = `${key}${ref || ''}`
        return this.implRegsiters.get(keyFind)
    }
}