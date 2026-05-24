import mongoose from "mongoose";
import dns from "dns";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};
console.log(connection);

dns.setServers(["1.1.1.1", "8.8.8.8"]);
console.log("Custom DNS Servers configured successfully");

const connectDB = async (): Promise<void> => {
  if (connection.isConnected) {
    console.log("Already connected to database");
    return;
  }

  try {
    const mongoURI = process.env.MONGODB_URI;

    if (!mongoURI) {
      throw new Error("MONGODB_URI not defined");
    }

    const db = await mongoose.connect(mongoURI || "");
    console.log(db);

    connection.isConnected = db.connections[0].readyState;

    console.log(`DB connected Successfully: ${db.connection.host}`);
  } catch (error) {
    console.log("Database connection failed", error);
    // process.exit(1);
    throw new Error("Database connection failed");
  }
};

export default connectDB;
