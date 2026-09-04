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

  const scoreLabels = {
    1: 'Kurang',
    2: 'Cukup',
    3: 'Baik',
    4: 'Sangat Baik'
  };

  return (
    <section id="penilaian" className="py-20 relative">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-px bg-red-600/30"></span>
            <span className="text-xs font-medium tracking-[0.15em] uppercase text-red-600/60 flex items-center gap-1.5">
              <BookCheck size={12} /> Penilaian
            </span>
            <span className="w-8 h-px bg-red-600/30"></span>
          </div>
          
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Penilaian <span className="italic text-red-700">Diri</span>
          </h2>
          
          <p className="text-gray-500 max-w-lg mx-auto text-sm leading-relaxed">
            Evaluasi diri terhadap penerapan nilai-nilai Pancasila dalam kehidupan sehari-hari.
          </p>

          {isAdmin && (
            <button 
              onClick={() => {
                setIsEditing(false);
                setFormData({ name: '', score: 4 });
                setShowForm(true);
              }}
              className="mt-6 inline-flex items-center gap-2 bg-red-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-red-800 transition-colors"
            >
              <Plus size={16} /> Tambah Aspek Penilaian
            </button>
          )}
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-14">
          <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-gray-100/80 flex items-center gap-4 transition-all hover:border-red-200/40">
            <div className="w-12 h-12 bg-red-50 text-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <ListChecks size={22} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 tracking-tight">{activities.length || 0}</p>
              <p className="text-xs text-gray-500 font-medium">Total Kegiatan</p>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-gray-100/80 flex items-center gap-4 transition-all hover:border-red-200/40">
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <Star size={22} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 tracking-tight">{scoreOutOf10}<span className="text-base font-normal text-gray-400">/10</span></p>
              <p className="text-xs text-gray-500 font-medium">Rata-rata Nilai</p>
            </div>
          </div>
        </div>

        {/* Progress Bars */}
        <div className="max-w-2xl mx-auto bg-white/70 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-100/80">
          <h3 className="text-sm font-semibold text-gray-800 mb-6 pb-3 border-b border-gray-100/60 flex items-center gap-2">
            <span className="w-1 h-4 bg-red-600 rounded-full"></span>
            Rincian Penilaian
          </h3>
          <div className="space-y-6">
            {assessments.map((item) => {
              const percentage = (item.score / 4) * 100;
              return (
                <div key={item.id} className="group relative">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      {item.name}
                      {isAdmin && (
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1 ml-1">
                          <button onClick={() => handleEdit(item)} className="text-blue-500 hover:text-blue-700 p-0.5 rounded transition-colors"><Edit size={12}/></button>
                          <button onClick={() => { if(confirm('Hapus rincian ini?')) deleteAssessment(item.id) }} className="text-red-500 hover:text-red-700 p-0.5 rounded transition-colors"><Trash2 size={12}/></button>
                        </span>
                      )}
                    </span>
                    <span className="text-xs font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded-md">
                      {item.score}/4 · {scoreLabels[item.score]}
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5">
                    <div 
                      className="bg-gradient-to-r from-red-600 to-red-500 h-1.5 rounded-full transition-all duration-1000"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
            
            {assessments.length === 0 && (
              <p className="text-center text-gray-400 text-sm py-4">Belum ada aspek penilaian.</p>
            )}
          </div>
        </div>
        
      </div>

      {/* Admin Form Modal */}
      {showForm && isAdmin && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl relative my-8 animate-scale-in border border-gray-100">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">{isEditing ? 'Edit Aspek Penilaian' : 'Tambah Aspek Penilaian'}</h3>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600 transition-colors p-1">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Nama Aspek Penilaian</label>
                <input 
                  type="text" 
                  placeholder="Contoh: Konsistensi Ibadah"
                  value={formData.name} 
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full border border-gray-200 rounded-xl p-2.5 text-sm focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Nilai (1-4)</label>
                <select 
                  value={formData.score} 
                  onChange={e => setFormData({...formData, score: parseInt(e.target.value)})}
                  className="w-full border border-gray-200 rounded-xl p-2.5 text-sm focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all"
                  required
                >
                  <option value={1}>1 — Kurang</option>
                  <option value={2}>2 — Cukup</option>
                  <option value={3}>3 — Baik</option>
                  <option value={4}>4 — Sangat Baik</option>
                </select>
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
