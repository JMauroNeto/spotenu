import { Authenticator } from "../service/Authenticator";
import { User, UserType } from "../model/User";
import { UnauthorizedError } from "../error/UnauthorizedError";
import { BandDatabase } from "../data/BandDatabase";
import { NotFoundError } from "../error/NotFoundError";
import { InvalidParameterError } from "../error/InvalidParameterError";

export class BandBusiness{
    constructor(
        private authenticator: Authenticator,
        private bandDatabase: BandDatabase
    ){}

    public async getAllBands(token: string){
        const userData = this.authenticator.getData(token)

        if(User.stringToUserType(userData.type) !== UserType.ADMIN){
            throw new UnauthorizedError("Only admins can access this option.");
        }

        const bands = await this.bandDatabase.getAllBands();

        if(!bands){
            throw new NotFoundError("We didn't found bands");
        }

        return bands;
    }

    public async approveBand(token: string, band_id: string){
        const userData = this.authenticator.getData(token)

        if(User.stringToUserType(userData.type) !== UserType.ADMIN){
            throw new UnauthorizedError("Only admins can access this option.");
        }

        const band = await this.bandDatabase.getBandById(band_id);

        if(!band){
            throw new NotFoundError("We didn't found band with this id.");
        }

        if(band.getType() !== UserType.BAND){
            throw new InvalidParameterError("This id does not belong to a band");
        }

        await this.bandDatabase.approveBandById(band_id);
    }
}