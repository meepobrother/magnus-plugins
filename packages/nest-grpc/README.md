1. 服务端： 这里要把生成的 graphql 接口转换成相应的 proto 接口
2. 客户端： 要根据服务端的 proto 接口文档，生成相应的 graphql 接口

场景：
一个微服务，链接 magnus orm 层，可通过简单的配置文件，将相应的 magnus orm 接口暴露出来，并提供 grpc 服务
api 服务端，链接一个微服务，能根据 grpc 服务自动生成相应的 graphql 服务

```ts
package fastity;
syntax = "proto3";
message Empty{
}
message Result{
    int32 result = 0;
}
message AddInput{
    int32 a = 0;
    int32 b = 2;
}
service Query{
    rpc add(AddInput) returns (Result);
}
```
