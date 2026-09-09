import apiClient from "./axios";

export const fetchInsights = (params) => {
    return apiClient.get("/insights", {
        params,
    });
};

export const fetchFilters = () => {
    return apiClient.get("/insights/filters");
};

export const fetchDashboard = (params) => {
    return apiClient.get("/insights/dashboard", {
        params,
    });
};