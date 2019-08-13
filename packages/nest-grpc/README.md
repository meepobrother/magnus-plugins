1. 服务端： 这里要把生成的 graphql 接口转换成相应的 proto 接口
2. 客户端： 要根据服务端的 proto 接口文档，生成相应的 graphql 接口

场景：
一个微服务，链接 magnus orm 层，可通过简单的配置文件，将相应的 magnus orm 接口暴露出来，并提供 grpc 服务
api 服务端，链接一个微服务，能根据 grpc 服务自动生成相应的 graphql 服务

````ts
type FieldOperator = "hiden" | "readonly" | "default";
/**
 *
 */
grpc.pageSetting(path: string){
    page1: {
        list1: {
            apis: {

            },
            fields: {
                username: 'readonly',
                createUser: {
                    username: 'default'
                }
            },
            actions: {
                saveButton: true,
                deleteButton: true
            }
        },
        edit1: {
            fields: {
                username: 'default',
            },
            actions: {
                saveButton: true,
                deleteButton: true
            }
        }
    }
}

/**
- 查找用户
- 只返回 username
- {
  - count: 1,
  - list: [{
  -      username: "username1"
  - }]
- }
**/
  grpc.findUser(
  {
    entity: {
        id_Lg: 10,
        // 数据权限
        from_system_id: 1
    },
    order: {
        id: "DESC"
    },
    limit: {
        page: 1,
        psize: 20
    }
  },
    {
        // 字段是否展示 高级权限
        username: "readonly",
        password: "hidden"
    }
  );
  /**
添加或更新用户
只有 id 生效
 **/
  grpc.saveUser(
    {
        id: 1,
        username: "imeepos"
    },
    {
        username: "readonly",
        id: "default",
        password: "hidden"
    }
  );

```

```
````
