import {
    findInsights,
    getDistinctValues,
    aggregateInsights,
} from "../repositories/insight.repository.js";

import { validateFilters } from "../validators/filter-query.validator.js";
import { buildFilterQuery } from "../utils/filter-query.js";

export const getInsights=async(filters)=>{
    const validatedFilters=validateFilters(filters);
    const query=buildFilterQuery(validatedFilters);

    return await findInsights(query);
};

export const getFilterOptions=async()=>{
    const fields =["end_year","topic","sector","region","pestle","source","swot","country","city",
    ];
    const options={};
    for(const field of fields){
        options[field]=await getDistinctValues(field);
    }
    return options;
};

export const getDashboardData =async(filters)=>{
    const validatedFilters=validateFilters(filters);
    const matchQuery=buildFilterQuery(validatedFilters);

    const pipeline=[
        {
            $match: matchQuery,
        },
        {
            $facet:{
                intensityByTopic:[
                    {
                        $match:{
                            topic:{$ne:""},
                            intensity:{$ne:null},
                        },
                    },
                    {
                        $group:{
                            _id:"$topic",
                            value:{$avg:"$intensity"},
                        },
                    },
                    {
                        $sort:{value:-1},
                    },
                ],
                relevanceByCountry:[
                    {
                        $match: {
                            country:{$ne:""},
                            relevance:{$ne:null },
                        },
                    },
                    {
                        $group:{
                            _id:"$country",
                            value:{$avg:"$relevance"},
                        },
                    },
                    {
                        $sort:{value:-1},
                    },
                ],
                likelihoodByRegion:[
                    {
                        $match:{
                            region:{$ne:""},
                            likelihood:{$ne:null},
                        },
                    },
                    {
                        $group:{
                            _id:"$region",
                            value:{$avg:"$likelihood"},
                        },
                    },
                    {
                        $sort:{value:-1},
                    },
                ],
                insightsByEndYear:[
                    {
                        $match:{
                            end_year:{$ne:""},
                        },
                    },
                    {
                        $group:{
                            _id:"$end_year",
                            count:{$sum:1},
                        },
                    },
                    {
                        $sort:{_id:1},
                    },
                ],
                insightsByRegion:[
                    {
                        $match:{
                            region:{$ne:""},
                        },
                    },
                    {
                        $group:{
                            _id: "$region",
                            count:{$sum:1},
                        },
                    },
                    {
                        $sort: { count: -1 },
                    },
                ],

                insightsByCountry: [
                    {
                        $match: {
                            country: { $ne: "" },
                        },
                    },
                    {
                        $group: {
                            _id: "$country",
                            count:{$sum:1},
                        },
                    },
                    {
                        $sort:{count:-1},
                    },
                ],
                insightsByCity:[
                    {
                        $match:{
                            city:{$ne:""},
                        },
                    },
                    {
                        $group:{
                            _id:"$city",
                            count:{$sum:1},
                        },
                    },
                    {
                        $sort:{count:-1},
                    },
                ],
            },
        },
    ];

    const result = await aggregateInsights(pipeline);

    return result[0];
};