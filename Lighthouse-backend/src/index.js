import Config from "./config/Config.js";
import Database from "./db/Database.js";
import Server from "./server/Server.js";

import Router from "./routes/Router.js";
import AuthRoutes from "./routes/Auth.routes.js";
import LLMRoutes from "./routes/LLM.routes.js";

Config.load();
const { PORT, HOST, DB_URI } = process.env;

const router = new Router();
const authRouter = new AuthRoutes();
const llmRouter = new LLMRoutes();

router.addRouter(authRouter);
router.addRouter(llmRouter);

const server = new Server(PORT, HOST, router);
const database = new Database(DB_URI);

server.start();
database.connect();
