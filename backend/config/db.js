import mongoose from "mongoose";

export const connectDB = async () => {
	try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongonDB Connection: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Process code 1 code means exit with failure, 0 mean success
  }
}