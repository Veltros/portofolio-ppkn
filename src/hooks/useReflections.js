import { useState, useEffect } from 'react';

const initialReflections = [
  {
    id: 1,
    month: "Juli 2026",
    focus: "Sila ke-1 & Sila ke-2",
    content: "Bulan ini saya fokus untuk lebih rutin beribadah dan mulai membiasakan diri membantu pekerjaan rumah tanpa diminta oleh orang tua. Saya menyadari bahwa nilai kemanusiaan berawal dari keluarga."
  },
  {
    id: 2,
    month: "Agustus 2026",
    focus: "Sila ke-3 (Persatuan Indonesia)",
    content: "Dalam semarak kemerdekaan, saya aktif berpartisipasi dalam panitia 17-an di RT. Dari sini saya belajar arti gotong royong yang sesungguhnya dan bagaimana menyatukan berbagai pendapat warga."
  },
  {
    id: 3,
    month: "September 2026",
    focus: "Sila ke-4 & Sila ke-5",
    content: "Saya mulai menerapkan sikap demokratis di sekolah saat pemilihan ketua kelas. Saya juga belajar berhemat (Sila ke-5) dengan menyisihkan sebagian uang saku untuk ditabung setiap minggu."
  }
];

export function useReflections() {
  const [reflections, setReflections] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem('pkn_reflections');
    if (saved) {
      setReflections(JSON.parse(saved));
    } else {
      setReflections(initialReflections);
      sessionStorage.setItem('pkn_reflections', JSON.stringify(initialReflections));
    }
    setIsLoaded(true);
  }, []);

  const saveReflections = (newReflections) => {
    setReflections(newReflections);
    sessionStorage.setItem('pkn_reflections', JSON.stringify(newReflections));
  };

  const addReflection = (reflection) => {
    const newReflection = {
      ...reflection,
      id: Date.now(),
    };
    saveReflections([...reflections, newReflection]);
  };

  const updateReflection = (id, updatedData) => {
    saveReflections(reflections.map(r => r.id === id ? { ...r, ...updatedData } : r));
  };

  const deleteReflection = (id) => {
    saveReflections(reflections.filter(r => r.id !== id));
  };

  return { reflections, isLoaded, addReflection, updateReflection, deleteReflection };
}
