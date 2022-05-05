import express from "express";
import { routes } from "./routes";
import cors from "cors";
const app = express();

app.use(cors()); //Proteção do acesso ao consumo

app.use(express.json()); //Express reconhecer o corpo json do request

app.use(routes);

app.listen(3333, () => {
  console.log("HTTP server running :)");
});
