import * as a from "apollo-angular";
import { MAGNUS_APOLLO } from "./token";
import { Inject, Injectable } from "@angular/core";

@Injectable()
export class Query extends a.Query {
  constructor(@Inject(MAGNUS_APOLLO) apollo: a.Apollo) {
    super(apollo);
  }
}

@Injectable()
export class Mutation extends a.Mutation {
  constructor(@Inject(MAGNUS_APOLLO) apollo: a.Apollo) {
    super(apollo);
  }
}

@Injectable()
export class Subscription extends a.Subscription {
  constructor(@Inject(MAGNUS_APOLLO) apollo: a.Apollo) {
    super(apollo);
  }
}
