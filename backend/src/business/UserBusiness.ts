import { SignupDTO, User, UserType, LoginDTO } from "../model/User";
import { InvalidParameterError } from "../error/InvalidParameterError";
import { IdGenerator } from "../service/IdGenerator";
import { HashManager } from "../service/HashManager";
import { UserDatabase } from "../data/UserDatabase";
import { Authenticator } from "../service/Authenticator";
import { UnauthorizedError } from "../error/UnauthorizedError";
import { NotFoundError } from "../error/NotFoundError";

export class UserBusiness{
    constructor(
        private idGenerator: IdGenerator,
        private hashManager: HashManager,
        private userDatabase: UserDatabase,
        private authenticator: Authenticator
    ){}

    public async signup(token: string, input: SignupDTO){
        const {name, email, password, nickname, type, description} = input;

        const userType = User.stringToUserType(type);

        if(!name || !password || !nickname || (userType === UserType.BAND && !description)){
            throw new InvalidParameterError("Missing parameters");
        }

        if(name.trim() === "" || password.trim() === "" || nickname.trim()==="" || (userType === UserType.BAND && description.trim()==="")){
            throw new InvalidParameterError("You can't send blank parameters");
        }

        if(userType !== UserType.BAND && description){
            throw new InvalidParameterError("You can't send description if you're not a band");
        }

        if(userType === UserType.ADMIN){
            const isAdmin = this.verifyIfIsAdmin(token);

            if(!isAdmin){
                throw new UnauthorizedError("Only admins can register other admins");
            }

            if(password.length<10){
                throw new InvalidParameterError("Minimum password length for admin is 10 characters");
            }
        } else{
            if(password.length<6){
                throw new InvalidParameterError("Minimum password length is 6 characters");
            }
        }

        const id = this.idGenerator.generate();

        const hashedPassword = await this.hashManager.hash(password);

        await this.userDatabase.signup(id, name, email, hashedPassword, nickname, type, description);

        if(userType !== UserType.ADMIN && userType !== UserType.BAND){
            const newToken = this.authenticator.generateToken({id});

            return newToken;
        }
        
        return "User created successfully";
        
    }

    public async login(input: LoginDTO){
        const {user, password} = input;

        if(!user || !password){
            throw new InvalidParameterError("Missing parameters");
        }

        const userData = await this.userDatabase.getUserByTerm(user);

        if(!userData){
            throw new NotFoundError("User not found");
        }

        if(userData.getType()=== UserType.BAND && !userData.getIsApproved()){
            throw new UnauthorizedError("Band not approved yet!");
        }

        const isValidPassword = await this.hashManager.compare(password, userData.getPassword());

        if(!isValidPassword){
            throw new UnauthorizedError("Invalid credentials");
        }

        const token = this.authenticator.generateToken({id: userData.getId()});

        return token;
    }

    public async verifyIfIsAdmin(token: string){
        const tokenData = this.authenticator.getData(token);

        const userData = await this.userDatabase.getUserById(tokenData.id);

        return userData.getType() === UserType.ADMIN;
    }
}