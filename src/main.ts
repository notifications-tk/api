import dotenv from "dotenv";
import { Generator } from "./generator";

import { Server } from "./server";

dotenv.config();

Generator.init();

const server: Server = new Server(process.env.PORT);
server.start();