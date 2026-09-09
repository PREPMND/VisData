import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import CustomSelect from "../../../lib/customSelect";

export default function LikelihoodByRegion({ data = [] }) {
    const [limit, setLimit] = useState(15);
    const [sortOrder, setSortOrder] = useState("desc");

    const chartData = data
        .map((item) => ({
            region: item._id || "Unknown",
            likelihood: item.value || 0,
        }))
        .sort((a, b) => sortOrder === "desc"
            ? b.likelihood - a.likelihood
            : a.likelihood - b.likelihood
        );

    const displayedData = limit === "all"
        ? chartData
        : chartData.slice(0, limit);

    return (
        <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-base font-bold text-gray-900 tracking-tight">Likelihood by Region</h2>
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
                    <BarChart data={displayedData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                        <defs>
                            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#4F46E5" stopOpacity={0.9} />
                                <stop offset="100%" stopColor="#818CF8" stopOpacity={0.3} />
                            </linearGradient>
                        </defs>
                        <XAxis
                            dataKey="region"
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
                        <Tooltip
                            cursor={{ fill: '#F3F4F6', opacity: 0.4 }}
                            contentStyle={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #E5E7EB", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)" }}
                            itemStyle={{ color: "#4F46E5", fontSize: "14px", fontWeight: "600" }}
                            labelStyle={{ color: "#1F2937", fontSize: "12px", fontWeight: "700", marginBottom: "4px" }}
                        />
                        <Bar
                            dataKey="likelihood"
                            fill="url(#barGradient)"
                            radius={[6, 6, 0, 0]}
                            maxBarSize={40}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}