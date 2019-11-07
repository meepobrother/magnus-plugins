import {
    Entity,
    OneToMany
} from "@notadd/magnus-core";
import {
    UserName,
    Password,
    Realname,
    PrimaryGeneratedColumn
} from "@magnus-plugins/faker";
import { ToDoItem } from './toDoItem'
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