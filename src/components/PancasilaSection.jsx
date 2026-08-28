export default function PancasilaSection() {
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
