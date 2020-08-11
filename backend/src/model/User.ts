import {InvalidParameterError} from '../error/InvalidParameterError'

export class User{
    public static stringToUserType(input: string): UserType{
        switch(input.toUpperCase()){
            case "NORMAL":
                return UserType.NORMAL
            case "SUBSCRIBER":
                return UserType.SUBSCRIBER
            case "ADMIN":
                return UserType.ADMIN
            case "BAND":
                return UserType.BAND
            default:
                throw new InvalidParameterError("Invalid user role")
        }
    }
}

export interface SignupDTO{
    name: string,
    email: string,
    password: string,
    nickname: string,
    type: string,
    description: string
}

export enum UserType{
    NORMAL = "NORMAL",
    SUBSCRIBER = "SUBSCRIBER",
    ADMIN = "ADMIN",
    BAND = "BAND"
}