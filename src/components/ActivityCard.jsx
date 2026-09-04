export default function ActivityCard({ activity, onOpenModal, isAdmin, onEdit, onDelete }) {
  const fallbackImage = "https://placehold.co/600x400/faf7f2/6b3e2e?text=Belum+Ada+Foto";
  const imageSrc = activity.image && activity.image.trim() !== '' ? activity.image : fallbackImage;

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 flex flex-col group">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={imageSrc} 
          alt={activity.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = fallbackImage;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
        <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm px-2.5 py-0.5 rounded-full text-xs font-semibold text-red-700 border border-red-100/50">
          Sila ke-{activity.sila}
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-gray-400">
            {activity.day}, {activity.date}
          </span>
        </div>
        
        <h3 className="font-heading text-lg font-bold text-gray-800 mb-2 line-clamp-2">
          {activity.title}
        </h3>
        
        <p className="text-xs font-medium text-red-600/80 mb-4">
          {activity.silaName}
        </p>
        
        <div className="mt-auto pt-4 border-t border-gray-100 flex flex-col gap-3">
          <button 
            onClick={() => onOpenModal(activity)}
            className="text-left text-sm text-red-700 hover:underline font-medium transition-all duration-200 w-max"
          >
            Lihat Detail
          </button>
          
          {isAdmin && (
            <div className="flex gap-2">
              <button 
                onClick={(e) => { e.stopPropagation(); onEdit(activity); }}
                className="py-1 px-3 rounded-md bg-blue-50/50 hover:bg-blue-50 text-blue-600 transition-colors duration-200 text-xs"
              >
                Edit
              </button>
              <button 
                onClick={(e) => { 
                  e.stopPropagation(); 
                  if (confirm('Yakin ingin menghapus kegiatan ini?')) {
                    onDelete(activity.id);
                  }
                }}
                className="py-1 px-3 rounded-md bg-red-50/50 hover:bg-red-50 text-red-600 transition-colors duration-200 text-xs"
              >
                Hapus
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
