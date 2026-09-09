import {
    fetchInsights,
    fetchFilters,
    fetchDashboard,
} from "../api/insight";

export const getInsights = async (filters = {}) => {
    const response = await fetchInsights(filters);
    return response.data.data;
};

export const getFilters = async () => {
    const response = await fetchFilters();
    return response.data.data;
};

export const getDashboardData = async (filters = {}) => {
    const response = await fetchDashboard(filters);

    return response.data.data;
};