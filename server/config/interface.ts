import { Document } from "mongoose"

export interface IUser extends Document{
    name: string,
    account: string,
    password: string,
    avatar:string,
    role: string,
    type: string,
    _doc: object,
}

export interface INewUser {
    name: string,
    account: string,
    password: string
}

export interface IDecodeToken {
    id?: string,
    newUser: INewUser,
    iat: number,
    axp: number
}

export interface IGPayload {
    email: string,
    email_verified?: string,
    name: string,
    picture: string
}

export interface IUserParams{
    name: string,
    account: string,
    password: string,
    avatar?: string,
    type: string
}