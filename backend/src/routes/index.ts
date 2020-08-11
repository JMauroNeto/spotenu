import {Router} from 'express'
import { UserRoutes } from './userRoutes'
import { BandRoutes } from './BandRoutes';

export const routes = Router();

routes.use("/user", UserRoutes);
routes.use("/band", BandRoutes);