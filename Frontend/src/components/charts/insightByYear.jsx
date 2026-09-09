import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-3 border border-gray-100 rounded-xl shadow-sm">
                <p className="text-xs font-bold text-gray-500 mb-0.5">Year: {label}</p>
                <p className="text-sm font-semibold text-teal-600">Insights: <span className="font-bold">{payload[0].value}</span></p>
            </div>
        );
    }
    return null;
};

export default function InsightsByYear({ data }) {
    // Dynamic fallback checking for common API distribution object naming conventions
    const rawData = Array.isArray(data) ? data : [];
    
    if (rawData.length === 0) {
        return (
            <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
                <h2 className="text-base font-bold text-gray-900 tracking-tight mb-6">Insights distribution by Year</h2>
                <div className="w-full h-[300px] flex items-center justify-center text-sm text-gray-400 font-medium bg-gray-50/50 rounded-xl border border-dashed border-gray-200">
                    No year-based records found in dashboard response
                </div>
            </div>
        );
    }

    const chartData = rawData.map((item) => ({
        year: item._id || "Unknown",
        count: item.value || item.count || item.intensity || 0,
    })).sort((a, b) => String(a.year).localeCompare(String(b.year)));

    return (
        <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
            <h2 className="text-base font-bold text-gray-900 tracking-tight mb-6">Insights distribution by Year</h2>
            <div className="w-full h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                        <defs>
                            <linearGradient id="yearGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#14B8A6" stopOpacity={0.4} />
                                <stop offset="100%" stopColor="#14B8A6" stopOpacity={0.0} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="year" stroke="#9CA3AF" fontSize={11} fontWeight={500} tickLine={false} axisLine={false} dy={10} />
                        <YAxis stroke="#9CA3AF" fontSize={11} fontWeight={500} tickLine={false} axisLine={false} />
                        <Tooltip content={<CustomTooltip />} />
                        <Area type="monotone" dataKey="count" stroke="#14B8A6" strokeWidth={2.5} fill="url(#yearGradient)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
