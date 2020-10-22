import * as io from "socket.io";
import * as http from "http";
import { Application } from "express";
import { DiContainer } from "../injections";
import { authenticate, AuthenticationHandler, isAuthenticated } from "../auth";
import { IConnection } from "../models/IConnection";
import { ChatEventName } from "./messages";

export class Chat {
    private _server: io.Server;

    private connections: IConnection[] = [];

    start() {
        // const application: Application = DiContainer.inject("application");
        // const httpServer = http.createServer(application);
        // this._server = io(httpServer, {});
        this._server = io(5001, {});
        this._server.use(async (socket, next) => {
            const user = await this._getUser(socket);
            if (user) {
                next();
            } else {
                next(new Error("Not authorized"));
            }
        });
        this._server.on("connection", this.userConnected.bind(this));
    }

    private async _getUser(socket: io.Socket) {
        const auth = DiContainer.inject(AuthenticationHandler);
        const token = auth.decrypt(socket.handshake.query.authorization);
        const user = await auth.getUser(token);
        return user;
    }

    async userConnected(socket: io.Socket) {
        const user = await this._getUser(socket);

        const connection: IConnection = {
            socket,
            user,
        };
        this.connections.push(connection);
        socket.on("disconnect", () => {
            const index = this.connections.findIndex((c) => c === connection);
            console.log("found index", index);
            this.connections.splice(index, 1);
            console.log(this.connections.map((c) => c.user.id));
        });

        this._subscribeForMessages(connection);

        this._server.emit("log", "userconnected", {
            id: connection.user.id,
            username: connection.user.username,
        });
    }

    private _subscribeForMessages(connection: IConnection) {
        connection.socket.on(ChatEventName.ChatMessage, (message) => {
            this.messageRecieved(connection, message);
        });

        connection.socket.on(
            ChatEventName.GroupChange,
            (groupId: number | null) => {
                this.groupChangeRequested(connection, groupId);
            }
        );
    }

    messageRecieved(connection: IConnection, message: string) {
        this._server
            .in(`chat-group-${connection.groupId}`)
            .emit(
                ChatEventName.ChatMessage,
                message,
                connection.user.username,
                new Date()
            );
    }

    groupChangeRequested(connection: IConnection, groupId: number | null) {
        console.log("group change requested", groupId);
        if (connection.groupId) {
            connection.socket.leave(`chat-group-${connection.groupId}`);
        }
        connection.socket
            .join(`chat-group-${groupId}`)
            .emit(ChatEventName.GroupChanged);
        connection.groupId = groupId;
        console.log("group changed", connection.groupId);
    }
}
