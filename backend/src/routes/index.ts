import {Router} from 'express'
import { UserRoutes } from './userRoutes'

export const routes = Router();

routes.use("/user", UserRoutes);