import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ensureDir = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

const files = {
  'data/activities.js': `export const activities = [
  {
    id: 1,
    day: "Senin",
    date: "17 Agustus 2026",
    title: "Melaksanakan upacara bendera dalam rangka untuk memperingati hari kemerdekaan.",
    sila: 3,
    silaName: "Persatuan Indonesia",
    description: "Kegiatan ini menunjukkan rasa cinta tanah air dan semangat kebangsaan, yang merupakan nilai utama dari Sila ke-3.",
    image: "/images/kegiatan-1.jpg"
  },
  {
    id: 2,
    day: "Selasa",
    date: "18 Agustus 2026",
    title: "Membantu orang tua mencuci dan menjemur baju.",
    sila: 2,
    silaName: "Kemanusiaan yang Adil dan Beradab",
    description: "Membantu orang tua merupakan bentuk rasa hormat dan kasih sayang yang mencerminkan nilai kemanusiaan.",
    image: "/images/kegiatan-2.jpg"
  },
  {
    id: 3,
    day: "Rabu",
    date: "19 Agustus 2026",
    title: "Melaksanakan pembiasaan keagamaan yaitu membaca Al-Qur’an.",
    sila: 1,
    silaName: "Ketuhanan Yang Maha Esa",
    description: "Mendekatkan diri kepada Tuhan Yang Maha Esa melalui membaca kitab suci adalah pengamalan langsung dari Sila Pertama.",
    image: "/images/kegiatan-3.jpg"
  },
  {
    id: 4,
    day: "Kamis",
    date: "20 Agustus 2026",
    title: "Bekerja sama dalam latihan tari bersama kelompok sepulang sekolah untuk mempersiapkan ujian praktik.",
    sila: 3,
    silaName: "Persatuan Indonesia",
    description: "Bekerja sama tanpa membedakan latar belakang untuk mencapai tujuan bersama adalah wujud persatuan.",
    image: "/images/kegiatan-4.jpg"
  },
  {
    id: 5,
    day: "Jumat",
    date: "21 Agustus 2026",
    title: "Melaksanakan salat Jumat secara berjamaah sebagai bentuk ketaatan dalam menjalankan ajaran agama.",
    sila: 1,
    silaName: "Ketuhanan Yang Maha Esa",
    description: "Melaksanakan ibadah bersama-sama merupakan bentuk keimanan dan ketaatan kepada Tuhan Yang Maha Esa.",
    image: "/images/kegiatan-5.jpg"
  }
];
`,
  'data/assessment.js': `export const assessmentData = [
  { id: 1, name: "Kedisiplinan", score: 4 }, // GANTI DENGAN NILAI SEBENARNYA (1-4)
  { id: 2, name: "Tanggung Jawab", score: 4 }, // GANTI DENGAN NILAI SEBENARNYA (1-4)
  { id: 3, name: "Kerja Sama", score: 4 }, // GANTI DENGAN NILAI SEBENARNYA (1-4)
  { id: 4, name: "Kepedulian", score: 3 }, // GANTI DENGAN NILAI SEBENARNYA (1-4)
  { id: 5, name: "Konsistensi dalam menerapkan nilai Pancasila", score: 3 } // GANTI DENGAN NILAI SEBENARNYA (1-4)
];
`,
  'components/Navbar.jsx': `'use client';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'Beranda', href: '#home' },
    { name: 'Identitas', href: '#identitas' },
    { name: 'Kegiatan', href: '#kegiatan' },
    { name: 'Sila Pancasila', href: '#sila' },
    { name: 'Dokumentasi', href: '#dokumentasi' },
    { name: 'Penilaian', href: '#penilaian' },
    { name: 'Refleksi', href: '#refleksi' }
  ];

  const handleClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <a href="#home" onClick={(e) => handleClick(e, '#home')} className="text-xl md:text-2xl font-bold text-red-600 tracking-wider">
            SAYA BERPANCASILA
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleClick(e, item.href)}
                className="text-gray-700 hover:text-red-600 transition-colors font-medium"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg py-4 px-4 flex flex-col space-y-4">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleClick(e, item.href)}
                className="text-gray-700 hover:text-red-600 font-medium block"
              >
                {item.name}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
`,
  'components/Hero.jsx': `export default function Hero() {
  const handleScroll = () => {
    const element = document.getElementById('kegiatan');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-white pt-20 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-red-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 -left-4 w-72 h-72 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-gray-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>

      <div className="text-center z-10 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 tracking-tight">
          SAYA <span className="text-red-600">BERPANCASILA</span>
        </h1>
        <h2 className="text-xl md:text-2xl text-gray-700 mb-8 font-medium">
          Penerapan Nilai-Nilai Pancasila dalam Kehidupan Sehari-hari
        </h2>
        <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          Website ini berisi dokumentasi kegiatan sehari-hari yang mencerminkan penerapan nilai-nilai Pancasila, mulai dari kegiatan di rumah, sekolah, hingga lingkungan sekitar.
        </p>
        <button 
          onClick={handleScroll}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/50"
        >
          Lihat Kegiatan
        </button>
      </div>
    </section>
  );
}
`,
  'components/About.jsx': `export default function About() {
  return (
    <section id="identitas" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Identitas Diri</h2>
          <div className="w-24 h-1 bg-red-600 mx-auto mt-4 rounded-full"></div>
        </div>
        
        <div className="max-w-3xl mx-auto bg-gray-50 rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 transition-all hover:shadow-md">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="w-40 h-40 md:w-48 md:h-48 flex-shrink-0 relative">
              <img 
                src="/images/profile.jpg" 
                alt="Foto Profil" 
                className="w-full h-full object-cover rounded-2xl shadow-md border-4 border-white"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://ui-avatars.com/api/?name=Revansyah+Putra&background=dc2626&color=fff&size=256";
                }}
              />
            </div>
            
            <div className="flex flex-col justify-center text-center md:text-left h-full">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Revansyah Putra Wardoyo</h3>
              
              <div className="mt-4 space-y-4">
                <div>
                  <p className="text-sm text-gray-500 font-semibold uppercase tracking-wider">Kelas</p>
                  <p className="text-lg text-gray-800 font-medium">Fase F Lanjutan PPLG</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 font-semibold uppercase tracking-wider">NIS</p>
                  <p className="text-lg text-gray-800 font-medium">12352</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
`,
  'components/ActivityCard.jsx': `export default function ActivityCard({ activity, onOpenModal }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col group">
      <div className="relative h-56 overflow-hidden">
        <img 
          src={activity.image} 
          alt={activity.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://via.placeholder.com/600x400?text=Foto+Dokumentasi";
          }}
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-red-600 shadow-sm">
          Sila ke-{activity.sila}
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-medium text-gray-500">
            {activity.day}, {activity.date}
          </span>
        </div>
        
        <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
          {activity.title}
        </h3>
        
        <p className="text-sm font-medium text-red-600 mb-4">
          {activity.silaName}
        </p>
        
        <div className="mt-auto pt-4 border-t border-gray-100">
          <button 
            onClick={() => onOpenModal(activity)}
            className="w-full text-center py-2 px-4 rounded-lg bg-gray-50 hover:bg-red-50 text-gray-700 hover:text-red-600 font-semibold transition-colors duration-200"
          >
            Lihat Detail
          </button>
        </div>
      </div>
    </div>
  );
}
`,
  'components/ActivityFilter.jsx': `export default function ActivityFilter({ currentFilter, setFilter }) {
  const filters = [
    { id: 0, label: 'Semua' },
    { id: 1, label: 'Sila 1' },
    { id: 2, label: 'Sila 2' },
    { id: 3, label: 'Sila 3' },
    { id: 4, label: 'Sila 4' },
    { id: 5, label: 'Sila 5' },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-10">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => setFilter(filter.id)}
          className={`px-4 py-2 rounded-full text-sm md:text-base font-medium transition-all duration-300 ${
            currentFilter === filter.id
              ? 'bg-red-600 text-white shadow-md'
              : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
`,
  'components/ActivityModal.jsx': `import { X } from 'lucide-react';

export default function ActivityModal({ activity, onClose }) {
  if (!activity) return null;

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
              src={activity.image} 
              alt={activity.title} 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/800x600?text=Foto+Dokumentasi";
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
`,
  'components/ActivityTimeline.jsx': `'use client';
import { useState } from 'react';
import { activities } from '../data/activities';
import ActivityCard from './ActivityCard';
import ActivityFilter from './ActivityFilter';
import ActivityModal from './ActivityModal';

export default function ActivityTimeline() {
  const [filter, setFilter] = useState(0);
  const [selectedActivity, setSelectedActivity] = useState(null);

  const filteredActivities = filter === 0 
    ? activities 
    : activities.filter(a => a.sila === filter);

  return (
    <section id="kegiatan" className="py-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Kegiatan Sehari-hari</h2>
          <div className="w-24 h-1 bg-red-600 mx-auto mt-4 mb-8 rounded-full"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Berikut adalah dokumentasi kegiatan yang saya lakukan sebagai bentuk penerapan nilai-nilai Pancasila.
          </p>
        </div>

        <ActivityFilter currentFilter={filter} setFilter={setFilter} />

        {filteredActivities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredActivities.map((activity) => (
              <ActivityCard 
                key={activity.id} 
                activity={activity} 
                onOpenModal={setSelectedActivity} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500">Belum ada kegiatan yang tercatat untuk Sila ini.</p>
          </div>
        )}
      </div>

      {selectedActivity && (
        <ActivityModal 
          activity={selectedActivity} 
          onClose={() => setSelectedActivity(null)} 
        />
      )}
    </section>
  );
}
`,
  'components/DocumentationGallery.jsx': `'use client';
import { useState } from 'react';
import { activities } from '../data/activities';
import { X } from 'lucide-react';

export default function DocumentationGallery() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section id="dokumentasi" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Galeri Dokumentasi</h2>
          <div className="w-24 h-1 bg-red-600 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {activities.map((activity) => (
            <div 
              key={activity.id}
              className="group relative h-64 rounded-xl overflow-hidden cursor-pointer"
              onClick={() => setSelectedImage(activity)}
            >
              <img 
                src={activity.image} 
                alt={activity.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/400x400?text=Foto";
                }}
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
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/800x600?text=Foto";
              }}
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
`,
  'components/PancasilaSection.jsx': `export default function PancasilaSection() {
  const silaList = [
    { num: 1, text: "Ketuhanan Yang Maha Esa" },
    { num: 2, text: "Kemanusiaan yang Adil dan Beradab" },
    { num: 3, text: "Persatuan Indonesia" },
    { num: 4, text: "Kerakyatan yang Dipimpin oleh Hikmat Kebijaksanaan dalam Permusyawaratan/Perwakilan" },
    { num: 5, text: "Keadilan Sosial bagi Seluruh Rakyat Indonesia" }
  ];

  return (
    <section id="sila" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">5 Sila Pancasila</h2>
          <div className="w-24 h-1 bg-red-600 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {silaList.map((sila) => (
            <div key={sila.num} className="bg-gray-50 border border-gray-100 rounded-xl p-6 md:p-8 flex items-center gap-6 hover:shadow-md transition-shadow group">
              <div className="w-16 h-16 flex-shrink-0 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-red-600">{sila.num}</span>
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 group-hover:text-red-600 transition-colors">
                  {sila.text}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
`,
  'components/SelfAssessment.jsx': `import { assessmentData } from '../data/assessment';

export default function SelfAssessment() {
  return (
    <section id="penilaian" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Penilaian Diri</h2>
          <div className="w-24 h-1 bg-red-600 mx-auto mt-4 rounded-full"></div>
          <p className="text-gray-600 mt-6 max-w-2xl mx-auto">
            Skala Penilaian: 1 (Perlu Ditingkatkan) - 4 (Sangat Baik)
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-gray-50 rounded-2xl p-8 border border-gray-100 shadow-sm">
          <div className="space-y-8">
            {assessmentData.map((item) => {
              const percentage = (item.score / 4) * 100;
              return (
                <div key={item.id}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-800">{item.name}</span>
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
          </div>
        </div>
      </div>
    </section>
  );
}
`,
  'components/Reflection.jsx': `export default function Reflection() {
  // GANTI TEKS DI BAWAH INI SESUAI DENGAN REFLEKSI ASLI
  const reflections = [
    {
      title: "Apa yang saya pelajari?",
      content: "Melalui tugas ini, saya belajar bahwa menerapkan Pancasila tidak harus menunggu momen besar, melainkan bisa dimulai dari hal-hal kecil di rumah dan lingkungan sekitar."
    },
    {
      title: "Nilai Pancasila yang saya rasakan",
      content: "Saya paling merasakan nilai Sila ke-3 (Persatuan Indonesia) dan Sila ke-1 (Ketuhanan). Kebersamaan dalam keluarga dan ketaatan beribadah membuat hidup lebih damai."
    },
    {
      title: "Kebiasaan baik yang ingin dipertahankan",
      content: "Saya ingin terus mempertahankan kebiasaan membantu orang tua tanpa diminta dan rutin beribadah tepat waktu."
    },
    {
      title: "Hal yang masih perlu saya tingkatkan",
      content: "Saya merasa masih perlu meningkatkan rasa kepedulian terhadap lingkungan sekitar (Sila ke-2), mungkin dengan lebih sering ikut kerja bakti atau membantu tetangga."
    }
  ];

  return (
    <section id="refleksi" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Refleksi Diri</h2>
          <div className="w-24 h-1 bg-red-600 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {reflections.map((ref, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-red-50 text-red-600 rounded-lg flex items-center justify-center font-bold text-xl mb-4">
                {index + 1}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">{ref.title}</h3>
              <p className="text-gray-600 leading-relaxed italic">
                "{ref.content}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
`,
  'components/Conclusion.jsx': `export default function Conclusion() {
  return (
    <section className="py-20 bg-red-600 text-white">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">Kesimpulan</h2>
        <div className="max-w-3xl mx-auto">
          <p className="text-lg md:text-xl leading-relaxed font-medium">
            "Pancasila bukan sekadar teori yang dihafal di sekolah, melainkan pedoman hidup yang nyata. Melalui kegiatan sehari-hari, saya menyadari bahwa setiap tindakan baik yang kita lakukan untuk diri sendiri, keluarga, maupun orang lain, pada dasarnya adalah wujud nyata dari nilai-nilai luhur Pancasila."
          </p>
        </div>
      </div>
    </section>
  );
}
`,
  'components/Footer.jsx': `export default function Footer() {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold text-red-500 tracking-wider mb-4">SAYA BERPANCASILA</h2>
        
        <div className="space-y-2 text-gray-400 mb-8">
          <p className="font-semibold text-gray-300">Revansyah Putra Wardoyo</p>
          <p>Fase F Lanjutan PPLG • NIS: 12352</p>
        </div>
        
        <div className="w-full h-px bg-gray-800 mb-8"></div>
        
        <p className="text-sm text-gray-500">
          &copy; {year} Portofolio Tugas PKN. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
`,
  'app/page.js': `import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import ActivityTimeline from '../components/ActivityTimeline';
import DocumentationGallery from '../components/DocumentationGallery';
import PancasilaSection from '../components/PancasilaSection';
import SelfAssessment from '../components/SelfAssessment';
import Reflection from '../components/Reflection';
import Conclusion from '../components/Conclusion';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <About />
      <PancasilaSection />
      <ActivityTimeline />
      <DocumentationGallery />
      <SelfAssessment />
      <Reflection />
      <Conclusion />
      <Footer />
    </main>
  );
}
`,
  'app/layout.js': `import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Saya Berpancasila | Portofolio Tugas PKN',
  description: 'Portofolio dokumentasi kegiatan sehari-hari penerapan nilai-nilai Pancasila oleh Revansyah Putra Wardoyo',
}

export default function RootLayout({ children }) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
`,
  'app/globals.css': `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --foreground-rgb: 0, 0, 0;
  --background-start-rgb: 255, 255, 255;
  --background-end-rgb: 255, 255, 255;
}

body {
  color: rgb(var(--foreground-rgb));
  background: white;
}

@layer utilities {
  .animation-delay-2000 {
    animation-delay: 2s;
  }
  .animation-delay-4000 {
    animation-delay: 4s;
  }
}

@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
}

.animate-blob {
  animation: blob 7s infinite;
}
`
};

for (const [filepath, content] of Object.entries(files)) {
  const fullPath = path.join(__dirname, filepath);
  ensureDir(path.dirname(fullPath));
  fs.writeFileSync(fullPath, content);
  console.log(`Created ${filepath}`);
}
