'use client';
import { useState } from 'react';
import { CalendarDays, Plus, X, Edit, Trash2 } from 'lucide-react';
import { useReflections } from '../hooks/useReflections';
import { useAuth } from '../hooks/useAuth';

export default function Reflection() {
  const { reflections, addReflection, updateReflection, deleteReflection } = useReflections();
  const { isAdmin } = useAuth();
  
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [formData, setFormData] = useState({
    month: '',
    focus: '',
    content: ''
  });

  const handleEdit = (ref) => {
    setIsEditing(true);
    setCurrentId(ref.id);
    setFormData({ month: ref.month, focus: ref.focus, content: ref.content });
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      updateReflection(currentId, formData);
    } else {
      addReflection(formData);
    }
    setShowForm(false);
    setIsEditing(false);
    setCurrentId(null);
    setFormData({ month: '', focus: '', content: '' });
  };

  return (
    <section id="refleksi" className="py-20 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Jurnal Refleksi <span className="text-red-600">Bulanan</span></h2>
          <div className="w-24 h-1 bg-red-600 mx-auto mt-4 rounded-full"></div>
          <p className="text-gray-600 mt-6 max-w-2xl mx-auto">
            Catatan perkembangan diri dan evaluasi dalam menerapkan nilai-nilai luhur Pancasila setiap bulannya.
          </p>

          {isAdmin && (
            <button 
              onClick={() => {
                setIsEditing(false);
                setFormData({ month: '', focus: '', content: '' });
                setShowForm(true);
              }}
              className="mt-6 inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-full font-bold shadow-lg hover:bg-red-700 hover:shadow-xl transition-all"
            >
              <Plus size={20} /> Tambah Refleksi Bulanan
            </button>
          )}
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-red-200 before:to-transparent">
            {reflections.map((ref, index) => (
              <div key={ref.id || index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                {/* Timeline dot */}
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-red-100 text-red-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  <CalendarDays size={18} />
                </div>
                
                {/* Content */}
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:border-red-100 relative">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-gray-900 text-xl">{ref.month}</h3>
                  </div>
                  <div className="inline-block px-3 py-1 bg-red-50 text-red-600 rounded-full text-xs font-semibold mb-4">
                    Fokus: {ref.focus}
                  </div>
                  <p className="text-gray-600 leading-relaxed italic text-sm md:text-base mb-4">
                    "{ref.content}"
                  </p>

                  {isAdmin && (
                    <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                      <button 
                        onClick={() => handleEdit(ref)}
                        className="flex-1 py-1.5 flex justify-center items-center gap-1 rounded bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-bold transition"
                      >
                        <Edit size={14} /> Edit
                      </button>
                      <button 
                        onClick={() => {
                          if (confirm('Hapus refleksi bulan ini?')) {
                            deleteReflection(ref.id);
                          }
                        }}
                        className="flex-1 py-1.5 flex justify-center items-center gap-1 rounded bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold transition"
                      >
                        <Trash2 size={14} /> Hapus
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Admin Form Modal */}
      {showForm && isAdmin && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl relative my-8">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-xl font-bold text-gray-900">{isEditing ? 'Edit Refleksi' : 'Tambah Refleksi Baru'}</h3>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bulan & Tahun</label>
                <input 
                  type="text" 
                  placeholder="Contoh: Oktober 2026"
                  value={formData.month} 
                  onChange={e => setFormData({...formData, month: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-red-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fokus Sila</label>
                <input 
                  type="text" 
                  placeholder="Contoh: Sila ke-1 & Sila ke-2"
                  value={formData.focus} 
                  onChange={e => setFormData({...formData, focus: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-red-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Isi Jurnal Refleksi</label>
                <textarea 
                  rows={5}
                  value={formData.content} 
                  onChange={e => setFormData({...formData, content: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-red-500 outline-none"
                  required
                />
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100 flex gap-3 justify-end">
                <button 
                  type="button" 
                  onClick={() => setShowForm(false)}
                  className="px-5 py-2.5 rounded-lg font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition"
                >
                  Batal
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2.5 rounded-lg font-medium text-white bg-red-600 hover:bg-red-700 transition"
                >
                  {isEditing ? 'Simpan' : 'Tambah'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
