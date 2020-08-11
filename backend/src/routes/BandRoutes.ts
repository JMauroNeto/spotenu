import { Router } from "express";
import { BandController } from "../controller/BandController";

const bandController = new BandController

export const BandRoutes = Router();

BandRoutes.get("/all", bandController.getAllBands);
BandRoutes.put("/approve", bandController.approveBand);