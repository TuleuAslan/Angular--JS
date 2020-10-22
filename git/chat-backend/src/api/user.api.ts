import { Application, Router } from "express";
import {
    User,
    UserAttirbutes,
    UserCreateAttributes,
    userModelInit,
} from "./../models/User";
import { WhereOptions, UniqueConstraintError } from "sequelize";
import { Api } from "./api";
import * as md5 from "md5";
import { authenticate, AuthenticationHandler } from "../auth";

export class UserApi extends Api {
    public async getAll(where?: WhereOptions<UserAttirbutes>) {
        const users = await User.findAll({ where });
        return users;
    }

    public async create(attributes: UserCreateAttributes) {
        const user = await User.create(attributes);
        return user;
    }

    public async get(id: number) {
        const user = await User.findByPk(id);
        return user;
    }

    async routing() {
        const router = Router();


        router.use(authenticate());

        router.get("/", async (req, res) => {
            const users = await this.getAll();
            res.json(users);
        });

        router.get("/:id", async (req, res) => {
            const user = await this.get(+req.params.id);
            if (!user) {
                res.status(404).json({
                    errorTitle: "User not found",
                    errorMessage: "Cannot find user with such id",
                });
            } else {
                res.json(user);
            }
        });

        return router;
    }

    protected async initialize() {
        userModelInit(this._sequielize);
    }
}
