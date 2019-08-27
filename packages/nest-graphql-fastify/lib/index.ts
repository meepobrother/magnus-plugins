import { SelectionSet } from "@notadd/magnus-typeorm";
export * from "./graphql.module";
export const Headers: any = () => () => (
    variable: any,
    that: SelectionSet
) => {
    if (that) {
        return that.context.req.headers
    }
};
export const CurrentUser: any = () => () => (
    variable: any,
    that: SelectionSet
) => {
    if (that) {
        return that.context.req.headers
    }
};
