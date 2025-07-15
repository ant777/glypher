export function shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);
}
import { useEffect } from 'react';

export function useGlobalKeyDown(callback) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      callback(event);
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [callback]); // Include callback in dependencies if it changes
}

export function containsChinese(text) {
  return /[\u4e00-\u9fff]/.test(text);
}
