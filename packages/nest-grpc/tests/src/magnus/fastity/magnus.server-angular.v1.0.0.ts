/* tslint:disable */
import gql from "graphql-tag";
import { Injectable } from "@angular/core";
import * as Apollo from "apollo-angular";
export type Maybe<T> = T | null;
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

@Injectable({
  providedIn: "root"
})
export class AddGQL extends Apollo.Query<AddQuery, AddQueryVariables> {
  document = AddDocument;
  client = "fastity";
}
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
