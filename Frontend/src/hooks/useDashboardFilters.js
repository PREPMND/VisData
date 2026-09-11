import { useState } from "react";

export const useDashboardFilters=()=>{
    const [filters, setFilters]=useState({});

    const setFilter=(name,value)=>{
        setFilters((prev)=>{
            const updatedFilters={ ...prev };
            if(!value){
                delete updatedFilters[name];
            }else{
                updatedFilters[name]=value;
            }
            return updatedFilters;
        });
    };

    const clearFilters=()=>{
        setFilters({});
    };

    return {
        filters,
        setFilter,
        clearFilters,
    };
};