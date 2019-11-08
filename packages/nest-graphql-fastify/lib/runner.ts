import { graphql } from 'graphql';
import { Injectable, Inject } from '@nestjs/common';
import { makeExecutableSchema } from 'graphql-tools';
import { ResolversExplorerService } from '@magnus-plugins/nest-resolver';
import { GRAPHQL_MODULE_OPTIONS, GqlModuleOptions } from './static';
import { Request, Response } from '@nestjs/common';
@Injectable()
export class MagnusRunner {
    constructor(
        public resolver: ResolversExplorerService,
        @Inject(GRAPHQL_MODULE_OPTIONS) public options: GqlModuleOptions
    ) { }
    async run(command: string, variables?: any, @Request() req?: any, @Response() res?: any) {
        const resolvers = this.resolver.createResolver(
            this.options.metadata,
            this.options.entities,
            this.options.decorators || {}
        );
        const schema = makeExecutableSchema({
            typeDefs: this.options.typeDefs,
            resolvers: resolvers
        });
        return await graphql({
            schema: schema,
            source: command,
            contextValue: {
                res: res,
                req: req
            },
            variableValues: variables
        })
    }
}
