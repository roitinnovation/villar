
export class ImplementationOptions {

    key?: string

    ref?: string

    implName?: string

    includes?: boolean = false

    /**
     * Signature: <T>(key: string, metadata: T) => boolean
     */
    truthCustom?: <T>(key: string, metadata: T) => boolean

    isDefault?: boolean
}