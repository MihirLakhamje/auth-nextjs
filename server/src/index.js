import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});
import connectDB from "./db.js";
import {app} from "./app.js";

connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
}).catch((err) => {
  console.log(err);
});