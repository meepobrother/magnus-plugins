import {
  UserName,
  Factory,
  Password,
  Realname,
  Title,
  Desc
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

@Entity()
export class ToDoItem {
  @Title()
  title: string;

  @Desc()
  desc: string;

  @Realname()
  username: string;
}

@Entity()
export class User {
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
import { Where, Order } from "@notadd/magnus-core";
interface Limit {
  page?: number;
  psize?: number;
}
interface ListResult<T> {
  list: T[];
  count: number;
}
/**
 * 接口规范，一旦制定，不容随意修改
 */
@Magnus({
  entities: [User, ToDoItem]
})
export class Controller<T> extends MagnusBase<T> {
  @Query()
  list(where?: Where<T>, order?: Order<T>, limit?: Limit): ListResult<T> {
    return { list: factory.createEntities(this.tablename, 10), count: 10 };
  }

  @Mutation()
  delete(id: number): T {
    return {} as any;
  }

  @Mutation()
  deletes(id: number[]): T[] {
    return {} as any;
  }

  @Query()
  detail(id: number): T {
    return factory.createEntity(this.tablename);
  }

  @Mutation()
  update(id: number, data: Partial<T>): T {
    return factory.createEntity(this.tablename);
  }

  @Mutation()
  edit(data: T): T {
    return factory.createEntity(this.tablename);
  }

  @Mutation()
  edits(data: T[]): T[] {
    return factory.createEntity(this.tablename);
  }
}
