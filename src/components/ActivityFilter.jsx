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
    <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-10">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => setFilter(filter.id)}
          className={`px-4 py-2 rounded-full text-sm md:text-base font-medium transition-all duration-300 ${
            currentFilter === filter.id
              ? 'bg-red-600 text-white shadow-md'
              : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
