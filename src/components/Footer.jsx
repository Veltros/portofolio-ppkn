export default function Footer() {
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
