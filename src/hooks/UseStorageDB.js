import { useState, useEffect } from "react";

export function useLocalStorage() {
  const [dataInStorage, setDataInStorage] = useState(null);

  useEffect(() => {
    try {
      const cachedData = localStorage.getItem('cached_data')
      if (!cachedData) {
        console.log('There is no data saved')
        return;
      }

      const parsedData = JSON.parse(cachedData)
      setDataInStorage(parsedData)

    } catch (error) {
      console.error('Error retrieving data', error)
      throw error;
    }

  }, [])

  return { dataInStorage }
}

export function useIndexedDB(framedata) {
  // initial setup of indexedDB
  const indexed_DB = indexedDB.open('framesDB', 1);

  indexed_DB.onupgradeneeded = event => {
    const db = event.target.result;

    db.createObjectStore('frames', { keyPath: 'id' })
  }

  indexed_DB.onsuccess = () => {
    const db = indexed_DB.result;

    const transaction = db.transaction(['frames'], 'readwrite')
    const store = transaction.objectStore('frames')

    const frames = framedata
    store.add(frames)
  }
}