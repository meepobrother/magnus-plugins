export * from "./graphql.module";

export const Headers = (): ParameterDecorator => (
  target: Object,
  propertyKey: string | symbol,
  parameterIndex: number
) => (ctx: any) => ctx.req.headers;

export const CurrentUser = (): ParameterDecorator => (
  target: Object,
  propertyKey: string | symbol,
  parameterIndex: number
) => (ctx: any) => ctx.req.user;

export const CurrentDomain = (): ParameterDecorator => (
  target: Object,
  propertyKey: string | symbol,
  parameterIndex: number
) => (ctx: any) => ctx.req.domain;

export const PermissionValue = (): ParameterDecorator => (
  target: Object,
  propertyKey: string | symbol,
  parameterIndex: number
) => (ctx: any) => ctx.req.permission || [];
