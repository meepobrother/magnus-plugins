import { NestGrpc } from "../../lib/index";
import { join } from "path";
import { TestMagnus } from "./inc/test";
const metadata = require("./assets/fastity/magnus.metadata.json");
const grpc = new NestGrpc({
  url: `0.0.0.0:3004`,
  protoPath: join(__dirname, "assets/fastity/magnus.server.proto"),
  package: `fastity`,
  metadata,
  controllers: {
    TestMagnus
  },
  decorators: {}
});
grpc.listen(() => {
  console.log(`start`);
});
