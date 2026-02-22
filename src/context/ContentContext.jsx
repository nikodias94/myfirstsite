import React, { createContext, useState, useEffect, useContext } from 'react';
import { defaultContent } from '../data/defaultContent';

const ContentContext = createContext();

export const useContent = () => useContext(ContentContext);

export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState(() => {
    const saved = localStorage.getItem('siteContent');
    return saved ? JSON.parse(saved) : defaultContent;
  });

  useEffect(() => {
    localStorage.setItem('siteContent', JSON.stringify(content));
  }, [content]);

  // Actions
  const addItem = (category, item) => {
    setContent(prev => ({
      ...prev,
      [category]: [...prev[category], { ...item, id: Date.now().toString(), date: new Date().toISOString() }]
    }));
  };

  const updateItem = (category, id, updatedItem) => {
    setContent(prev => ({
      ...prev,
      [category]: prev[category].map(item => item.id === id ? { ...item, ...updatedItem } : item)
    }));
  };

  const deleteItem = (category, id) => {
    setContent(prev => ({
      ...prev,
      [category]: prev[category].filter(item => item.id !== id)
    }));
  };

  const importData = (jsonData) => {
    try {
      const parsed = JSON.parse(jsonData);
      setContent(parsed);
      return true;
    } catch (e) {
      console.error("Import failed", e);
      return false;
    }
  };

  const resetToDefault = () => {
    if (window.confirm("ნამდვილად გსურთ საწყის მონაცემებზე დაბრუნება? ყველა ცვლილება წაიშლება.")) {
      setContent(defaultContent);
    }
  };

  return (
    <ContentContext.Provider value={{ content, addItem, updateItem, deleteItem, importData, resetToDefault }}>
      {children}
    </ContentContext.Provider>
  );
};
