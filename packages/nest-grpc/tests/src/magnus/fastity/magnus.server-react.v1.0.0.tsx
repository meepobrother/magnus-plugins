/* tslint:disable */
import gql from "graphql-tag";
import * as React from "react";
import * as ApolloReactCommon from "@apollo/react-common";
import * as ApolloReactComponents from "@apollo/react-components";
import * as ApolloReactHoc from "@apollo/react-hoc";
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Bool: any;
  Bytes: any;
  Date: any;
  Double: any;
  Empty: any;
  Error: any;
  Fixed32: any;
  Fixed64: any;
  Int32: any;
  Int64: any;
  Json: any;
  Sfixed32: any;
  Sfixed64: any;
  Sint32: any;
  Sint64: any;
  Timestamp: any;
  Uint32: any;
  Uint64: any;
};

export type Query = {
  __typename?: "Query";
  add?: Maybe<Scalars["Int"]>;
};

export type QueryAddArgs = {
  a: Scalars["Int"];
  b: Scalars["Int"];
};

export type AddQueryVariables = {
  a: Scalars["Int"];
  b: Scalars["Int"];
};

export type AddQuery = { __typename?: "Query" } & Pick<Query, "add">;

export const AddDocument = gql`
  query add($a: Int!, $b: Int!) {
    add(a: $a, b: $b)
  }
`;
export type AddComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<AddQuery, AddQueryVariables>,
  "query"
> &
  ({ variables: AddQueryVariables; skip?: boolean } | { skip: boolean });

export const AddComponent = (props: AddComponentProps) => (
  <ApolloReactComponents.Query<AddQuery, AddQueryVariables>
    query={AddDocument}
    {...props}
  />
);

export type AddProps<TChildProps = {}> = ApolloReactHoc.DataProps<
  AddQuery,
  AddQueryVariables
> &
  TChildProps;
export function withAdd<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    AddQuery,
    AddQueryVariables,
    AddProps<TChildProps>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    AddQuery,
    AddQueryVariables,
    AddProps<TChildProps>
  >(AddDocument, {
    alias: "withAdd",
    ...operationOptions
  });
}
export type AddQueryResult = ApolloReactCommon.QueryResult<
  AddQuery,
  AddQueryVariables
>;
export interface IntrospectionResultData {
  __schema: {
    types: {
      kind: string;
      name: string;
      possibleTypes: {
        name: string;
      }[];
    }[];
  };
}

const result: IntrospectionResultData = {
  __schema: {
    types: []
  }
};

export default result;
