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
    this.collectDeepServices("", grpcPkg, services);
    debugger;
    return services;
  }

  private collectDeepServices(
    name: string,
    grpcDefinition: any,
    accumulator: { name: string; service: any }[]
  ) {
    if (typeof grpcDefinition !== "object") {
      return;
    }
    const keysToTraverse = Object.keys(grpcDefinition);
    // Traverse definitions or namespace extensions
    for (const key of keysToTraverse) {
      const nameExtended = this.parseDeepServiceName(name, key);
      const deepDefinition = grpcDefinition[key];
      if (deepDefinition && deepDefinition.service) {
        accumulator.push({
          name: nameExtended,
          service: deepDefinition
        });
      }
      // Continue recursion until objects end or service definition found
      else {
        if (deepDefinition)
          this.collectDeepServices(nameExtended, deepDefinition, accumulator);
      }
    }
  }

  private parseDeepServiceName(name: string, key: string): string {
    // If depth is zero then just return key
    if (name.length === 0) {
      return key;
    }
    // Otherwise add next through dot syntax
    return name + "." + key;
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
      console.log(definition);
      // this.client.addService();
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
