import { Injectable } from "@nestjs/common";
import { ModuleRef } from '@nestjs/core';
import { InternalFactoryRegister } from "../internal/InternalFactoryRegister";
import { FindImplOption } from "../options/FindImplOption";
import { ImplResolver } from "../resolvers/ImplResolver";

@Injectable()
export class NestVillarImplDiscovery implements ImplResolver {

    constructor(
        private readonly moduleRef: ModuleRef
    ) { }

    onModuleInit() { }

    async findImpl<T>(key: string, option?: FindImplOption): Promise<T | undefined> {

        const instanceName = InternalFactoryRegister.getInstance().findImpl(key, option)

        if (!instanceName) {
            console.log(`It was not possible to find an impl with the key ${key} ${option?.ref ? ` ref ${option?.ref}` : ''}`)
            return undefined
        }

        const classInstance = InternalFactoryRegister.getInstance().getClassImpl(instanceName)

        return this.moduleRef.get(classInstance as any)
    }

    getImpl(implName: string): any {
        return this.moduleRef.get(implName);
    }
}