import { Request, Response } from "express";
import { IdGenerator } from "../service/IdGenerator";
import { UserBusiness } from "../business/UserBusiness";
import { HashManager } from "../service/HashManager";
import { UserDatabase } from "../data/UserDatabase";
import { Authenticator } from "../service/Authenticator";
import { SignupDTO, LoginDTO } from "../model/User";
import { BaseDatabase } from "../data/BaseDatabase";

export class UserController{
    private static UserBusiness = new UserBusiness(new IdGenerator, new HashManager, new UserDatabase, new Authenticator)

    public async signup(req: Request, res: Response){
        try {
            const {name, email, password, nickname, type, description} = req.body;

            const input: SignupDTO = {
                name,
                email,
                password,
                nickname,
                type: type || "NORMAL",
                description
            }

            const response = await UserController.UserBusiness.signup(req.headers.authorization, input)
            
            if(response !== "User created successfully"){
                res.status(200).send({token: response});
            }
            else{
                res.status(200).send({message: response});
            }
        } catch (error) {
            res.status(error.code || 400).send({message: error.message})
        }
        finally{
            await BaseDatabase.destroyConnection();
        }
    }

    public async login(req: Request, res: Response){
        try {
            console.log(req.body);
            const {user, password} = req.body;

            const input: LoginDTO = {user, password}

            const token = await UserController.UserBusiness.login(input)

            res.status(200).send({token})
        } catch (error) {
            console.log(error);
            res.status(error.code || 400).send({message: error.message})
        }
        finally{
            await BaseDatabase.destroyConnection();
        }
    }

    public async verifyIfIsAdmin(req: Request, res: Response){
        try {
            const {authorization} = req.headers;

            await UserController.UserBusiness.verifyIfIsAdmin(authorization);

            res.sendStatus(200);
        } catch (error) {
            res.status(error.code || 400).send({message: error.message})
        }
    }
}