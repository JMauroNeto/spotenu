import { Request, Response } from "express";
import { BandBusiness } from "../business/BandBusiness";
import { Authenticator } from "../service/Authenticator";
import { BandDatabase } from "../data/BandDatabase";
import { BaseDatabase } from "../data/BaseDatabase";

export class BandController{
    private static BandBusiness = new BandBusiness(new Authenticator, new BandDatabase);

    public async getAllBands(req: Request, res: Response){
        try {
            const bands = await BandController.BandBusiness.getAllBands(req.headers.authorization);

            res.status(200).send({bands})
        } catch (error) {
            res.status(error.code || 400).send({message: error.message});
        }
        finally{
            await BaseDatabase.destroyConnection();
        }
    }

    public async approveBand(req: Request, res: Response){
        try {
            await BandController.BandBusiness.approveBand(req.headers.authorization, req.body.band_id)

            res.sendStatus(200);
        } catch (error) {
            res.status(error.code || 400).send({message: error.message});
        }
        finally{
            await BaseDatabase.destroyConnection();
        }
    }
}