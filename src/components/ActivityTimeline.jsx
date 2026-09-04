'use client';
import { useState, useRef } from 'react';
import { useActivities } from '../hooks/useActivities';
import { useAuth } from '../hooks/useAuth';
import ActivityCard from './ActivityCard';
import ActivityFilter from './ActivityFilter';
import ActivityModal from './ActivityModal';
import { Plus, X, Upload, Link as LinkIcon, Trash2, Loader2, CheckCircle2, Image as ImageIcon } from 'lucide-react';
import { uploadToCloudinary } from '../utils/cloudinary';

export default function ActivityTimeline() {
  const [filter, setFilter] = useState(0);
  const [selectedActivity, setSelectedActivity] = useState(null);
  
  // Admin states
  const { isAdmin } = useAuth();
  const { activities, addActivity, updateActivity, deleteActivity } = useActivities();
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [formData, setFormData] = useState({
    day: 'Senin',
    date: '',
    title: '',
    sila: 1,
    silaName: 'Ketuhanan Yang Maha Esa',
    description: '',
    image: '',
    month: 'Bulan 1 (Agustus)',
    week: 'Minggu 3'
  });

  // Cloudinary Upload states
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [uploadMode, setUploadMode] = useState('file'); // 'file' | 'url'
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelected = async (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setUploadError('Harap pilih file gambar (format JPG, PNG, atau WebP).');
      return;
    }
    setUploadingImage(true);
    setUploadError('');
    try {
      const secureUrl = await uploadToCloudinary(file);
      setFormData((prev) => ({ ...prev, image: secureUrl }));
    } catch (err) {
      console.error('Cloudinary upload error:', err);
      setUploadError(err.message || 'Gagal mengupload foto ke Cloudinary.');
    } finally {
      setUploadingImage(false);
    }
  };

  const standardMonths = [
    'Bulan 1 (Agustus)',
    'Bulan 2 (September)',
    'Bulan 3 (Oktober)',
    'Bulan 4 (November)',
    'Bulan 5 (Desember)'
  ];

  const uniqueMonths = Array.from(new Set([
    ...standardMonths,
    ...activities.map(a => a.month).filter(Boolean)
  ]));

  const [selectedMonth, setSelectedMonth] = useState('Bulan 1 (Agustus)');
  const activeMonth = uniqueMonths.includes(selectedMonth) ? selectedMonth : uniqueMonths[0];

  const monthFiltered = activities.filter(a => (a.month || 'Bulan 1 (Agustus)') === activeMonth);

  const filteredActivities = filter === 0 
    ? monthFiltered 
    : monthFiltered.filter(a => a.sila === filter);

  // Group activities by week
  const groupedByWeek = filteredActivities.reduce((acc, activity) => {
    const week = activity.week || 'Minggu 3';
    if (!acc[week]) {
      acc[week] = [];
    }
    acc[week].push(activity);
    return acc;
  }, {});

  // Sort weeks
  const sortedWeeks = Object.keys(groupedByWeek).sort((a, b) => {
    const numA = parseInt(a.replace(/^\D+/g, '')) || 0;
    const numB = parseInt(b.replace(/^\D+/g, '')) || 0;
    return numA - numB;
  });

  const silaNames = {
    1: 'Ketuhanan Yang Maha Esa',
    2: 'Kemanusiaan yang Adil dan Beradab',
    3: 'Persatuan Indonesia',
    4: 'Kerakyatan yang Dipimpin oleh Hikmat Kebijaksanaan dalam Permusyawaratan/Perwakilan',
    5: 'Keadilan Sosial bagi Seluruh Rakyat Indonesia'
  };

  const handleSilaChange = (e) => {
    const silaValue = parseInt(e.target.value);
    setFormData({
      ...formData,
      sila: silaValue,
      silaName: silaNames[silaValue]
    });
  };

  const handleEdit = (activity) => {
    setIsEditing(true);
    setCurrentId(activity.id);
    setUploadError('');
    setUploadMode(activity.image && !activity.image.startsWith('http') ? 'url' : 'file');
    setFormData({
      day: activity.day || 'Senin',
      date: activity.date || '',
      title: activity.title || '',
      sila: activity.sila || 1,
      silaName: activity.silaName || 'Ketuhanan Yang Maha Esa',
      description: activity.description || '',
      image: activity.image || '',
      month: activity.month || 'Bulan 1 (Agustus)',
      week: activity.week || 'Minggu 3'
    });
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      updateActivity(currentId, formData);
    } else {
      addActivity(formData);
    }
    setShowForm(false);
    setIsEditing(false);
    setCurrentId(null);
    setUploadError('');
    setFormData({
      day: 'Senin',
      date: '',
      title: '',
      sila: 1,
      silaName: 'Ketuhanan Yang Maha Esa',
      description: '',
      image: '',
      month: 'Bulan 1 (Agustus)',
      week: 'Minggu 3'
    });
  };

  return (
    <>
      <section id="kegiatan" className="py-20 min-h-screen relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-8 h-px bg-red-600/30"></span>
              <span className="text-xs font-medium tracking-[0.15em] uppercase text-red-600/60">Kegiatan</span>
              <span className="w-8 h-px bg-red-600/30"></span>
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-4">Kegiatan Sehari-hari</h2>
            <p className="text-gray-500 max-w-lg mx-auto text-sm leading-relaxed">
              Dokumentasi kegiatan yang mencerminkan penerapan nilai-nilai Pancasila.
            </p>
          </div>

          {/* Month Selector Tabs */}
          <div className="flex justify-center flex-wrap gap-1.5 mb-6">
            {uniqueMonths.map((m) => (
              <button
                key={m}
                onClick={() => setSelectedMonth(m)}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 text-xs ${
                  activeMonth === m
                    ? 'bg-red-700 text-white'
                    : 'bg-white/60 hover:bg-white text-gray-600 border border-gray-200/60'
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          <ActivityFilter currentFilter={filter} setFilter={setFilter} />

          {sortedWeeks.length > 0 ? (
            <div className="space-y-10 mt-10">
              {sortedWeeks.map((weekName) => (
                <div key={weekName} className="border-l border-red-200/40 pl-6 ml-2 relative">
                  {/* Week Dot indicator */}
                  <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-red-600"></div>
                  
                  <h3 className="text-sm font-semibold text-gray-700 mb-5 flex items-center gap-2">
                    <span className="bg-red-50/60 border border-red-200/30 px-3 py-1 rounded-lg text-xs font-semibold text-red-700">
                      {weekName}
                    </span>
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {groupedByWeek[weekName].map((activity) => (
                      <ActivityCard 
                        key={activity.id} 
                        activity={activity} 
                        onOpenModal={setSelectedActivity} 
                        isAdmin={isAdmin}
                        onEdit={handleEdit}
                        onDelete={deleteActivity}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-sm text-gray-400">Belum ada kegiatan yang tercatat untuk filter ini.</p>
            </div>
          )}
        </div>

        {/* Detail Modal */}
        {selectedActivity && (
          <ActivityModal 
            activity={selectedActivity} 
            onClose={() => setSelectedActivity(null)} 
          />
        )}

        {/* Admin Form Modal */}
        {showForm && isAdmin && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl relative my-8 animate-scale-in border border-gray-100">
              <div className="flex justify-between items-center p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">{isEditing ? 'Edit Kegiatan' : 'Tambah Kegiatan Baru'}</h3>
                <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600 transition-colors p-1">
                  <X size={20} />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Hari</label>
                  <select 
                    value={formData.day} 
                    onChange={e => setFormData({...formData, day: e.target.value})}
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-sm focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all"
                    required
                  >
                    {['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'].map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Tanggal</label>
                  <input 
                    type="text" 
                    placeholder="Contoh: 17 Agustus 2026"
                    value={formData.date} 
                    onChange={e => setFormData({...formData, date: e.target.value})}
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-sm focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Bulan Tugas</label>
                  <select 
                    value={formData.month} 
                    onChange={e => setFormData({...formData, month: e.target.value})}
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-sm focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all"
                    required
                  >
                    {standardMonths.map(m => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Minggu Ke-</label>
                  <select 
                    value={formData.week} 
                    onChange={e => setFormData({...formData, week: e.target.value})}
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-sm focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all"
                    required
                  >
                    {['Minggu 1', 'Minggu 2', 'Minggu 3', 'Minggu 4', 'Minggu 5'].map(w => (
                      <option key={w} value={w}>{w}</option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Judul Kegiatan</label>
                  <input 
                    type="text" 
                    value={formData.title} 
                    onChange={e => setFormData({...formData, title: e.target.value})}
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-sm focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Sila Pancasila (1-5)</label>
                  <select 
                    value={formData.sila} 
                    onChange={handleSilaChange}
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-sm focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all"
                    required
                  >
                    {[1, 2, 3, 4, 5].map(num => (
                      <option key={num} value={num}>Sila {num} - {silaNames[num]}</option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Deskripsi Singkat</label>
                  <textarea 
                    rows={4}
                    value={formData.description} 
                    onChange={e => setFormData({...formData, description: e.target.value})}
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-sm focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-semibold text-gray-800">
                      Foto Dokumentasi Kegiatan
                    </label>
                    <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg text-xs font-medium">
                      <button
                        type="button"
                        onClick={() => setUploadMode('file')}
                        className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition ${
                          uploadMode === 'file'
                            ? 'bg-white text-red-600 shadow-sm font-semibold'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        <Upload size={13} /> Upload File
                      </button>
                      <button
                        type="button"
                        onClick={() => setUploadMode('url')}
                        className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition ${
                          uploadMode === 'url'
                            ? 'bg-white text-red-600 shadow-sm font-semibold'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        <LinkIcon size={13} /> URL / Path
                      </button>
                    </div>
                  </div>

                  {uploadMode === 'file' ? (
                    <div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            handleFileSelected(e.target.files[0]);
                          }
                        }}
                      />

                      {uploadingImage ? (
                        <div className="border-2 border-dashed border-red-300 bg-red-50/50 rounded-xl p-6 text-center flex flex-col items-center justify-center gap-2">
                          <Loader2 size={28} className="text-red-600 animate-spin" />
                          <p className="font-semibold text-gray-800 text-sm">Mengunggah foto ke Cloudinary...</p>
                          <p className="text-xs text-gray-500">Foto sedang diproses agar dapat dilihat secara online.</p>
                        </div>
                      ) : formData.image ? (
                        <div className="flex items-center gap-4 p-3.5 bg-gray-50 border border-gray-200 rounded-xl">
                          <img
                            src={formData.image}
                            alt="Preview"
                            className="w-20 h-20 object-cover rounded-lg border border-gray-300 shadow-sm flex-shrink-0"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "https://placehold.co/200x200?text=Preview+Error";
                            }}
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 text-emerald-600 text-xs font-bold mb-1">
                              <CheckCircle2 size={14} />
                              <span>Foto Berhasil Diunggah ke Cloudinary</span>
                            </div>
                            <p className="text-xs text-gray-500 truncate font-mono" title={formData.image}>
                              {formData.image}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition"
                              >
                                Ganti Foto
                              </button>
                              <span className="text-gray-300">•</span>
                              <button
                                type="button"
                                onClick={() => setFormData({ ...formData, image: '' })}
                                className="text-xs font-semibold text-red-600 hover:text-red-800 flex items-center gap-1 transition"
                              >
                                <Trash2 size={12} /> Hapus
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div
                          onDragOver={(e) => {
                            e.preventDefault();
                            setDragOver(true);
                          }}
                          onDragLeave={() => setDragOver(false)}
                          onDrop={(e) => {
                            e.preventDefault();
                            setDragOver(false);
                            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                              handleFileSelected(e.dataTransfer.files[0]);
                            }
                          }}
                          onClick={() => fileInputRef.current?.click()}
                          className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition flex flex-col items-center justify-center gap-2 ${
                            dragOver
                              ? 'border-red-500 bg-red-50'
                              : 'border-gray-300 hover:border-red-400 bg-gray-50 hover:bg-red-50/20'
                          }`}
                        >
                          <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-1">
                            <Upload size={22} />
                          </div>
                          <p className="text-sm font-semibold text-gray-800">
                            Pilih Foto dari Perangkat (Laptop / HP)
                          </p>
                          <p className="text-xs text-gray-500">
                            Klik di sini atau seret file ke dalam kotak (JPG, PNG, WebP)
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div>
                      <input
                        type="text"
                        placeholder="Contoh: https://... atau /images/kegiatan-1.jpg"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-red-500 outline-none text-sm"
                      />
                      {formData.image && (
                        <div className="mt-2 flex items-center gap-2">
                          <img
                            src={formData.image}
                            alt="Preview URL"
                            className="w-10 h-10 object-cover rounded border"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                          <span className="text-xs text-gray-500">Pratinjau gambar</span>
                        </div>
                      )}
                    </div>
                  )}

                  {uploadError && (
                    <p className="text-xs text-red-600 font-medium mt-2 bg-red-50 p-2.5 rounded-lg border border-red-200">
                      ⚠️ {uploadError}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2 mt-2 pt-4 border-t border-gray-100 flex gap-3 justify-end">
                  <button 
                    type="button" 
                    onClick={() => { setShowForm(false); setUploadError(''); }}
                    className="px-4 py-2 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    Batal
                  </button>
                  <button 
                    type="submit" 
                    disabled={uploadingImage}
                    className="px-5 py-2 rounded-xl text-sm font-medium text-white bg-red-700 hover:bg-red-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {uploadingImage ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Mengunggah Foto...</span>
                      </>
                    ) : isEditing ? (
                      'Simpan Perubahan'
                    ) : (
                      'Tambah Kegiatan'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </section>

      {/* Admin Toolbar (Sticky Bottom) */}
      {isAdmin && (
        <div className="fixed bottom-0 left-0 w-full bg-gray-900/95 backdrop-blur-md border-t border-gray-800/50 text-white z-[90] py-2.5 px-4 md:px-8 flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-medium hidden md:inline text-gray-300">Mode Admin Aktif</span>
            <span className="text-xs font-medium md:hidden text-gray-300">Admin</span>
          </div>
          <button 
            onClick={() => {
              setIsEditing(false);
              setUploadError('');
              setUploadMode('file');
              setFormData({ 
                day: 'Senin', 
                date: '', 
                title: '', 
                sila: 1, 
                silaName: 'Ketuhanan Yang Maha Esa', 
                description: '', 
                image: '',
                month: 'Bulan 1 (Agustus)',
                week: 'Minggu 3'
              });
              setShowForm(true);
            }}
            className="flex items-center gap-1.5 bg-red-700 text-white px-4 py-1.5 rounded-lg text-xs font-semibold hover:bg-red-800 transition-colors"
          >
            <Plus size={14} /> <span className="hidden md:inline">Tambah Kegiatan Baru</span>
            <span className="md:hidden">Tambah</span>
          </button>
        </div>
      )}
    </>
  );
}
