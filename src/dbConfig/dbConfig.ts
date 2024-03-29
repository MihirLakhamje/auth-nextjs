import mongoose from "mongoose";

export async function connect() {
	try {
		await mongoose.connect(process.env.MONGO_DB!);
		const connect = mongoose.connection;

		connect.on("connected",()=>{
			console.log("MongoDB connected")
		})

		connect.on("error", (error)=>{
			console.log("MONGODB connection error", error)
		})
	} catch (error) {
		console.log("MongoDB connection error", error)
	}
}