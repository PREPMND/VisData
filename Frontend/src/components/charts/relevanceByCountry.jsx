import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import CustomSelect from "../../../lib/customSelect";

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-3 border border-gray-100 rounded-xl shadow-sm">
                <p className="text-xs font-bold text-gray-500 mb-0.5">{label || "Unknown Country"}</p>
                <p className="text-sm font-semibold text-indigo-600">
                    Relevance: <span className="font-bold">{payload[0].value}</span>
                </p>
            </div>
        );
    }
    return null;
};

export default function RelevanceByCountry({ data = [] }) {
    const [limit, setLimit] = useState(15);
    const [sortOrder, setSortOrder] = useState("desc");

    const chartData = data
        .map((item) => ({
            country: item._id || "Unknown",
            relevance: item.value || 0,
        }))
        .sort((a, b) => sortOrder === "desc"
            ? b.relevance - a.relevance
            : a.relevance - b.relevance
        );

    const displayedData = limit === "all"
        ? chartData
        : chartData.slice(0, limit);

    return (
        <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-base font-bold text-gray-900 tracking-tight">Relevance by Country</h2>
                <div className="flex gap-2">
                    <CustomSelect
                        value={limit}
                        onChange={(value) => setLimit(value === "all" ? "all" : Number(value))}
                        options={[
                            { value: 10, label: "Top 10" },
                            { value: 15, label: "Top 15" },
                            { value: "all", label: "All" },
                        ]}
                    />

                    <CustomSelect
                        value={sortOrder}
                        onChange={setSortOrder}
                        options={[
                            { value: "desc", label: "Highest first" },
                            { value: "asc", label: "Lowest first" },
                        ]}
                    />
                </div>
            </div>
            <div className="w-full h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={displayedData} margin={{ top: 10, right: 10, left: -25, bottom: 0, roundedCorners: true }}>
                        <defs>
                            <linearGradient id="relevanceGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#4F46E5" stopOpacity={0.9} />
                                <stop offset="100%" stopColor="#818CF8" stopOpacity={0.3} />
                            </linearGradient>
                        </defs>
                        <XAxis
                            dataKey="country"
                            stroke="#9CA3AF"
                            fontSize={11}
                            fontWeight={500}
                            tickLine={false}
                            axisLine={false}
                            dy={10}
                        />
                        <YAxis
                            stroke="#9CA3AF"
                            fontSize={11}
                            fontWeight={500}
                            tickLine={false}
                            axisLine={false}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={false} />
                        <Bar
                            dataKey="relevance"
                            fill="url(#relevanceGradient)"
                            radius={[6, 6, 0, 0]}
                            maxBarSize={32}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}