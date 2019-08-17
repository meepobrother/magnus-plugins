import { ModuleWithProviders } from "@angular/core";
interface MagnusAngularOptions {
    apiUrl: string;
    name: string;
}
export declare class MagnusAngular {
    constructor();
    static forChild(options: MagnusAngularOptions): ModuleWithProviders;
}
export * from "./api";
export * from "./token";
