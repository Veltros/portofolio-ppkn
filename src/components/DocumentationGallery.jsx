'use client';
import { useState } from 'react';
import { useActivities } from '../hooks/useActivities';
import { X } from 'lucide-react';

export default function DocumentationGallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [failedImageIds, setFailedImageIds] = useState(new Set());
  const { activities } = useActivities();

  const handleImageError = (id) => {
    setFailedImageIds((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  const activitiesWithPhotos = activities.filter(
    a => a.image && a.image.trim() !== '' && !failedImageIds.has(a.id)
  );

  return (
    <section id="dokumentasi" className="py-20 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-medium text-gray-900 mb-2">Galeri Dokumentasi</h2>
          <div className="flex items-center justify-center gap-2 opacity-60 mt-4">
             <div className="w-12 h-px bg-red-800/30"></div>
             <div className="w-1.5 h-1.5 rounded-full bg-red-800/40"></div>
             <div className="w-12 h-px bg-red-800/30"></div>
          </div>
        </div>

        {activitiesWithPhotos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {activitiesWithPhotos.map((activity) => (
              <div 
                key={activity.id}
                className="group relative h-56 rounded-2xl overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
                onClick={() => setSelectedImage(activity)}
              >
                <img 
                  src={activity.image} 
                  alt={activity.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={() => handleImageError(activity.id)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <span className="text-white text-[10px] uppercase tracking-wider font-medium bg-red-800/80 backdrop-blur-sm px-2 py-1 rounded w-max mb-2">
                    Sila {activity.sila}
                  </span>
                  <p className="text-white font-medium line-clamp-2 text-sm">{activity.title}</p>
                  <p className="text-white/70 text-xs mt-1">{activity.date}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500 text-lg">Belum ada dokumentasi foto.</p>
          </div>
        )}
      </div>

      {selectedImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm">
          <button 
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-50 p-1"
          >
            <X size={24} />
          </button>
          
          <div className="relative max-w-5xl w-full">
            <img 
              src={selectedImage.image} 
              alt={selectedImage.title}
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg shadow-2xl"
            />
            <div className="mt-6 text-white text-center">
              <h4 className="text-2xl font-heading font-medium text-white/90">{selectedImage.title}</h4>
              <p className="text-white/60 mt-2 text-sm tracking-wide">Sila ke-{selectedImage.sila}: {selectedImage.silaName} &bull; {selectedImage.date}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
