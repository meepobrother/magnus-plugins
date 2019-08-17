import { ModuleWithProviders } from "@angular/core";
import { ApolloLink } from "apollo-link";
interface MagnusAngularOptions {
    apiUrl: string;
    name: string;
    links?: ApolloLink[];
}
export declare class MagnusAngular {
    constructor();
    static forChild(options: MagnusAngularOptions): ModuleWithProviders;
}
export * from "./api";
export * from "./token";
