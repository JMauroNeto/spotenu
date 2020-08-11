import {InvalidParameterError} from '../error/InvalidParameterError'

export class User{
    constructor(
        private id: string,
        private name: string,
        private email: string,
        private password: string,
        private nickname: string,
        private type: UserType,
        private description: string,
        private is_approved: boolean
    ){}

    public getId(){
        return this.id;
    }

    public getName(){
        return this.name;
    }

    public getEmail(){
        return this.email;
    }
    
    public getPassword(){
        return this.password;
    }

    public getNickname(){
        return this.nickname;
    }

    public getType(){
        return this.type;
    }

    public getDescription(){
        return this.description;
    }

    public getIsApproved(){
        return this.is_approved;
    }

    public static stringToUserType(input: string): UserType{
        switch(input.toUpperCase()){
            case "NORMAL":
                return UserType.NORMAL;
            case "SUBSCRIBER":
                return UserType.SUBSCRIBER;
            case "ADMIN":
                return UserType.ADMIN;
            case "BAND":
                return UserType.BAND;
            default:
                throw new InvalidParameterError("Invalid user role");
        }
    }

    public static dataToUserModel(user: any): User{
        const {id, name, email, password, nickname, type, description, is_approved} = user;

        return new User(id, name, email, password, nickname, User.stringToUserType(type), description, is_approved);
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

export interface LoginDTO{
    user: string,
    password: string
}

export enum UserType{
    NORMAL = "NORMAL",
    SUBSCRIBER = "SUBSCRIBER",
    ADMIN = "ADMIN",
    BAND = "BAND"
}