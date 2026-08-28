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

  // Hanya tampilkan kegiatan yang memiliki foto valid (dan tidak gagal load)
  const activitiesWithPhotos = activities.filter(
    a => a.image && a.image.trim() !== '' && !failedImageIds.has(a.id)
  );

  return (
    <section id="dokumentasi" className="py-20 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Galeri Dokumentasi</h2>
          <div className="w-24 h-1 bg-red-600 mx-auto mt-4 rounded-full"></div>
        </div>

        {activitiesWithPhotos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {activitiesWithPhotos.map((activity) => (
              <div 
                key={activity.id}
                className="group relative h-64 rounded-xl overflow-hidden cursor-pointer"
                onClick={() => setSelectedImage(activity)}
              >
                <img 
                  src={activity.image} 
                  alt={activity.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={() => handleImageError(activity.id)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <span className="text-white text-sm font-medium bg-red-600 px-2 py-1 rounded w-max mb-2">
                    Sila {activity.sila}
                  </span>
                  <p className="text-white font-medium line-clamp-2 text-sm">{activity.title}</p>
                  <p className="text-gray-300 text-xs mt-1">{activity.date}</p>
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

      {/* Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90">
          <button 
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white hover:text-red-500 transition-colors z-50 p-2"
          >
            <X size={32} />
          </button>
          
          <div className="relative max-w-5xl w-full">
            <img 
              src={selectedImage.image} 
              alt={selectedImage.title}
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            />
            <div className="mt-4 text-white text-center">
              <h4 className="text-xl font-bold">{selectedImage.title}</h4>
              <p className="text-gray-300 mt-2">Sila ke-{selectedImage.sila}: {selectedImage.silaName} • {selectedImage.date}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
