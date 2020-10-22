import { NextFunction, Request, Response, Router } from "express";
import { User } from "../models/User";
import { Api } from "./api";
import * as md5 from "md5";
import { DiContainer } from "../injections";
import { AuthenticationHandler } from "../auth";
import { UniqueConstraintError } from "sequelize";

export class AuthenticationApi extends Api {
    initialize() {}

    async register(username: string, password: string) {
        password = md5(password);
        const user = await User.create({
            username,
            password,
        });
        return user;
    }

    async login(username: string, password: string) {
        if (username == null || password == null) {
            throw new Error("400");
        }
        const user = await User.findOne({
            where: {
                username,
                password: md5(password),
            },
        });
        if (!user) {
            throw new Error("404");
        } else {
            const auth = DiContainer.inject(AuthenticationHandler);
            const token = auth.createToken(user);
            return {
                token: auth.encryptToken(token),
                validThrough: token.validThrough,
                userId: user.id,
                username: user.username,
            };
        }
    }

    private async _loginHandler(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const body = req.body;
        try {
            const result = await this.login(body.username, body.password);
            res.json(result);
        } catch (ex) {
            if (ex instanceof Error && ex.message === "404") {
                res.status(404).json({
                    errorTitle: "User not found",
                    errorMessage:
                        "Such username and password pair doesn't exist",
                });
            } else if (ex instanceof Error && ex.message === "400") {
                res.status(400).json({
                    errorTitle: "Wrong parameters",
                    errorMessage: "Request parameters is invalid",
                });
            }
        }
    }

    private async _registerHandler(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const user = await this.register(
                req.body.username,
                req.body.password
            );
            if (user) {
                this._loginHandler(req, res, next);
            }
        } catch (ex) {
            if (ex instanceof UniqueConstraintError) {
                res.status(409).json({
                    errorMessage: "User already exists",
                    errorTitle: "Error",
                });
            } else if (ex instanceof Error && ex.message === "404") {
                res.status(404).json({
                    errorTitle: "User not found",
                    errorMessage: "Such username and password pair isn't exist",
                });
            } else {
                res.status(500).json({
                    errorMessage: "Unhandled error",
                    errorTitle: "Error",
                });
            }
        }
    }

    async routing() {
        const router = Router();

        router.post("/login", this._loginHandler.bind(this));

        router.post("/register", this._registerHandler.bind(this));

        return router;
    }
}
