import { useState, useEffect } from 'react';

export interface ContentItem {
  id: string;
  title: string;
  description: string;
  image: string;
  siteName: string;
  url: string;
  platform: string;
  author?: string;
  score?: number;
  savedAt: string;
}

const STORAGE_KEY = 'xshare_collection';

export function useCollection() {
  const [items, setItems] = useState<ContentItem[]>([]);

  useEffect(() => {
    loadCollection();
  }, []);

  const loadCollection = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setItems(JSON.parse(stored));
    } catch (e) {
      console.error('Error cargando colección', e);
    }
  };

  const saveItem = (item: Omit<ContentItem, 'id' | 'savedAt'>) => {
    try {
      const newItem: ContentItem = {
        ...item,
        id: Date.now().toString(),
        savedAt: new Date().toISOString(),
      };
      const updated = [newItem, ...items];
      setItems(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return true;
    } catch (e) {
      console.error('Error guardando item', e);
      return false;
    }
  };

  const removeItem = (id: string) => {
    try {
      const updated = items.filter(item => item.id !== id);
      setItems(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Error eliminando item', e);
    }
  };

  return { items, saveItem, removeItem, loadCollection };
}
