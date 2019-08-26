import { Query, Magnus, Context } from "@notadd/magnus-core";
import { Controller } from "@nestjs/common";
import { Headers } from "../../lib/index";
@Controller()
@Magnus()
export class IncController {
  @Query()
  add(a: number, b: number, @Headers() headers: any): number {
    console.log({
      headers
    });
    return a + b;
  }
}
