import { Query, Magnus, ResolveProperty, Entity } from "@notadd/magnus-core";
import { Controller } from "@nestjs/common";
import { Headers } from "../../lib/index";

@Entity()
class Result {
    value: number;

    constructor(value: number) {
        this.value = value;
    }

    @ResolveProperty()
    dec(c: number): number {
        return this.value - c
    }
}
@Controller()
@Magnus()
export class IncController {
    @Query()
    add(a: number, b: number, @Headers() headers: any): Result {
        return new Result(a + b);
    }
}
