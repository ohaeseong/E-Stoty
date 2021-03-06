import express, { Express } from 'express';
import HTTP from 'http';
import cors from 'cors';
import connectDB from './database/connection';
import RootRouter from './controllers';
import Container from 'typedi';

class Server {
    public app: Express;
    public server: HTTP.Server;

    constructor() {
        this.app = express();
        this.server = HTTP.createServer(this.app);
    }

    private setRouter() {
        this.app.use('/api', Container.get(RootRouter).getRouter());
    }

    private setMiddleware() {
        this.app.use(cors());
        this.app.use(express.json());
    }

    public async run(port: string) {
        await connectDB();

        this.setMiddleware();
        this.setRouter();

        try {
            this.server.listen(port, () => {
                console.log(`server listening to ${port}`);
            });
        } catch(error) {
            console.log(`[SERVER - RUN - ERROR] => ${error}`);
        }
    }
}

export default Server;
