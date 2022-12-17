import { ChangeEvent, FormEvent } from 'react';

export type InputChange = ChangeEvent<HTMLInputElement>;
export type FormSubmit = FormEvent<HTMLFormElement>;

export interface IParams {
    page: string,
    slug: string,
}

export interface IUserLogin {
    account: string,
    password: string,
}

export interface IUser extends IUserLogin {

    avatar: string,
    createAt: string,
    name: string,
    role: string,
    type: string,
    updateAt: string,
    _id: string,
}

