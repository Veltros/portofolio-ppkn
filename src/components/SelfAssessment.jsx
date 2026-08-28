'use client';
import { useState } from 'react';
import { useAssessment } from '../hooks/useAssessment';
import { useActivities } from '../hooks/useActivities';
import { useAuth } from '../hooks/useAuth';
import { ListChecks, Star, BookCheck, Plus, Edit, Trash2, X } from 'lucide-react';

export default function SelfAssessment() {
  const { activities } = useActivities();
  const { assessments, addAssessment, updateAssessment, deleteAssessment } = useAssessment();
  const { isAdmin } = useAuth();
  
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    score: 4
  });
  
  // Calculate average score
  const totalScore = assessments.reduce((acc, curr) => acc + curr.score, 0);
  const averageScore = assessments.length > 0 ? (totalScore / assessments.length).toFixed(1) : 0;
  const maxAverage = 4; // since score is 1-4
  const scoreOutOf10 = assessments.length > 0 ? ((averageScore / maxAverage) * 10).toFixed(1).replace('.0', '') : 0;

  const handleEdit = (item) => {
    setIsEditing(true);
    setCurrentId(item.id);
    setFormData({ name: item.name, score: item.score });
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      updateAssessment(currentId, formData);
    } else {
      addAssessment(formData);
    }
    setShowForm(false);
    setIsEditing(false);
    setCurrentId(null);
    setFormData({ name: '', score: 4 });
  };

  return (
    <section id="penilaian" className="py-20 relative">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header matching the design */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6">
            <BookCheck size={16} /> Penilaian
          </div>
          
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#111827] mb-6">
            Penilaian <span className="text-red-600">Diri</span>
          </h2>
          
          <div className="w-16 h-1 bg-red-600 rounded-full mb-6"></div>
          
          <p className="text-gray-500 max-w-2xl mx-auto text-lg mb-6">
            Evaluasi diri terhadap penerapan nilai-nilai Pancasila dalam kehidupan sehari-hari.
          </p>

          {isAdmin && (
            <button 
              onClick={() => {
                setIsEditing(false);
                setFormData({ name: '', score: 4 });
                setShowForm(true);
              }}
              className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-full font-bold shadow-lg hover:bg-red-700 hover:shadow-xl transition-all"
            >
              <Plus size={20} /> Tambah Aspek Penilaian
            </button>
          )}
        </div>

        {/* Summary Cards matching the design */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-16">
          <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center transition hover:shadow-md">
            <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mb-4">
              <ListChecks size={32} />
            </div>
            <h3 className="text-4xl font-extrabold text-gray-900 mb-2">{activities.length || 0}</h3>
            <p className="text-gray-500 font-medium">Total Kegiatan</p>
          </div>

          <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center transition hover:shadow-md">
            <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-4">
              <Star size={32} />
            </div>
            <h3 className="text-4xl font-extrabold text-gray-900 mb-2">{scoreOutOf10}/10</h3>
            <p className="text-gray-500 font-medium">Rata-rata Nilai Keseluruhan</p>
          </div>
        </div>

        {/* Progress Bars */}
        <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-8 border-b border-gray-200 pb-4">Rincian Penilaian Aspek</h3>
          <div className="space-y-8">
            {assessments.map((item) => {
              const percentage = (item.score / 4) * 100;
              return (
                <div key={item.id} className="group relative">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-800 flex items-center gap-3">
                      {item.name}
                      {isAdmin && (
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2 ml-2">
                          <button onClick={() => handleEdit(item)} className="text-blue-500 hover:text-blue-700 bg-blue-50 p-1 rounded"><Edit size={14}/></button>
                          <button onClick={() => { if(confirm('Hapus rincian ini?')) deleteAssessment(item.id) }} className="text-red-500 hover:text-red-700 bg-red-50 p-1 rounded"><Trash2 size={14}/></button>
                        </div>
                      )}
                    </span>
                    <span className="font-bold text-red-600">{item.score}/4</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-red-600 h-3 rounded-full transition-all duration-1000"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
            
            {assessments.length === 0 && (
              <p className="text-center text-gray-500">Belum ada aspek penilaian.</p>
            )}
          </div>
        </div>
        
      </div>

      {/* Admin Form Modal */}
      {showForm && isAdmin && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl relative my-8">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-xl font-bold text-gray-900">{isEditing ? 'Edit Aspek Penilaian' : 'Tambah Aspek Penilaian'}</h3>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Aspek Penilaian</label>
                <input 
                  type="text" 
                  placeholder="Contoh: Konsistensi Ibadah"
                  value={formData.name} 
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-red-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nilai (1-4)</label>
                <select 
                  value={formData.score} 
                  onChange={e => setFormData({...formData, score: parseInt(e.target.value)})}
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-red-500 outline-none"
                  required
                >
                  <option value={1}>1 - Kurang</option>
                  <option value={2}>2 - Cukup</option>
                  <option value={3}>3 - Baik</option>
                  <option value={4}>4 - Sangat Baik</option>
                </select>
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
