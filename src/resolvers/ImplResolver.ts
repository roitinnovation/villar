import { OnModuleInit } from "@nestjs/common";

export interface ImplResolver extends OnModuleInit {
    getImpl(implName: string): any
}