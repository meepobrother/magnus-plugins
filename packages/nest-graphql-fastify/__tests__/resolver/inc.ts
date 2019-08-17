import { ResolveProperty, Query, Context } from "@notadd/magnus-core";
import { Injectable } from "@nestjs/common";
class Result {
    data: number;
    constructor(val: number) {
        this.data = val;
    }
    @ResolveProperty()
    getData(): number {
        return this.data += 1
    }
}

@Injectable()
export class IncController {
    @Query()
    add(a: number, b: number,  @Context() context: any): Result {
        console.log({
            context
        })
        return new Result(a + b);
    }
}
