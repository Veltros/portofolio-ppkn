export default function PancasilaSection() {
  const silaList = [
    { num: 1, text: "Ketuhanan Yang Maha Esa" },
    { num: 2, text: "Kemanusiaan yang Adil dan Beradab" },
    { num: 3, text: "Persatuan Indonesia" },
    { num: 4, text: "Kerakyatan yang Dipimpin oleh Hikmat Kebijaksanaan dalam Permusyawaratan/Perwakilan" },
    { num: 5, text: "Keadilan Sosial bagi Seluruh Rakyat Indonesia" }
  ];

  const getColorClass = (num) => {
    switch (num) {
      case 1: return "border-orange-200 hover:border-orange-600";
      case 2: return "border-lime-200 hover:border-lime-600";
      case 3: return "border-red-200 hover:border-red-700";
      case 4: return "border-amber-200 hover:border-amber-600";
      case 5: return "border-teal-200 hover:border-teal-600";
      default: return "border-gray-200 hover:border-gray-600";
    }
  };

  return (
    <section id="sila" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-heading text-gray-900 mb-6">5 Sila Pancasila</h2>
          <div className="flex items-center justify-center gap-4 text-red-700/60">
            <span className="w-12 h-[1px] bg-red-700/30"></span>
            <span className="text-xl">~</span>
            <span className="w-12 h-[1px] bg-red-700/30"></span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {silaList.map((sila) => (
            <div 
              key={sila.num} 
              className={`bg-gray-50/50 p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10 border-l-[6px] transition-all duration-300 ${getColorClass(sila.num)} hover:bg-gray-50 group`}
            >
              <div className="flex-shrink-0">
                <span className="text-5xl md:text-6xl font-heading text-gray-300 group-hover:text-gray-400 transition-colors">
                  0{sila.num}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl md:text-3xl font-heading text-gray-800 leading-snug group-hover:text-gray-950 transition-colors">
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
