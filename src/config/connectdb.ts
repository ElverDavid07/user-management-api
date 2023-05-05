import { connect, set } from "mongoose";
import { whiteBright, magentaBright } from "console-log-colors";

const prefix = magentaBright.bold("connect");
const connectdb = async () => {
 try {
  const DB_URI = <string>process.env.DB_URI;
  set("strictQuery", true);
  await connect(DB_URI);
  console.log(`${prefix} - ${whiteBright("conection successful database")}`);
 } catch (error) {
  console.log("ERROR_CONNECT_DATABASE", error);
 }
};

export { connectdb };
