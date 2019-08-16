import {
  UserName,
  Factory,
  Password,
  Realname,
  Title,
  Desc,
  PrimaryGeneratedColumn
} from "@magnus-plugins/faker";
import {
  Magnus,
  Query,
  Entity,
  OneToMany,
  MagnusBase,
  Mutation
} from "@notadd/magnus-core";
const config = require("../assets/mock/magnus.entity.json");
import { Where, Order } from "@notadd/magnus-core";
@Entity()
export class ToDoItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Title()
  title: string;

  @Desc()
  desc: string;

  @Realname()
  username: string;
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @UserName()
  username: string;

  @Password()
  password: string;

  @Realname()
  realname: string;

  @OneToMany()
  todoItems: ToDoItem[];
}

const factory = new Factory(config, { User, ToDoItem });
interface Limit {
  page?: number;
  psize?: number;
}
interface ListResult<T> {
  list: T[];
  count: number;
}
/**
 * 默认有一些初始化数据
 */
export const db: { [key: string]: any[] } = {
  User: factory.createEntities("User", 100),
  ToDoItem: factory.createEntities("ToDoItem", 100)
};
interface Message<T> {
  code: string;
  message: string;
  data: T;
}

interface Messages<T> {
  code: string;
  message: string;
  data: ListResult<T>;
}
/**
 * 接口规范，一旦制定，不容随意修改
 */
@Magnus({
  entities: [User, ToDoItem]
})
export class Controller<T> extends MagnusBase<T> {
  @Query()
  list(where?: Where<T>, order?: Order<T>, limit?: Limit): Messages<T> {
    const { page, psize } = limit || { page: 1, psize: 20 };
    let list: T[] = [];
    list = db[this.tablename]
      .sort((a, b) => {
        return a.id - b.id;
      })
      .slice((page - 1) * psize, psize);
    return {
      code: `B0001200`,
      message: `操作成功`,
      data: {
        count: 100,
        list: list
      }
    };
  }

  @Mutation()
  delete(id: number): Message<T> {
    let item: T;
    db[this.tablename] = db[this.tablename].filter(it => {
      if (it.id === id) {
        item = it;
        return false;
      }
      return true;
    });
    return {
      code: `B0001200`,
      message: `操作成功`,
      data: item
    };
  }

  @Mutation()
  deletes(ids: number[]): Message<T[]> {
    let item: T[] = [];
    db[this.tablename] = db[this.tablename].filter(it => {
      if (ids.includes(it.id)) {
        item.push(it);
        return false;
      }
      return true;
    });
    return {
      code: `B0001200`,
      message: `操作成功`,
      data: item
    };
  }

  @Query()
  detail(id: number): Message<T> {
    const item = db[this.tablename].find(it => it.id === id);
    return {
      code: `B0001200`,
      message: `操作成功`,
      data: item
    };
  }

  @Mutation()
  update(id: number, data: Partial<T>): Message<T> {
    let item: T;
    db[this.tablename] = db[this.tablename].map(it => {
      if (it.id === id) {
        item = {
          ...it,
          ...data
        };
        return item;
      }
      return it;
    });
    return {
      code: `B0001200`,
      message: `操作成功`,
      data: item
    };
  }

  @Mutation()
  edit(data: T): Message<T> {
    if ((data as any).id) {
      db[this.tablename].push(data);
      return { code: ``, message: ``, data };
    } else {
      const item = this.update((data as any).id, data);
      return { code: `B0001200`, message: `操作成功`, data: item.data };
    }
  }

  @Mutation()
  edits(datas: T[]): Message<T[]> {
    let items: T[] = [];
    datas.map(it => {
      items.push(this.edit(it).data);
    });
    return { code: `B0001200`, message: `操作成功`, data: items };
  }
}
