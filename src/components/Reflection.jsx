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
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-px bg-red-600/30"></span>
            <span className="text-xs font-medium tracking-[0.15em] uppercase text-red-600/60">Refleksi</span>
            <span className="w-8 h-px bg-red-600/30"></span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900">
            Jurnal Refleksi <span className="italic text-red-700">Bulanan</span>
          </h2>
          <p className="text-gray-500 mt-4 max-w-lg mx-auto text-sm leading-relaxed">
            Catatan perkembangan diri dan evaluasi dalam menerapkan nilai-nilai luhur Pancasila setiap bulannya.
          </p>

          {isAdmin && (
            <button 
              onClick={() => {
                setIsEditing(false);
                setFormData({ month: '', focus: '', content: '' });
                setShowForm(true);
              }}
              className="mt-6 inline-flex items-center gap-2 bg-red-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-red-800 transition-colors"
            >
              <Plus size={16} /> Tambah Refleksi
            </button>
          )}
        </div>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto">
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-px before:bg-gradient-to-b before:from-transparent before:via-red-200/60 before:to-transparent">
            {reflections.map((ref, index) => (
              <div key={ref.id || index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                {/* Timeline dot */}
                <div className="flex items-center justify-center w-9 h-9 rounded-full border-2 border-gray-50 bg-red-50 text-red-600 shadow-sm shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  <CalendarDays size={15} />
                </div>
                
                {/* Content */}
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white/80 backdrop-blur-sm p-5 md:p-6 rounded-2xl border border-gray-100/80 transition-all duration-300 hover:border-red-200/50 hover:shadow-sm relative">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-heading font-bold text-gray-900 text-lg">{ref.month}</h3>
                  </div>
                  <span className="inline-block px-2.5 py-0.5 bg-red-50 text-red-600 rounded-md text-[11px] font-semibold mb-3 tracking-wide">
                    {ref.focus}
                  </span>
                  <blockquote className="text-gray-600 leading-relaxed text-sm border-l-2 border-red-200/40 pl-3 italic">
                    {ref.content}
                  </blockquote>

                  {isAdmin && (
                    <div className="flex gap-2 mt-4 pt-3 border-t border-gray-100/60">
                      <button 
                        onClick={() => handleEdit(ref)}
                        className="flex-1 py-1.5 flex justify-center items-center gap-1 rounded-lg text-blue-600 text-xs font-medium hover:bg-blue-50/50 transition-colors"
                      >
                        <Edit size={12} /> Edit
                      </button>
                      <button 
                        onClick={() => {
                          if (confirm('Hapus refleksi bulan ini?')) {
                            deleteReflection(ref.id);
                          }
                        }}
                        className="flex-1 py-1.5 flex justify-center items-center gap-1 rounded-lg text-red-600 text-xs font-medium hover:bg-red-50/50 transition-colors"
                      >
                        <Trash2 size={12} /> Hapus
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl relative my-8 animate-scale-in border border-gray-100">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">{isEditing ? 'Edit Refleksi' : 'Tambah Refleksi Baru'}</h3>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600 transition-colors p-1">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Bulan & Tahun</label>
                <input 
                  type="text" 
                  placeholder="Contoh: Oktober 2026"
                  value={formData.month} 
                  onChange={e => setFormData({...formData, month: e.target.value})}
                  className="w-full border border-gray-200 rounded-xl p-2.5 text-sm focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Fokus Sila</label>
                <input 
                  type="text" 
                  placeholder="Contoh: Sila ke-1 & Sila ke-2"
                  value={formData.focus} 
                  onChange={e => setFormData({...formData, focus: e.target.value})}
                  className="w-full border border-gray-200 rounded-xl p-2.5 text-sm focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Isi Jurnal Refleksi</label>
                <textarea 
                  rows={5}
                  value={formData.content} 
                  onChange={e => setFormData({...formData, content: e.target.value})}
                  className="w-full border border-gray-200 rounded-xl p-2.5 text-sm focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all resize-none"
                  required
                />
              </div>

              <div className="mt-2 pt-4 border-t border-gray-100 flex gap-3 justify-end">
                <button 
                  type="button" 
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Batal
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2 rounded-xl text-sm font-medium text-white bg-red-700 hover:bg-red-800 transition-colors"
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
