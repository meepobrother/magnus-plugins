import { Query, Magnus } from "@notadd/magnus-core";

@Magnus()
export class IncController {
  @Query()
  add(a: number, b: number): number {
    return a + b;
  }
}
