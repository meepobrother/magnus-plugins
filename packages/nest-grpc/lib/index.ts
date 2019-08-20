import { loadSync } from "@grpc/proto-loader";
import { Server, ServerCredentials, loadPackageDefinition } from "grpc";
import { join } from "path";
interface NestGrpcOptions {
  max_send_message_length?: number;
  max_receive_message_length?: number;
  protoPath: string;
}
export class NestGrpc {
  url: string = `0.0.0.0:3000`;
  client: Server;
  get credentials() {
    return ServerCredentials.createInsecure();
  }
  constructor(private options: NestGrpcOptions) {}

  public getServiceNames(grpcPkg: any): { name: string; service: any }[] {
    const services: { name: string; service: any }[] = [];
    // this.collectDeepServices("", grpcPkg, services);
    return services;
  }

  public lookupPackage(root: any, packageName: string) {
    let pkg = root;
    for (const name of packageName.split(/\./)) {
      pkg = pkg[name];
    }
    return pkg;
  }

  async start() {
    this.client = new Server({
      [`grpc.max_send_message_length`]:
        this.options.max_send_message_length || 4 * 1024 * 1024,
      [`grpc.max_receive_message_length`]:
        this.options.max_receive_message_length || 4 * 1024 * 1024
    });
    const packageDefinition = loadSync(this.options.protoPath);
    const packageObject = loadPackageDefinition(packageDefinition);
    const grpcPkg = this.lookupPackage(packageObject, `userCenter`);
    for (const definition of this.getServiceNames(grpcPkg)) {
      this.client.addService(
        definition.service.service,
        await this.createService(definition.service, definition.name)
      );
    }
    this.client.bind(this.url, this.credentials);
    this.client.start();
  }

  close() {
    this.client && this.client.forceShutdown();
    this.client = null;
  }

  bindEvents() {}
}

const grpc = new NestGrpc({
  protoPath: join(__dirname, "1.proto")
});
grpc.start();
