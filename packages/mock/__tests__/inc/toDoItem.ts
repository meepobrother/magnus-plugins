import {
    Realname,
    Title,
    Desc,
    PrimaryGeneratedColumn,
    ManyToOne
} from "@magnus-plugins/faker";
import {
    Entity,
} from "@notadd/magnus-core";
import { User } from './user'
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

    @ManyToOne()
    user: User;
}