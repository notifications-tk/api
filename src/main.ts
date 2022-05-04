import dotenv from "dotenv";
import { getLogger, Logger } from "log4js";

import { Generator } from "./generator";
import { Server } from "./server";

dotenv.config();

Generator.init()
    .then(() => {
        const logger: Logger = getLogger();
        logger.level = "debug";

        logger.info("Generator initialized");

        const server: Server = new Server(logger, process.env.PORT);
        server.start();
    });