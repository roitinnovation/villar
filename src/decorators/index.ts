import { InternalFactoryRegister } from "../internal/InternalFactoryRegister";
import { ImplementationOptions } from "../options/ImplementationOptions";

export function Implementation(options: ImplementationOptions) {
    return function (constructor: Function) {
        InternalFactoryRegister.getInstance().registerImpl(constructor.prototype.constructor.name, options, constructor)
    }
}