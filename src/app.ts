import "dotenv/config";
import helmet from "helmet";
import morgan from "morgan";
import express from "express";
import cors from "cors";
import userRoutes from "./routes/user";
import authRoutes from "./routes/auth";
import rolesRoutes from "./routes/roles";
import infoEmbarques from "./routes/infoEmbarque";
import { connectdb } from "./config/connectdb";
import { whiteBright, white, greenBright } from "console-log-colors";

const prefix = greenBright.bold("server") //? colors in console
const PORT = process.env.PORT || 3004;
const app = express();
//* middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(helmet());
app.use(morgan("dev"));
connectdb();
//* end point
app.use("/api", userRoutes);
app.use("/api", rolesRoutes);
app.use("/api", infoEmbarques);
app.use("/auth", authRoutes);
app.listen(PORT, () =>
 console.log(
  `${prefix} - ${white.bold("started server on")} ${whiteBright.underline(
   `http://localhost:${PORT}`
  )} `
 )
);
