import { DiContainer } from "./injections";
import { User } from "./models/User";
import * as moment from "moment";
import { RequestHandler, Request } from "express";
import * as http from "http";

export interface Token {
    username: string;
    password: string;
    validThrough: Date;
}

export class AuthenticationHandler {
    constructor() {}

    async checkUser(token: string, skipSplit = false) {
        let tokenString = "";
        if (skipSplit) {
            tokenString = token;
        } else {
            const parts = token.split(" ");
            if (parts.length != 2 || parts[0].toLowerCase() != "basic") {
                return false;
            }
            tokenString = parts[1];
        }

        const parsedToken = this.decrypt(tokenString);

        if (moment().isAfter(moment(parsedToken.validThrough))) {
            return false;
        }

        const user = this.getUser(parsedToken);

        return user != null;
    }

    async getUser(token: Token) {
        return await User.findOne({
            where: {
                username: token.username,
                password: token.password,
            },
        });
    }

    decrypt(token: string) {
        return JSON.parse(Buffer.from(token, "base64").toString("utf-8"));
    }

    createToken(user: User): Token {
        const validThrough = moment().add(6, "h").toDate();

        const token: Token = {
            validThrough,
            password: user.password,
            username: user.username,
        };
        return token;
    }

    encryptToken(token: Token) {
        return Buffer.from(JSON.stringify(token)).toString("base64");
    }
}

export async function isAuthenticated(
    req: http.IncomingMessage,
    token?: string,
    auth?: AuthenticationHandler
) {
    if (!auth) {
        auth = DiContainer.inject(AuthenticationHandler);
    }

    if (token) {
        return token && (await auth.checkUser(token, true));
    }

    token = req.headers.authorization;
    try {
        if (token && (await auth.checkUser(token))) {
            return true;
        }
    } catch (ex) {}
    return false;
}

export function authenticate(): RequestHandler {
    const auth = DiContainer.inject(AuthenticationHandler);
    return async (req, res, next) => {
        if (await isAuthenticated(req, null, auth)) {
            next();
        } else {
            res.status(401).json({
                errorTitle: "Error",
                errorMessage: "You are not authorized",
            });
        }
    };
}
