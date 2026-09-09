import { useState, useEffect } from "react";
import { getInsights } from "../services/insight.service";

export const useInsights = (filters = {}) => {
    const [insights, setInsights] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                const data = await getInsights(filters);
                setInsights(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [JSON.stringify(filters)]);

    return {
        insights,
        loading,
        error,
    };
};