export interface INewUser {
    name: string,
    account: string,
    password: string
}

export interface IDecodeToken {
    newUser?: INewUser,
    iat: number,
    axp: number
}