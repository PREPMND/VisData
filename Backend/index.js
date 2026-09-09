import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();

import {connectDB} from "./db/connect.js";
await connectDB();


import {appBoundMiddleWare} from "./middlewares/app-bound.middleware.js";
appBoundMiddleWare(app);


import insightRoutes from "./routes/insight.route.js";
app.use("/api/insights", insightRoutes);


const PORT = process.env.PORT || 8000;
app.listen(PORT, (req,res) => {  
    console.log(`Server is running on port ${PORT}`)
})

app.get("/", (req, res) => {
    res.send();
});
