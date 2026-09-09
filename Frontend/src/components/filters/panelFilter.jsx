export default function FilterPanel({
    filterOptions,
    filters,
    setFilter,
    clearFilters,
}) {
    const filterFields = ["end_year", "topic", "sector", "region", "pestle", "source", "swot", "country", "city"];
    return (
        <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800 tracking-tight">Filters</h2>
                <button onClick={clearFilters} className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors cursor-pointer">
                    Clear Filters
                </button>
            </div>
            <div className="grid grid-cols-1 .filter-scroll sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-9 gap-4">
                {filterFields.map((field) => (
                    <div key={field} className="flex flex-col gap-1.5">
                        <label className={`text-xs font-bold text-gray-500 tracking-wider ${field === 'swot' || field === 'pestle' ? 'uppercase' : 'capitalize'}`}>
                            {field.replace('_', ' ')}
                        </label>
                        <select
                            value={filters[field] || ""}
                            onChange={(e) => setFilter(field, e.target.value)}
                            className="w-full px-3 py-2 text-sm filter-scroll  text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all cursor-pointer appearance-none"
                            style={{
                                backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://w3.org' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236B7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`,
                                backgroundPosition: 'right 0.5rem center',
                                backgroundSize: '1.25rem',
                                backgroundRepeat: 'no-repeat',
                                paddingRight: '2rem'
                            }}
                        >
                            <option value="" >All</option>
                            {filterOptions[field]?.filter((value) => value).map((value) => (
                                <option key={value} value={value}>
                                    {value}
                                </option>
                            ))}
                        </select>
                    </div>
                ))}
            </div>
        </div>
    );
}