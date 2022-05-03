import express from "express"
import http from "http";
import { getLogger, Logger } from "log4js";

import routes from "./routes";

export class Server {
    private readonly app: express.Application;
    private readonly server: http.Server;
    private readonly logger: Logger;

    public constructor(private port?: string) {
        this.logger = getLogger();
        this.logger.level = "debug";

        // initialize express app
        this.app = express();
        this.initApp();

        // initialize http server
        this.server = http.createServer(this.app);

        this.logger.info("Server intialized");
    }

    private initApp(): void {
        this.app.use(routes);
    }

    public start(): void {
        if (!this.port) return this.logger.error("Missing configuration key `PORT` in .env");

        this.server.listen(this.port, () => {
            this.logger.info(`Running server on port ${this.port}`);
        });
    }
}