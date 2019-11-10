import { Module } from "@nestjs/common";
import { ResolversExplorerService } from './resolver';
@Module({
    providers: [ResolversExplorerService],
    exports: [ResolversExplorerService]
})
export class NestResolverModule { }
