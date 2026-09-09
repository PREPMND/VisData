import { Router } from "express";

import {
    getAllInsights,
    getFilters,
    getDashboard,
} from "../controllers/insight.controller.js";

const router = Router();

router.get("/", getAllInsights);

router.get("/filters", getFilters);

router.get("/dashboard", getDashboard);

export default router;