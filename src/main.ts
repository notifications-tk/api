import dotenv from "dotenv";

import { Server } from "./server";

dotenv.config();

const server: Server = new Server(process.env.PORT);
server.start();