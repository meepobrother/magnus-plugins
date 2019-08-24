import { Transport } from '@nestjs/microservices';
import { join } from 'path';
export const fastityOptions: any = {
    transport: Transport.GRPC,
    options: {
        url: `${process.env.COMMON_HOST || '0.0.0.0'}:${process.env.COMMON_PORT||'9001'}`,
        package: 'fastity',
        protoPath: join(__dirname, '../../assets/fastity/magnus.server.proto'),
    },
    name: "fastity"
};
