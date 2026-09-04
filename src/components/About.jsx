'use client';

export default function About() {
  return (
    <section id="identitas" className="py-24 bg-white relative">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading text-gray-900 mb-6">Identitas Diri</h2>
          <div className="flex items-center justify-center gap-4 text-red-700/60">
            <span className="w-12 h-[1px] bg-red-700/30"></span>
            <span className="text-xl">~</span>
            <span className="w-12 h-[1px] bg-red-700/30"></span>
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto bg-gray-50/80 rounded-3xl p-8 md:p-14 transition-all hover:bg-gray-50 border border-gray-100">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-12">
            <div className="w-48 h-48 md:w-56 md:h-56 flex-shrink-0 relative">
              <div className="absolute inset-0 rounded-full border border-red-700/20 translate-x-3 translate-y-3"></div>
              <img 
                src="/images/profile.jpg" 
                alt="Foto Profil" 
                className="w-full h-full object-cover rounded-full shadow-sm relative z-10"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://ui-avatars.com/api/?name=Revansyah+Putra&background=dc2626&color=fff&size=256";
                }}
              />
            </div>
            
            <div className="flex flex-col justify-center text-center md:text-left h-full flex-1 mt-4 md:mt-6">
              <h3 className="text-3xl md:text-4xl font-heading text-gray-900 mb-8">Revansyah Putra Wardoyo</h3>
              
              <div className="flex flex-col gap-6">
                <div className="pb-6 border-b border-gray-200">
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1.5">Kelas</p>
                  <p className="text-xl text-gray-800">Fase F Lanjutan PPLG</p>
                </div>
                
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1.5">NIS</p>
                  <p className="text-xl text-gray-800">12352</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
