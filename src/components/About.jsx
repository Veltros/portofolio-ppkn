'use client';

export default function About() {
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
