import { useState, useEffect } from 'react';
import { assessmentData as initialData } from '../data/assessment';

export function useAssessment() {
  const [assessments, setAssessments] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem('pkn_assessment');
    if (saved) {
      setAssessments(JSON.parse(saved));
    } else {
      setAssessments(initialData);
      sessionStorage.setItem('pkn_assessment', JSON.stringify(initialData));
    }
    setIsLoaded(true);
  }, []);

  const saveAssessments = (newData) => {
    setAssessments(newData);
    sessionStorage.setItem('pkn_assessment', JSON.stringify(newData));
  };

  const addAssessment = (assessment) => {
    const newAssessment = {
      ...assessment,
      id: Date.now(),
    };
    saveAssessments([...assessments, newAssessment]);
  };

  const updateAssessment = (id, updatedData) => {
    saveAssessments(assessments.map(a => a.id === id ? { ...a, ...updatedData } : a));
  };

  const deleteAssessment = (id) => {
    saveAssessments(assessments.filter(a => a.id !== id));
  };

  return { assessments, isLoaded, addAssessment, updateAssessment, deleteAssessment };
}
