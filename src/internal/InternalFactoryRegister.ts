import { FindImplOption } from "../options/FindImplOption"
import { ImplementationOptions } from "../options/ImplementationOptions"

export class InternalFactoryRegister {

    private static instance: InternalFactoryRegister = new InternalFactoryRegister()

    private implRegisters: Map<ImplementationOptions, string> = new Map()

    private implClassRegisters: Map<string, Function> = new Map()

    private constructor() { }

    static getInstance() {
        return this.instance
    }

    registerImpl(prototypeName: string, options: ImplementationOptions, constructor: Function): void {
        const implName = options.implName || prototypeName

        const key = `${options.key}${options.ref || ''}`

        options.key = key
        this.implRegisters.set(options, implName)

        this.implClassRegisters.set(implName, constructor)
    }

    findImpl(keyParam: string, option?: FindImplOption): string | undefined {
        const keyBuild = `${keyParam}${option?.ref || ''}`

        const keyFind: ImplementationOptions | undefined = Array.from(this.implRegisters.keys()).find(val => {
            const { key, includes, truthCustom, ref } = val

            if (option?.ref && ref != option.ref) {
                return false
            }

            if (includes && key) {
                return key.includes(keyBuild)
            }
            if (truthCustom) {
                return truthCustom(keyParam, option)
            }
            return key == keyBuild
        })

        if (keyFind) {
            return this.implRegisters.get(keyFind)
        }

        const keyDefault = Array.from(this.implRegisters.keys()).find(val => val.isDefault && val.ref === option?.ref)

        if (keyDefault) {
            return this.implRegisters.get(keyDefault)
        }

        return undefined
    }

    getClassImpl(implName: string): Function | undefined {
        return this.implClassRegisters.get(implName)
    }
}