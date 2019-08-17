import * as a from "apollo-angular";
import { MAGNUS_APOLLO } from "./token";
import { Inject, Injectable } from "@angular/core";

@Injectable()
export class Query<A, B> extends a.Query<A, B> {
  constructor(apollo: a.Apollo, @Inject(MAGNUS_APOLLO) client: string) {
    super(apollo);
    this.client = client;
  }
}

@Injectable()
export class Mutation<A, B> extends a.Mutation<A, B> {
  constructor(apollo: a.Apollo, @Inject(MAGNUS_APOLLO) client: string) {
    super(apollo);
    this.client = client;
  }
}

@Injectable()
export class Subscription<A, B> extends a.Subscription<A, B> {
  constructor(apollo: a.Apollo, @Inject(MAGNUS_APOLLO) client: string) {
    super(apollo);
    this.client = client;
  }
}
