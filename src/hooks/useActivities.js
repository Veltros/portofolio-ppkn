'use client';
import { useState, useEffect } from 'react';
import { activities as defaultActivities } from '../data/activities';
import { db } from '../utils/firebase';
import { collection, doc, onSnapshot, setDoc, deleteDoc } from 'firebase/firestore';

export function useActivities() {
  const [activities, setActivities] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // 1. Ambil data cache dari localStorage untuk render instan pertama kali
    const cached = localStorage.getItem('pkn_activities');
    if (cached) {
      try {
        setActivities(JSON.parse(cached));
      } catch (e) {
        setActivities(defaultActivities);
      }
    } else {
      setActivities(defaultActivities);
    }

    let isSeeding = false;

    // 2. Langganan (Subscribe) realtime ke Firebase Firestore
    try {
      const unsubscribe = onSnapshot(
        collection(db, 'activities'),
        async (snapshot) => {
          if (snapshot.empty && !isSeeding) {
            isSeeding = true;
            // Jika database Firestore masih kosong, isi dengan kegiatan awal otomatis
            try {
              for (const item of defaultActivities) {
                await setDoc(doc(db, 'activities', String(item.id)), item);
              }
            } catch (seedErr) {
              console.warn('Gagal seeding data awal ke Firestore:', seedErr);
            }
            isSeeding = false;
          } else if (!snapshot.empty) {
            const list = snapshot.docs.map((docSnap) => {
              const data = docSnap.data();
              return {
                ...data,
                id: Number(docSnap.id) || data.id,
              };
            });

            // Urutkan kegiatan berdasarkan ID
            list.sort((a, b) => (Number(a.id) || 0) - (Number(b.id) || 0));

            setActivities(list);
            try {
              localStorage.setItem('pkn_activities', JSON.stringify(list));
            } catch (e) {}
          }
          setIsLoaded(true);
        },
        (error) => {
          console.warn('Firestore snapshot listener error (menggunakan data lokal):', error);
          setIsLoaded(true);
        }
      );

      return () => unsubscribe();
    } catch (err) {
      console.error('Inisialisasi Firestore listener gagal:', err);
      setIsLoaded(true);
    }
  }, []);

  const addActivity = async (activity) => {
    const newId = activities.length > 0 ? Math.max(...activities.map(a => Number(a.id) || 0)) + 1 : 1;
    const newActivity = { ...activity, id: newId, createdAt: Date.now() };

    // Update state secara optimistik di layar lokal
    setActivities(prev => {
      const updated = [...prev, newActivity];
      try {
        localStorage.setItem('pkn_activities', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });

    // Simpan ke Firebase Firestore agar semua perangkat langsung tersinkron
    try {
      await setDoc(doc(db, 'activities', String(newId)), newActivity);
    } catch (err) {
      console.error('Gagal menambahkan kegiatan ke Firestore:', err);
      alert('Perhatian: Kegiatan tersimpan di browser lokal, namun gagal terkirim ke Firestore. Pastikan Firestore Database sudah dibuat di Firebase Console.');
    }
  };

  const updateActivity = async (id, updatedData) => {
    setActivities(prev => {
      const updated = prev.map(a => a.id === id ? { ...a, ...updatedData } : a);
      try {
        localStorage.setItem('pkn_activities', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });

    try {
      await setDoc(doc(db, 'activities', String(id)), updatedData, { merge: true });
    } catch (err) {
      console.error('Gagal memperbarui kegiatan di Firestore:', err);
    }
  };

  const deleteActivity = async (id) => {
    setActivities(prev => {
      const updated = prev.filter(a => a.id !== id);
      try {
        localStorage.setItem('pkn_activities', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });

    try {
      await deleteDoc(doc(db, 'activities', String(id)));
    } catch (err) {
      console.error('Gagal menghapus kegiatan di Firestore:', err);
    }
  };

  return {
    activities,
    isLoaded,
    addActivity,
    updateActivity,
    deleteActivity
  };
}
