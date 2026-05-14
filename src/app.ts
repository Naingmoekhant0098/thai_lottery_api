import express from "express";
import cors from "cors";
import router from "./routes/route";
import { errorMiddleware, notFoundMiddleware } from "./middlewares";
import startJobs from "./jobs";
const app = express();
startJobs();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", router);
app.use(errorMiddleware);
app.use(notFoundMiddleware);

//firebase setup
// const serviceAccount = require("./serviceAccountKey.json");
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

export default app;
