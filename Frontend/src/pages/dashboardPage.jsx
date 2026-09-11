import { useDashboard } from "../hooks/useDashboard";
import { useFilters } from "../hooks/useFilters";
import { useDashboardFilters } from "../hooks/useDashboardFilters";

import FilterPanel from "../components/filters/panelFilter.jsx";
import IntensityByTopic from "../components/charts/intensityByTopic";
import RelevanceByCountry from "../components/charts/relevanceByCountry";
import LikelihoodByRegion from "../components/charts/likelyhoodByRegion";
import InsightsByYear from "../components/charts/insightByYear.jsx";

export default function Dashboard() {
    const {
        filters,
        setFilter,
        clearFilters,
    } = useDashboardFilters();

    const {
        filterOptions,
        loading: filtersLoading,
    } = useFilters();

    const {
        dashboardData,
        loading,
        error,
    } = useDashboard(filters);
    if (loading || filtersLoading) {
        return <h2>Loading...</h2>;
    }

    if (error) {
        return <h2>{error}</h2>;
    }

    return (
        <div className="p-2 md:p-6 bg-gray-50 overflow-x-hidden min-h-screen scrollbar-none!">
            <h1 className="text-2xl font-bold text-gray-900 text-center">Vis Data</h1>

            <FilterPanel
                filterOptions={filterOptions}
                filters={filters}
                setFilter={setFilter}
                clearFilters={clearFilters}
            />
            <InsightsByYear
            data={dashboardData?.insightsByEndYear}
            />
            <IntensityByTopic
                data={dashboardData?.intensityByTopic}
            />

            <RelevanceByCountry
                data={dashboardData?.relevanceByCountry}
            />
            <LikelihoodByRegion
                data={dashboardData?.likelihoodByRegion}
            />
        
        </div>
    );
}
            
       