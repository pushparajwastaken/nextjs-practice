import mongoose, { mongo } from "mongoose";
export async function dbConnect() {
  try {
    await mongoose.connect(process.env.MONGO_URL!);
    //!-aaya kyuki mongoose ko connection ke liye string chahiye
    //we are telling mongoose that we are sure it is a string
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("Mongodb Connected");
    });
    connection.on("error", (error) => {
      console.log("Mongodb Connection error", error);
      process.exit(1);
    });
  } catch (error) {
    console.log("Something went wrong while connecting to db", error);
  }
}
