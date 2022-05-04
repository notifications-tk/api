import express from "express"
import http from "http";
import { Logger } from "log4js";

import routes from "./routes";

export class Server {
    private readonly app: express.Application;
    private readonly server: http.Server;

    public constructor(private readonly logger: Logger, private readonly port?: string) {
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