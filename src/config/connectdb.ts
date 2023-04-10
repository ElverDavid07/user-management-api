import { connect, set } from "mongoose";
import { whiteBright, magenta } from "console-log-colors";

const connectdb = async () => {
 try {
  const DB_URI = <string>process.env.DB_URI;
  set("strictQuery", true);
  await connect(DB_URI);
  console.log(`${magenta("connect")} - ${whiteBright("conection successful database")}`);
 } catch (error) {
  console.log("ERROR_CONNECT_DATABASE", error);
 }
};

export { connectdb };
