'use client';
import { useState, useEffect } from 'react';
import { activities as defaultActivities } from '../data/activities';

export function useActivities() {
  const [activities, setActivities] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load dari localStorage saat pertama kali di-mount
  useEffect(() => {
    const saved = localStorage.getItem('pkn_activities');
    if (saved) {
      try {
        setActivities(JSON.parse(saved));
      } catch (e) {
        setActivities(defaultActivities);
      }
    } else {
      setActivities(defaultActivities);
      localStorage.setItem('pkn_activities', JSON.stringify(defaultActivities));
    }
    setIsLoaded(true);
  }, []);

  const saveActivities = (newActivities) => {
    setActivities(newActivities);
    localStorage.setItem('pkn_activities', JSON.stringify(newActivities));
  };

  const addActivity = (activity) => {
    const newId = activities.length > 0 ? Math.max(...activities.map(a => a.id)) + 1 : 1;
    const newActivity = { ...activity, id: newId };
    saveActivities([...activities, newActivity]);
  };

  const updateActivity = (id, updatedData) => {
    saveActivities(activities.map(a => a.id === id ? { ...a, ...updatedData } : a));
  };

  const deleteActivity = (id) => {
    saveActivities(activities.filter(a => a.id !== id));
  };

  return {
    activities,
    isLoaded,
    addActivity,
    updateActivity,
    deleteActivity
  };
}
