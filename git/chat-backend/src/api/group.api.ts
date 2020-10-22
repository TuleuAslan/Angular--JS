import { Application, Router } from "express";
import {
    Group,
    GroupAttirbutes,
    GroupCreateAttributes,
    groupModelInit,
} from "../models/Group";
import { WhereOptions, UniqueConstraintError, json } from "sequelize";
import { Api } from "./api";
import * as md5 from "md5";
import { authenticate, AuthenticationHandler } from "../auth";

export class GroupApi extends Api {
    public async getAll(where?: WhereOptions<GroupAttirbutes>) {
        const group = await Group.findAll({ where });
        return group;
    }

    public async create(attributes: GroupCreateAttributes) {
        const group = await Group.create(attributes);
        return group;
    }

    public async get(id: number) {
        const group = await Group.findByPk(id);
        return group;
    }

    async routing() {
        const router = Router();

        router.use(authenticate());

        router.get("/", async (req, res) => {
            const groups = await this.getAll();
            res.json(groups);
        });

        router.get("/:id", async (req, res) => {
            const group = await this.get(+req.params.id);
            if (!group) {
                res.status(404).json({
                    errorTitle: "Group not found",
                    errorMessage: "Cannot find group with such id",
                });
            } else {
                res.json(group);
            }
        });

        router.delete("/:id", async (req, res) => {
            await Group.destroy({ where: { id: +req.params.id } });
            res.status(200).send("");
        });

        router.post("/", async (req, res) => {
            const model = req.body;
            try {
                const group = await this.create(model);
                res.json(group)
            } catch (ex) {
                if (ex instanceof UniqueConstraintError) {
                    res.status(409).json({
                        errorMessage: "Group already exists",
                        errorTitle: "Error",
                    });
                } else {
                    res.status(500).json({
                        errorMessage: "Unhandled error",
                        errorTitle: "Error",
                    });
                }
            }
        });

        return router;
    }

    protected async initialize() {
        groupModelInit(this._sequielize);
    }
}
