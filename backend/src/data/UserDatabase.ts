import { BaseDatabase } from "./BaseDatabase";
import { User } from "../model/User";

export class UserDatabase extends BaseDatabase{
    public async signup(id: string, name: string, email: string, password: string, nickname: string, type: string, description: string): Promise<void>{
        try {
            await this.getConnection().insert({id, name, email, password, nickname, type, description}).into(process.env.USER_DB_NAME);
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    public async getUserByTerm(term: string): Promise<User>{
        try {
            const user = await this.getConnection().select('*').from(process.env.USER_DB_NAME).where("nickname", "=", term).orWhere("email", "=", term)

            if(user.length > 0){
                return User.dataToUserModel(user[0]);
            }
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    public async getUserById(id: string): Promise<User>{
        try {
            const user = await this.getConnection().select('*').from(process.env.USER_DB_NAME).where({id})

            if(user.length > 0){
                return User.dataToUserModel(user[0]);
            }
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
}