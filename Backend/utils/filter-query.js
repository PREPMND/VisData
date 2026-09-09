export const buildFilterQuery = (filters) => {
    const query = {};

    const allowedFilters = ["end_year","topic","sector","region","pestle","source","swot","country","city",
    ];
    allowedFilters.forEach((field)=>{
        if(filters[field]){
            query[field] =filters[field];
        }
    });
    return query;
};