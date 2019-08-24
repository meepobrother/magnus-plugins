import { NestFactory } from "@nestjs/core";
import { NestGrpcOptions, NestGrpc } from "./strategy";
export async function bootstrap(app: any, options: NestGrpcOptions) {
  const application = await NestFactory.createMicroservice(app, {
    strategy: new NestGrpc(options)
  });
  application.listen(() => {
    console.log(`app start at ${options.url}`);
  });
}
