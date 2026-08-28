'use client';
import { useState } from 'react';
import { useActivities } from '../hooks/useActivities';
import { useAuth } from '../hooks/useAuth';
import ActivityCard from './ActivityCard';
import ActivityFilter from './ActivityFilter';
import ActivityModal from './ActivityModal';
import { Plus, X } from 'lucide-react';

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
      <section id="kegiatan" className="py-20 bg-gray-50 min-h-screen relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Kegiatan Sehari-hari</h2>
            <div className="w-24 h-1 bg-red-600 mx-auto mt-4 mb-8 rounded-full"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Berikut adalah dokumentasi kegiatan yang saya lakukan sebagai bentuk penerapan nilai-nilai Pancasila.
            </p>
          </div>

          {/* Month Selector Tabs */}
          <div className="flex justify-center flex-wrap gap-2 mb-8">
            {uniqueMonths.map((m) => (
              <button
                key={m}
                onClick={() => setSelectedMonth(m)}
                className={`px-5 py-2.5 rounded-full font-bold transition-all duration-200 text-sm ${
                  activeMonth === m
                    ? 'bg-amber-800 text-white shadow-md'
                    : 'bg-white hover:bg-amber-50 text-amber-900 border border-amber-800/10'
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          <ActivityFilter currentFilter={filter} setFilter={setFilter} />

          {sortedWeeks.length > 0 ? (
            <div className="space-y-12 mt-12">
              {sortedWeeks.map((weekName) => (
                <div key={weekName} className="border-l-2 border-dashed border-amber-800/30 pl-6 ml-2 relative">
                  {/* Week Dot indicator */}
                  <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-amber-800"></div>
                  
                  <h3 className="text-xl font-extrabold text-amber-900 mb-6 flex items-center gap-2">
                    <span className="bg-amber-100/70 border border-amber-800/10 px-4 py-1.5 rounded-xl text-sm font-bold shadow-sm">
                      {weekName}
                    </span>
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
            <div className="text-center py-20">
              <p className="text-xl text-gray-500">Belum ada kegiatan yang tercatat untuk filter ini.</p>
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
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl relative my-8">
              <div className="flex justify-between items-center p-6 border-b">
                <h3 className="text-xl font-bold text-gray-900">{isEditing ? 'Edit Kegiatan' : 'Tambah Kegiatan Baru'}</h3>
                <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600">
                  <X size={24} />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hari</label>
                  <select 
                    value={formData.day} 
                    onChange={e => setFormData({...formData, day: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-red-500 outline-none"
                    required
                  >
                    {['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'].map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal</label>
                  <input 
                    type="text" 
                    placeholder="Contoh: 17 Agustus 2026"
                    value={formData.date} 
                    onChange={e => setFormData({...formData, date: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-red-500 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bulan Tugas</label>
                  <select 
                    value={formData.month} 
                    onChange={e => setFormData({...formData, month: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-red-500 outline-none"
                    required
                  >
                    {standardMonths.map(m => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Minggu Ke-</label>
                  <select 
                    value={formData.week} 
                    onChange={e => setFormData({...formData, week: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-red-500 outline-none"
                    required
                  >
                    {['Minggu 1', 'Minggu 2', 'Minggu 3', 'Minggu 4', 'Minggu 5'].map(w => (
                      <option key={w} value={w}>{w}</option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Judul Kegiatan</label>
                  <input 
                    type="text" 
                    value={formData.title} 
                    onChange={e => setFormData({...formData, title: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-red-500 outline-none"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sila Pancasila (1-5)</label>
                  <select 
                    value={formData.sila} 
                    onChange={handleSilaChange}
                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-red-500 outline-none"
                    required
                  >
                    {[1, 2, 3, 4, 5].map(num => (
                      <option key={num} value={num}>Sila {num} - {silaNames[num]}</option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi Singkat</label>
                  <textarea 
                    rows={4}
                    value={formData.description} 
                    onChange={e => setFormData({...formData, description: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-red-500 outline-none"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Lokasi Foto (Contoh: /images/profile.jpg)</label>
                  <input 
                    type="text" 
                    value={formData.image} 
                    onChange={e => setFormData({...formData, image: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-red-500 outline-none"
                  />
                </div>

                <div className="md:col-span-2 mt-4 pt-4 border-t border-gray-100 flex gap-3 justify-end">
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
                    {isEditing ? 'Simpan Perubahan' : 'Tambah Kegiatan'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </section>

      {/* Admin Toolbar (Sticky Bottom) */}
      {isAdmin && (
        <div className="fixed bottom-0 left-0 w-full bg-gray-900 border-t border-gray-800 text-white z-[90] shadow-2xl py-3 px-4 md:px-8 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="font-semibold hidden md:inline">Mode Admin Aktif</span>
            <span className="font-semibold md:hidden">Admin</span>
          </div>
          <button 
            onClick={() => {
              setIsEditing(false);
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
            className="flex items-center gap-2 bg-red-600 text-white px-5 py-2 rounded-lg font-bold hover:bg-red-700 transition"
          >
            <Plus size={18} /> <span className="hidden md:inline">Tambah Kegiatan Baru</span>
            <span className="md:hidden">Tambah</span>
          </button>
        </div>
      )}
    </>
  );
}
