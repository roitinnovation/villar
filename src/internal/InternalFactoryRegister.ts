import { FindImplOption } from "../options/FindImplOption"
import { ImplementationOptions } from "../options/ImplementationOptions"

export class InternalFactoryRegister {

    private static instance: InternalFactoryRegister = new InternalFactoryRegister()

    private implRegsiters: Map<any, string> = new Map()

    private constructor() {}

    static getInstance() {
        return this.instance
    }

    registerImpl(prototypeName: string, options: ImplementationOptions): void {
        const implName = options.implName || prototypeName

        const key = `${options.key}${options.ref || ''}`

        this.implRegsiters.set({
            key,
            includes: options.includes,
            truthCustom: options.truthCustom
        }, implName)
    }

    findImpl<T>(keyParam: string, option?: FindImplOption<T>): string | undefined {
        const keyBuild = `${keyParam}${option?.ref || ''}`
        
        const keyFind: string | undefined = Array.from(this.implRegsiters.keys()).find(val => {
            const { key, includes, truthCustom, useDefault } = val
            if(useDefault) {
                return option?.defaultImpl
            }
            if(includes) {
                return key.includes(keyBuild)
            }
            if(truthCustom) {
                return truthCustom(keyParam, option?.metadata)
            }
            return key == keyBuild
        })

        if(keyFind) {
            return this.implRegsiters.get(keyFind)
        }

        return undefined
    }
}