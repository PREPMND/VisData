import mongoose from "mongoose";
import dotenv from "dotenv";
import { Insight } from "../models/insight.schema.js";
import data from "../data/jsondata.json" with { type: "json" };
import dns from "dns";
dotenv.config({ path: "../.env" });

dns.setServers(["8.8.8.8", "1.1.1.1"]);
const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        await Insight.deleteMany({});
        await Insight.insertMany(data);
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedData();