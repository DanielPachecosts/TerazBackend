import express from "express";
import config from "./config";
import { routerApi } from "./router-index";
import dbConnection from "./database/mongo-config";
import cors from "cors";

async function bootstrap() {
  const app = express();
  const PORT = config.port;

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use("/app", express.static("public"));

  routerApi(app);

  app.get("/ping", (_, res) => {
    res.status(200).send({ message: "pong!!" });
  });

  await dbConnection(
    config.dbConnection,
    config.dbHost,
    config.dbUser,
    config.dbPassword,
    config.dbName
  );

  app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
  });
}

bootstrap();
