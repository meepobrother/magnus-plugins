import {
    Double,
    Float,
    Int32,
    Uint32,
    Sint32,
    Fixed32,
    Sfixed32,
    Int64,
    Uint64,
    Sint64,
    Fixed64,
    Sfixed64,
    Bool,
    String,
    Bytes,
    Empty
} from '@notadd/magnus-core';
import { Observable } from 'rxjs';

export interface ToDoItem {
	uid?: number;
	title?: string;
	desc?: string;
	username?: string;
}
export interface User {
	uid?: number;
	username?: string;
	password?: string;
	realname?: string;
	todoItems?: ToDoItem[];
}
export interface UserListResult {
	list: User[];
	count: number;
}
export interface ToDoItemInput {
	uid?: number;
	title?: string;
	desc?: string;
	username?: string;
}
export interface UserInput {
	uid?: number;
	username?: string;
	password?: string;
	realname?: string;
	todoItems?: ToDoItemInput[];
}
export interface UserInputWhere {
	/**/
	uid_Not?: number;
	/**/
	uid_In?: number[];
	/**/
	uid_NotIn?: number[];
	/**/
	uid_Lt?: number;
	/**/
	uid_Lte?: number;
	/**/
	uid_Gt?: number;
	/**/
	uid_Gte?: number;
	uid?: number;
	/**/
	username_Not?: string;
	/**/
	username_In?: string[];
	/**/
	username_NotIn?: string[];
	/**/
	username_Lt?: string;
	/**/
	username_Lte?: string;
	/**/
	username_Gt?: string;
	/**/
	username_Gte?: string;
	/**/
	username_Contains?: string;
	/**/
	username_NotContains?: string;
	/**/
	username_StartsWith?: string;
	/**/
	username_NotStartsWith?: string;
	/**/
	username_EndsWith?: string;
	/**/
	username_NotEndsWith?: string;
	username?: string;
	/**/
	password_Not?: string;
	/**/
	password_In?: string[];
	/**/
	password_NotIn?: string[];
	/**/
	password_Lt?: string;
	/**/
	password_Lte?: string;
	/**/
	password_Gt?: string;
	/**/
	password_Gte?: string;
	/**/
	password_Contains?: string;
	/**/
	password_NotContains?: string;
	/**/
	password_StartsWith?: string;
	/**/
	password_NotStartsWith?: string;
	/**/
	password_EndsWith?: string;
	/**/
	password_NotEndsWith?: string;
	password?: string;
	/**/
	realname_Not?: string;
	/**/
	realname_In?: string[];
	/**/
	realname_NotIn?: string[];
	/**/
	realname_Lt?: string;
	/**/
	realname_Lte?: string;
	/**/
	realname_Gt?: string;
	/**/
	realname_Gte?: string;
	/**/
	realname_Contains?: string;
	/**/
	realname_NotContains?: string;
	/**/
	realname_StartsWith?: string;
	/**/
	realname_NotStartsWith?: string;
	/**/
	realname_EndsWith?: string;
	/**/
	realname_NotEndsWith?: string;
	realname?: string;
	AND?: UserInputWhere[];
	OR?: UserInputWhere[];
	NOT?: UserInputWhere[];
}
export interface UserInputOrder {
	uid?: string;
	username?: string;
	password?: string;
	realname?: string;
	todoItems?: string;
}
export interface LimitInput {
	page?: number;
	psize?: number;
}
export interface ToDoItemListResult {
	list: ToDoItem[];
	count: number;
}
export interface ToDoItemInputWhere {
	/**/
	uid_Not?: number;
	/**/
	uid_In?: number[];
	/**/
	uid_NotIn?: number[];
	/**/
	uid_Lt?: number;
	/**/
	uid_Lte?: number;
	/**/
	uid_Gt?: number;
	/**/
	uid_Gte?: number;
	uid?: number;
	/**/
	title_Not?: string;
	/**/
	title_In?: string[];
	/**/
	title_NotIn?: string[];
	/**/
	title_Lt?: string;
	/**/
	title_Lte?: string;
	/**/
	title_Gt?: string;
	/**/
	title_Gte?: string;
	/**/
	title_Contains?: string;
	/**/
	title_NotContains?: string;
	/**/
	title_StartsWith?: string;
	/**/
	title_NotStartsWith?: string;
	/**/
	title_EndsWith?: string;
	/**/
	title_NotEndsWith?: string;
	title?: string;
	/**/
	desc_Not?: string;
	/**/
	desc_In?: string[];
	/**/
	desc_NotIn?: string[];
	/**/
	desc_Lt?: string;
	/**/
	desc_Lte?: string;
	/**/
	desc_Gt?: string;
	/**/
	desc_Gte?: string;
	/**/
	desc_Contains?: string;
	/**/
	desc_NotContains?: string;
	/**/
	desc_StartsWith?: string;
	/**/
	desc_NotStartsWith?: string;
	/**/
	desc_EndsWith?: string;
	/**/
	desc_NotEndsWith?: string;
	desc?: string;
	/**/
	username_Not?: string;
	/**/
	username_In?: string[];
	/**/
	username_NotIn?: string[];
	/**/
	username_Lt?: string;
	/**/
	username_Lte?: string;
	/**/
	username_Gt?: string;
	/**/
	username_Gte?: string;
	/**/
	username_Contains?: string;
	/**/
	username_NotContains?: string;
	/**/
	username_StartsWith?: string;
	/**/
	username_NotStartsWith?: string;
	/**/
	username_EndsWith?: string;
	/**/
	username_NotEndsWith?: string;
	username?: string;
	AND?: ToDoItemInputWhere[];
	OR?: ToDoItemInputWhere[];
	NOT?: ToDoItemInputWhere[];
}
export interface ToDoItemInputOrder {
	uid?: string;
	title?: string;
	desc?: string;
	username?: string;
}
export interface UserPartial {
	uid?: number;
	username?: string;
	password?: string;
	realname?: string;
	todoItems?: ToDoItemInput[];
}
export interface ToDoItemPartial {
	uid?: number;
	title?: string;
	desc?: string;
	username?: string;
}
export interface Query {
	listUser<T>(where?: UserInputWhere, order?: UserInputOrder, limit?: LimitInput, __selection?: string): Promise<T & UserListResult>;
	listToDoItem<T>(where?: ToDoItemInputWhere, order?: ToDoItemInputOrder, limit?: LimitInput, __selection?: string): Promise<T & ToDoItemListResult>;
	detailUser<T>(id: number, __selection?: string): Promise<T & User>;
	detailToDoItem<T>(id: number, __selection?: string): Promise<T & ToDoItem>;
}
export interface Mutation {
	deleteUser<T>(id: number, __selection?: string): Promise<T & User>;
	deleteToDoItem<T>(id: number, __selection?: string): Promise<T & ToDoItem>;
	deletesUser<T>(ids: number[], __selection?: string): Promise<T & User[]>;
	deletesToDoItem<T>(ids: number[], __selection?: string): Promise<T & ToDoItem[]>;
	updateUser<T>(id: number, data: UserPartial, __selection?: string): Promise<T & User>;
	updateToDoItem<T>(id: number, data: ToDoItemPartial, __selection?: string): Promise<T & ToDoItem>;
	editUser<T>(data: UserInput, __selection?: string): Promise<T & User>;
	editToDoItem<T>(data: ToDoItemInput, __selection?: string): Promise<T & ToDoItem>;
	editsUser<T>(datas: UserInput[], __selection?: string): Promise<T & User[]>;
	editsToDoItem<T>(datas: ToDoItemInput[], __selection?: string): Promise<T & ToDoItem[]>;
}