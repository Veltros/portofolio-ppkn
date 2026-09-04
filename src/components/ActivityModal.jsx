import { X } from 'lucide-react';

export default function ActivityModal({ activity, onClose }) {
  if (!activity) return null;

  const fallbackImage = "https://placehold.co/800x600/faf7f2/6b3e2e?text=Belum+Ada+Foto";
  const imageSrc = activity.image && activity.image.trim() !== '' ? activity.image : fallbackImage;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>
      
      <div className="relative bg-white rounded-3xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200 flex flex-col md:flex-row">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-1.5 bg-white/50 hover:bg-white rounded-full text-gray-500 hover:text-gray-800 transition-colors shadow-sm md:top-6 md:right-6"
        >
          <X size={20} />
        </button>
        
        <div className="w-full md:w-1/2 h-64 md:h-auto min-h-[300px] md:min-h-[400px]">
          <img 
            src={imageSrc} 
            alt={activity.title} 
            className="w-full h-full object-cover md:rounded-l-3xl"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = fallbackImage;
            }}
          />
        </div>
        
        <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col">
          <div className="inline-block px-2.5 py-1 bg-red-50 text-red-700 border border-red-100 rounded-full text-xs font-semibold w-max mb-5">
            Sila ke-{activity.sila}
          </div>
          
          <h3 className="font-heading text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            {activity.title}
          </h3>
          
          <div className="text-sm text-gray-400 mb-8">
            {activity.day}, {activity.date}
          </div>
          
          <div className="mb-6">
            <h4 className="text-xs font-semibold text-gray-500 mb-1">Nilai yang Diterapkan</h4>
            <p className="text-base font-medium text-red-700">
              {activity.silaName}
            </p>
          </div>
          
          <div>
            <h4 className="text-xs font-semibold text-gray-500 mb-2">Penjelasan</h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              {activity.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
