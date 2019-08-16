import { Entity, Column, OneToMany, ChildEntity, ManyToOne } from "typeorm";
import { Title, Words } from "../../lib";

@Entity()
export class Domain {
  @Title()
  title: string;

  @Words()
  code: string;

  @ManyToOne(() => Domain, type => type.parent)
  parent: Domain[];

  @OneToMany(() => Domain, type => type.parent)
  children: Domain[];
}
