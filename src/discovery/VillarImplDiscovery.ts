import { InternalFactoryRegister } from "../internal/InternalFactoryRegister";
import { VillarImplResolver } from "../resolvers/VillarImplResolver";


export class VillarImplDiscovery {

    private static instance: VillarImplDiscovery = new VillarImplDiscovery

    private constructor() {}

    static getInstance() {
        return this.instance
    }

    findImpl<T>(key: string, ref?: string): T | undefined {

        const instanceName = InternalFactoryRegister.getInstance().findImpl(key, ref)

        if(!instanceName) {
            console.log(`It was not possible to find an impl with the key ${key} ${ref ? ` ref ${ref}` : ''}`)
            return undefined
        }

        return VillarImplResolver.getInstance().getImpl(instanceName)
    }
}