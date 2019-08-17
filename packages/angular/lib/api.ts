import * as a from "apollo-angular";
import { MAGNUS_APOLLO } from "./token";
import { Inject, Injectable, Self } from "@angular/core";

@Injectable()
export class Query<A, B> extends a.Query<A, B> {
  constructor(apollo: a.Apollo, @Self() @Inject(MAGNUS_APOLLO) client: string) {
    console.log(client);
    super(apollo);
    this.client = client;
  }

  watch(variables?: B, options?: any): a.QueryRef<A, B> {
    console.log(this.client);
    return super.watch(variables, options);
  }
}

@Injectable()
export class Mutation<A, B> extends a.Mutation<A, B> {
  constructor(apollo: a.Apollo, @Self() @Inject(MAGNUS_APOLLO) client: string) {
    console.log(client);
    super(apollo);
    this.client = client;
  }
}

@Injectable()
export class Subscription<A, B> extends a.Subscription<A, B> {
  constructor(apollo: a.Apollo, @Self() @Inject(MAGNUS_APOLLO) client: string) {
    console.log(client);
    super(apollo);
    this.client = client;
  }
}
