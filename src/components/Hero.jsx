'use client';

export default function Hero() {
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
