import { Where, Order, MagnusBase } from "@notadd/magnus-core";
import { NestFactory } from "@nestjs/core";
import { Transport } from "@nestjs/microservices";
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

interface GrpcOptions {
  url?: string;
  maxSendMessageLength?: number;
  maxReceiveMessageLength?: number;
  credentials?: any;
  protoPath: string;
  package: string;
  loader?: {
    keepCase?: boolean;
    alternateCommentMode?: boolean;
    longs?: Function;
    enums?: Function;
    bytes?: Function;
    defaults?: boolean;
    arrays?: boolean;
    objects?: boolean;
    oneofs?: boolean;
    json?: boolean;
    includeDirs?: string[];
  };
}
export async function bootstrapGrpc(appModule: any, options: GrpcOptions) {
  const app = await NestFactory.createMicroservice(appModule, {
    transport: Transport.GRPC,
    options: {
      ...options,
      loader: {
        defaults: true,
        arrays: true,
        objects: true,
        oneofs: true,
        json: true
      }
    }
  });
  await app.init();
  app.listen(() => {
    console.log(`app start ${options.url}`);
  });
}

export class Database {
  tables: Map<string, any[]> = new Map();
}
