import { InstanceLoader } from "../internal/InstanceLoader";
import { ImplResolver } from "./ImplResolver";

export class VillarImplResolver implements ImplResolver {

    private static instance: VillarImplResolver = new VillarImplResolver()

    private implInstance: Map<string, any> = new Map

    private constructor() { }

    static getInstance() {
        return this.instance
    }

    onModuleInit() { }

    static register(...impls: Array<any>) {
        impls.forEach(imp => {
            const instance = new InstanceLoader(imp).getNew();
            this.getInstance().registerInstance(instance.constructor.name, instance)
        })
    }

    getImpl(implName: string) {
        return this.implInstance.get(implName)
    }

    registerInstance(implName: string, instance: any) {
        this.implInstance.set(implName, instance)
    }

}