import { useState, useEffect } from "react";
import { getDashboardData } from "../services/insight.service";

export const useDashboard = (filters = {}) => {
    const [dashboardData, setDashboardData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                setLoading(true);
                setError(null);

                const data = await getDashboardData(filters);
                setDashboardData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboard();
    }, [JSON.stringify(filters)]);
    return {
        dashboardData,
        loading,
        error,
    };
};