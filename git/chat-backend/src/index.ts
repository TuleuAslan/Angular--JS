import { AuthenticationApi } from "./api/authentication.api";
import { GroupApi } from "./api/group.api";
import { UserApi } from "./api/user.api";
import { Server } from "./server";

const run = async () => {
    const server = new Server();

    await server.useApi("/user", UserApi);
    await server.useApi("/auth", AuthenticationApi);
    await server.useApi("/group", GroupApi);

    server.start();
};

run();
