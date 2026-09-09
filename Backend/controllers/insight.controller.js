import {
    getInsights,
    getFilterOptions,
    getDashboardData,
} from "../services/insight.service.js";

export const getAllInsights = async (req, res) => {
    try {
        const insights = await getInsights(req.query);

        return res.status(200).json({
            success: true,
            data: insights,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


export const getFilters = async (req, res) => {
    try {
        const filters = await getFilterOptions(req.query);

        return res.status(200).json({
            success: true,
            data: filters,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


export const getDashboard = async (req, res) => {
    try {
        const dashboardData = await getDashboardData(req.query);

        return res.status(200).json({
            success: true,
            data: dashboardData,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};