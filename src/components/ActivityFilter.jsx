export default function ActivityFilter({ currentFilter, setFilter }) {
  const filters = [
    { id: 0, label: 'Semua' },
    { id: 1, label: 'Sila 1' },
    { id: 2, label: 'Sila 2' },
    { id: 3, label: 'Sila 3' },
    { id: 4, label: 'Sila 4' },
    { id: 5, label: 'Sila 5' },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => setFilter(filter.id)}
          className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 border ${
            currentFilter === filter.id
              ? 'bg-red-100 border-red-200 text-red-700'
              : 'bg-transparent border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
