import { BaseDatabase } from "./BaseDatabase"
import { BandResumeDTO } from '../model/Band'
import { BandBusiness } from "../business/BandBusiness";
import { User } from "../model/User";

export class BandDatabase extends BaseDatabase{
    public async getAllBands(): Promise<BandResumeDTO[]>{
        try {
            const bands = await this.getConnection().select('name', 'email', 'nickname','is_approved').from(process.env.USER_DB_NAME).where({type: "BAND"});

            if(bands.length > 0){
                return bands;
            }
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    public async getBandById(id: string): Promise<User>{
        try {
            const band = await this.getConnection().select('*').from(process.env.USER_DB_NAME).where({id});

            if(band.length > 0){
                return User.dataToUserModel(band[0]);
            }
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    public async approveBandById(id: string): Promise<void>{
        try {
            await this.getConnection().update({is_approved: 1}).from(process.env.USER_DB_NAME).where({id});
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
}