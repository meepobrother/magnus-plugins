import { Magnus, Query } from "@notadd/magnus-core";

@Magnus()
export class TestMagnus {
  @Query()
  add(a: number, b: number): number {
    return a + b;
  }
}
