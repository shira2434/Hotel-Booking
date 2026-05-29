import { useState, useCallback } from 'react';

export default function useToast() {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info', title = '') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type, title }]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const toast = {
    success: (msg, title) => addToast(msg, 'success', title),
    error:   (msg, title) => addToast(msg, 'error', title),
    warning: (msg, title) => addToast(msg, 'warning', title),
    info:    (msg, title) => addToast(msg, 'info', title),
  };

  return { toasts, removeToast, toast };
}
