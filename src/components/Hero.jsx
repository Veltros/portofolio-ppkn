'use client';
import { useState, useEffect } from 'react';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleScroll = () => {
    const element = document.getElementById('kegiatan');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 px-4 overflow-hidden bg-gradient-to-b from-red-50 via-gray-50 to-gray-50">
      {/* Subtle geometric background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-20 w-80 h-80 rounded-full border border-red-200/30"></div>
        <div className="absolute top-1/3 -right-10 w-60 h-60 rounded-full border border-red-200/20"></div>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full border border-red-200/20"></div>
        <div className="absolute top-20 left-1/4 w-2 h-2 rounded-full bg-red-500/20"></div>
        <div className="absolute top-40 right-1/3 w-1.5 h-1.5 rounded-full bg-red-500/15"></div>
        <div className="absolute bottom-1/3 left-1/3 w-2.5 h-2.5 rounded-full bg-red-500/10"></div>
      </div>

      <div className={`relative z-10 text-center max-w-3xl mx-auto transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Small decorative line */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <span className="w-8 h-px bg-red-600/40"></span>
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-red-600/70">Portofolio PKN</span>
          <span className="w-8 h-px bg-red-600/40"></span>
        </div>

        <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-6 tracking-tight leading-[0.9]">
          Saya{' '}
          <span className="text-red-600 italic">Berpancasila</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-600 mb-4 max-w-xl mx-auto leading-relaxed font-light">
          Penerapan Nilai-Nilai Pancasila dalam Kehidupan Sehari-hari
        </p>

        <p className="text-sm md:text-base text-gray-500 mb-12 max-w-lg mx-auto leading-relaxed">
          Dokumentasi kegiatan yang mencerminkan nilai-nilai Pancasila di rumah, sekolah, dan lingkungan sekitar.
        </p>

        <button
          onClick={handleScroll}
          className="group inline-flex items-center gap-3 bg-red-700 hover:bg-red-800 text-white font-medium py-3.5 px-8 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md"
        >
          <span>Lihat Kegiatan</span>
          <svg
            className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </div>

      {/* Subtle scroll indicator */}
      <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="w-5 h-8 border-2 border-gray-400/40 rounded-full flex justify-center pt-1.5">
          <div className="w-1 h-2 bg-gray-400/60 rounded-full animate-bounce"></div>
        </div>
      </div>
    </section>
  );
}
