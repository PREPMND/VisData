import { useState, useEffect } from "react";
import { getFilters } from "../services/insight.service";

export const useFilters = () => {
    const [filterOptions, setFilterOptions] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFilterOptions = async () => {
            try {
                setLoading(true);
                setError(null);

                const data = await getFilters();
                setFilterOptions(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchFilterOptions();
    }, []);

    return {
        filterOptions,
        loading,
        error,
    };
};