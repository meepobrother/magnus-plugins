1. 服务端： 这里要把生成的 graphql 接口转换成相应的 proto 接口
2. 客户端： 要根据服务端的 proto 接口文档，生成相应的 graphql 接口

场景：
一个微服务，链接 magnus orm 层，可通过简单的配置文件，将相应的 magnus orm 接口暴露出来，并提供 grpc 服务
api 服务端，链接一个微服务，能根据 grpc 服务自动生成相应的 graphql 服务

```ts
type FieldOperator = "hiden" | "readonly" | "default";


[{
    code: 'system'
},{},{},{}]
// user.post
ul>ngFor="let item of menus ;index as key" data="data[key]"
    li>ngFor= data="data[key]"

grpc.systemSetting(system: string){
    page1: {
        title: '',
        icon: '',
        list1: {
            apis: [{
                path: 'userList',
                type: 'query'
            }],
            fields: {
                username: 'default',
                createUser: {
                    username: "default"
                }
            },
            actions: {
                saveButton:true,
                deleteButton: false
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
graphql.findUser(block: {},where: {},order: {}){
    username,
    password
}

gencode ---> service

  grpc.findUser(
  {

    where: {
        id_Lg: 10,
        // 数据权限
        from_depart_id: 1
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
        password: "readonly"
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
