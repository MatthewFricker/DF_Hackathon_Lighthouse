import Config from "./config/Config.js";
import Database from "./db/Database.js";
import AuthRoutes from "./routes/Auth.routes.js";
import Server from "./server/Server.js";
import Router from "./routes/Router.js";

Config.load();
const port = 4000; //for deployment on render
const {PORT, HOST, DB_URI } = process.env;

const router = new Router();
const authRouter = new AuthRoutes();

router.addRouter(authRouter);


const server = new Server(PORT, HOST, router);
const database = new Database(DB_URI);

server.start();
database.connect();