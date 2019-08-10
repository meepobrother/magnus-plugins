import { Query, Magnus } from "@notadd/magnus-core";
import { Controller } from '@nestjs/common';
@Controller()
@Magnus()
export class IncController {
    @Query()
    add(a: number, b: number): number {
        return a + b;
    }
}
