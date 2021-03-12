import { Injectable } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import { ImplResolver } from "../resolvers/ImplResolver";
import { InternalFactoryRegister } from "../internal/InternalFactoryRegister";

@Injectable()
export class NestVillarImplDiscovery implements ImplResolver {

    constructor(
        private readonly moduleRef: ModuleRef
    ) {}

    findImpl<T>(key: string, ref?: string): T | undefined {

        const instanceName = InternalFactoryRegister.getInstance().findImpl(key, ref)

        if(!instanceName) {
            console.log(`It was not possible to find an impl with the key ${key} ${ref ? ` ref ${ref}` : ''}`)
            return undefined
        }

        return this.getImpl(instanceName)
    }

    getImpl(implName: string): any {
        return this.moduleRef.get(implName);
    }
}