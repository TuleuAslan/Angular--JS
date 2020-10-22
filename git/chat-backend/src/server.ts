import * as express from "express";
import { UserApi } from "./api/user.api";
import { Sequelize } from "sequelize";
import { Api } from "./api/api";
import * as bodyParser from "body-parser";
import { DiContainer } from "./injections";
import { AuthenticationHandler, Token } from "./auth";
import * as cors from "cors";
import { Chat } from "./chat/chat";

export class Server {
    private _app: express.Application;
    private _auth: AuthenticationHandler = new AuthenticationHandler();
    private _sequelize: Sequelize;
    private _chat: Chat

    constructor() {
        this.init();
    }

    init() {
        DiContainer.register(Server, this);

        this._app = express();
        DiContainer.register("application", this._app);

        this._sequelize = new Sequelize({
            host: "remotemysql.com",
            username: "IfS9Eeulgn",
            database: "IfS9Eeulgn",
            password: "7cMOLdUwzm",
            dialect: "mysql",
        });
        DiContainer.register("sequilize", this._sequelize);

        this._auth = new AuthenticationHandler();
        DiContainer.register(AuthenticationHandler, this._auth);

        this._app.use(bodyParser.json());
        this._app.use(cors());

        this._chat = new Chat();
        DiContainer.register(Chat, this._chat);
        this._chat.start();
    }

    async useApi(route: string, api: { new (sequelize: Sequelize): Api }) {
        const apiInstance = new api(this._sequelize);
        DiContainer.register(api, apiInstance);

        const routing = await apiInstance.routing();

        this._app.use(route, routing);
    }

    start() {
        this._app.listen(5000, () => {
            console.log("Api is listeninig on http://localhost:5000");
            console.log("socket.io is listeninig on http://localhost:5001/socket.io");
        });
    }
}
