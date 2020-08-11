import { Router } from "express";
import { UserController } from "../controller/UserController";

const userController = new UserController

export const UserRoutes = Router();

UserRoutes.post("/signup", userController.signup);
UserRoutes.post("/login", userController.login);