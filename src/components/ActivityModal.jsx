import { X } from 'lucide-react';

export default function ActivityModal({ activity, onClose }) {
  if (!activity) return null;

  const fallbackImage = "https://placehold.co/800x600/faf7f2/6b3e2e?text=Belum+Ada+Foto";
  const imageSrc = activity.image && activity.image.trim() !== '' ? activity.image : fallbackImage;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>
      
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 hover:bg-white rounded-full text-gray-800 transition-colors"
        >
          <X size={24} />
        </button>
        
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 h-64 md:h-auto min-h-[300px]">
            <img 
              src={imageSrc} 
              alt={activity.title} 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = fallbackImage;
              }}
            />
          </div>
          
          <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col">
            <div className="inline-block px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-bold w-max mb-4">
              Sila ke-{activity.sila}
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {activity.title}
            </h3>
            
            <div className="text-gray-500 font-medium mb-6">
              {activity.day}, {activity.date}
            </div>
            
            <div className="mb-6">
              <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">Nilai yang Diterapkan</h4>
              <p className="text-lg font-medium text-red-600 bg-red-50 p-3 rounded-lg">
                {activity.silaName}
              </p>
            </div>
            
            <div>
              <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">Penjelasan</h4>
              <p className="text-gray-700 leading-relaxed">
                {activity.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
