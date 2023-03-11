import { connect, set } from "mongoose";

const connectdb = async () => {
  try {
    const DB_URI = <string>process.env.DB_URI;
    set("strictQuery", true);
    await connect(DB_URI);
    console.log("conection successful database")
  } catch (error) {
    console.log("ERROR_CONNECT_DATABASE", error);
  }
};

export { connectdb };
