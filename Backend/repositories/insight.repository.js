import { Insight } from "../models/insight.schema.js";

export const findInsights=async(query)=>{
    return await Insight.find(query);
};
export const getDistinctValues=async(field)=>{
    return await Insight.distinct(field);
};

export const aggregateInsights =async(pipeline)=>{
    return await Insight.aggregate(pipeline);
};