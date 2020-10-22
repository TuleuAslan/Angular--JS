import { User } from "./User";

import * as io from "socket.io";
export interface IConnection {
    user: User;
    socket: io.Socket;
    groupId?: number;
}
