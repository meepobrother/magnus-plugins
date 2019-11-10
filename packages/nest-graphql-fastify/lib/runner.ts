import { graphql } from 'graphql';
import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { makeExecutableSchema } from 'graphql-tools';
import { ResolversExplorerService } from '@magnus-plugins/nest-resolver';
import { GRAPHQL_MODULE_OPTIONS, GqlModuleOptions } from './static';
import { Request, Response } from '@nestjs/common';
@Injectable()
export class MagnusRunner implements OnModuleInit {
    resolvers: any;
    schema: any;
    constructor(
        public resolver: ResolversExplorerService,
        @Inject(GRAPHQL_MODULE_OPTIONS) public options: GqlModuleOptions
    ) {

    }

    onModuleInit() {
        this.resolvers = this.resolver.createResolver(
            this.options.metadata,
            this.options.entities,
            this.options.decorators || {}
        );
        this.schema = makeExecutableSchema({
            typeDefs: this.options.typeDefs,
            resolvers: this.resolvers
        });
    }

    async run(command: string, variables?: any, @Request() req?: any, @Response() res?: any) {
        return await graphql({
            schema: this.schema,
            source: command,
            contextValue: {
                res: res,
                req: req
            },
            variableValues: variables
        })
    }
}
