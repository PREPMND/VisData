export const validateFilters = (filters) => {
    const allowedFilters = ["end_year","topic","sector","region","pestle","source","swot","country","city",
    ];
    const validatedFilters = {};
    allowedFilters.forEach((field)=>{
        if(filters[field]){
            validatedFilters[field]=filters[field];
        }
    });

    return validatedFilters;
};