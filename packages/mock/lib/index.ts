import { Where, Order, MagnusBase } from "@notadd/magnus-core";
import { NestFactory } from "@nestjs/core";
import { FastifyAdapter } from "@nestjs/platform-fastify";

export class Core<T> extends MagnusBase<T> {
  __filter(it: T, where: Where<T>) {
    return true;
  }
  __sort(a: T, b: T, sort: Order<T>) {
    return -1;
  }
}

export async function bootstrap(appModule: any, port: number) {
  const app = await NestFactory.create(appModule, new FastifyAdapter());
  await app.init();
  app.listen(port, "0.0.0.0", () => {
    console.log(`app start ${port}`);
  });
}

export class Database {
  tables: Map<string, any[]> = new Map();
}
