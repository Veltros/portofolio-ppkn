export default function Footer() {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-red-950 text-white py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-heading font-light text-red-200/40 tracking-[0.3em] mb-2">SAYA BERPANCASILA</h2>
        <p className="text-sm tracking-widest text-red-300/40 uppercase mb-10">Tugas Portofolio PKN</p>
        
        <div className="space-y-1.5 mb-8">
          <p className="font-medium text-sm text-gray-400">Revansyah Putra Wardoyo</p>
          <p className="text-xs text-gray-500">Fase F Lanjutan PPLG • NIS: 12352</p>
        </div>
        
        <div className="w-16 h-px bg-red-900/50 mx-auto mb-8"></div>
        
        <p className="text-xs text-gray-600/60 tracking-wide">
          &copy; {year} Portofolio Tugas PKN. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
