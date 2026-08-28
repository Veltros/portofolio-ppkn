export default function ActivityCard({ activity, onOpenModal, isAdmin, onEdit, onDelete }) {
  const fallbackImage = "https://placehold.co/600x400/faf7f2/6b3e2e?text=Belum+Ada+Foto";
  const imageSrc = activity.image && activity.image.trim() !== '' ? activity.image : fallbackImage;

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col group">
      <div className="relative h-56 overflow-hidden">
        <img 
          src={imageSrc} 
          alt={activity.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = fallbackImage;
          }}
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-red-600 shadow-sm">
          Sila ke-{activity.sila}
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-medium text-gray-500">
            {activity.day}, {activity.date}
          </span>
        </div>
        
        <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
          {activity.title}
        </h3>
        
        <p className="text-sm font-medium text-red-600 mb-4">
          {activity.silaName}
        </p>
        
        <div className="mt-auto pt-4 border-t border-gray-100 flex flex-col gap-2">
          <button 
            onClick={() => onOpenModal(activity)}
            className="w-full text-center py-2 px-4 rounded-lg bg-gray-50 hover:bg-red-50 text-gray-700 hover:text-red-600 font-semibold transition-colors duration-200"
          >
            Lihat Detail
          </button>
          
          {isAdmin && (
            <div className="flex gap-2">
              <button 
                onClick={(e) => { e.stopPropagation(); onEdit(activity); }}
                className="w-1/2 py-2 px-4 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 font-semibold transition-colors duration-200 text-sm"
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
                className="w-1/2 py-2 px-4 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 font-semibold transition-colors duration-200 text-sm"
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
