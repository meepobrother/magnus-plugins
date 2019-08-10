import { HandlerDefMap } from "@notadd/magnus-core";
import { INestApplication } from "@nestjs/common";
import { ClientVisitor, ParseVisitor, ast } from "@notadd/magnus-graphql";
import { scalars } from "@notadd/magnus-graphql";
import { upperFirst } from "lodash";
import { GraphQLResolveInfo } from "graphql";
function createFactoryByMap(
  map: HandlerDefMap,
  app: INestApplication
): { [key: string]: { [key: string]: any } } {
  const factory: { [key: string]: { [key: string]: any } } = {};
  Object.keys(map).map(operationName => {
    const items = map[operationName] || [];
    const obj: any = {};
    items.forEach(it => {
      const [fieldName, className, tableName, methodName, argsDef] = it;
      obj[fieldName] = (args: any, selectionSet: any) => {
        const controller = app.get(className);
        debugger;
        return controller[methodName](...argsDef.map(arg => args[arg.name]));
      };
    });
    factory[operationName] = obj;
  });
  return factory;
}
export function createResolver(
  handlerDef: HandlerDefMap,
  app: INestApplication
) {
  const map = createFactoryByMap(handlerDef, app);
  const resolver: any = scalars;
  const client = new ClientVisitor();
  const parse = new ParseVisitor();
  Object.keys(map).map((key: string) => {
    const handler = map[key];
    resolver[upperFirst(key)] = {};
    Object.keys(handler).map(hKey => {
      const item = handler[hKey];
      resolver[upperFirst(key)][hKey] = async (
        source: any,
        args: any,
        context: any,
        info: GraphQLResolveInfo
      ) => {
        const fieldName = info.fieldName;
        let result: any;
        await Promise.all(
          info.fieldNodes.map(async field => {
            let node = new ast.FieldAst();
            node = node.visit(parse, field);
            const field2 = node.visit(client, args);
            const typeSource = typeof source;
            const selfhandlerDef = handlerDef[key].find(
              it => it[3] === fieldName
            );
            if (selfhandlerDef && typeSource === "object") {
              const params = selfhandlerDef[4];
              const parameters = new Array(params.length);
              const selection = field2.selectionSet;
              params.map(par => {
                const { name, type, index, decorator } = par;
                if (decorator === "Selection") {
                  parameters[index] = selection;
                } else if (decorator === "Parent") {
                  parameters[index] = source;
                } else if (decorator === "Relation") {
                  // parameters[index] = entityDef;
                } else {
                  parameters[index] = args[name];
                }
              });
              result = await source[fieldName](...parameters);
            } else if (typeSource === "undefined") {
              result = item(args, field2.selectionSet);
            } else {
              result = source;
            }
          })
        );
        return result;
      };
    });
  });
  return resolver;
}
