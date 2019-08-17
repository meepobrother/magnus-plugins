import { InjectionToken } from "@angular/core";
export const MAGNUS_APOLLO = new InjectionToken<string>(`MAGNUS_APOLLO`, {
  providedIn: "root",
  factory: () => "default"
});
