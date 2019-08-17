import { Apollo } from "apollo-angular";
import { NgModule, ModuleWithProviders, APP_INITIALIZER } from "@angular/core";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLinkHandler, HttpLink } from "apollo-angular-link-http";
import { MAGNUS_APOLLO } from "./token";
interface MagnusAngularOptions {
  apiUrl: string;
  name: string;
}
@NgModule()
export class MagnusAngular {
  constructor() {}
  static forChild(options: MagnusAngularOptions): ModuleWithProviders {
    return {
      ngModule: MagnusAngular,
      providers: [
        {
          provide: APP_INITIALIZER,
          useFactory: (apollo: Apollo, httpLink: HttpLink) => {
            return () => {
              const link: HttpLinkHandler = httpLink.create({
                uri: options.apiUrl
              });
              const cache = new InMemoryCache();
              apollo.createNamed(options.name, {
                link,
                cache
              });
            };
          },
          deps: [Apollo, HttpLink],
          multi: true
        },
        {
          provide: MAGNUS_APOLLO,
          useValue: options.name
        }
      ]
    };
  }
}

export * from "./api";
export * from "./token";
