import { FindImplOption } from "../options/FindImplOption";
import { InternalFactoryRegister } from "../internal/InternalFactoryRegister";
import { VillarImplResolver } from "../resolvers/VillarImplResolver";


export class VillarImplDiscovery {

    private static instance: VillarImplDiscovery = new VillarImplDiscovery

    private constructor() {}

    static getInstance() {
        return this.instance
    }

    findImpl<T>(key: string, option?: FindImplOption<T>): T | undefined {

        const instanceName = InternalFactoryRegister.getInstance().findImpl(key, option)

        if(!instanceName) {
            console.log(`It was not possible to find an impl with the key ${key} ${option?.ref ? ` ref ${option?.ref}` : ''}`)
            return undefined
        }

        return VillarImplResolver.getInstance().getImpl(instanceName)
    }
}