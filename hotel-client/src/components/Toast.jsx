import React, { useEffect } from 'react';

const icons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };
const colors = {
  success: { bg: '#f0fdf4', border: '#bbf7d0', color: '#15803d', bar: '#22c55e' },
  error:   { bg: '#fef2f2', border: '#fecaca', color: '#dc2626', bar: '#ef4444' },
  warning: { bg: '#fffbeb', border: '#fde68a', color: '#b45309', bar: '#f59e0b' },
  info:    { bg: '#eff6ff', border: '#bfdbfe', color: '#1d4ed8', bar: '#6366f1' },
};

export default function Toast({ toasts, removeToast }) {
  return (
    <div style={{ position: 'fixed', bottom: 24, left: 24, zIndex: 9999, display: 'flex', flexDirection: 'column', gap: 10 }}>
      {toasts.map(t => (
        <ToastItem key={t.id} toast={t} onRemove={() => removeToast(t.id)} />
      ))}
    </div>
  );
}

function ToastItem({ toast, onRemove }) {
  const c = colors[toast.type] || colors.info;

  // התיקון בוצע כאן: הוספנו את onRemove למערך התלויות כדי לעבור את ה-ESLint ב-Netlify
  useEffect(() => {
    const timer = setTimeout(onRemove, 3500);
    return () => clearTimeout(timer);
  }, [onRemove]);

  return (
    <div style={{
      background: c.bg,
      border: `1px solid ${c.border}`,
      borderRadius: 12,
      padding: '12px 16px',
      minWidth: 280,
      maxWidth: 360,
      boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
      display: 'flex',
      alignItems: 'flex-start',
      gap: 10,
      animation: 'slideIn 0.25s ease',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <span style={{ fontSize: '1rem', flexShrink: 0 }}>{icons[toast.type]}</span>
      <div style={{ flex: 1 }}>
        {toast.title && <div style={{ fontWeight: 700, fontSize: '0.85rem', color: c.color, marginBottom: 2 }}>{toast.title}</div>}
        <div style={{ fontSize: '0.8rem', color: '#374151', lineHeight: 1.4 }}>{toast.message}</div>
      </div>
      <button onClick={onRemove} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', fontSize: '1rem', padding: 0, flexShrink: 0 }}>×</button>
      <div style={{ position: 'absolute', bottom: 0, right: 0, left: 0, height: 3, background: '#e2e8f0' }}>
        <div style={{ height: '100%', background: c.bar, animation: 'shrink 3.5s linear forwards', borderRadius: 3 }} />
      </div>
      <style>{`
        @keyframes slideIn { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes shrink { from { width: 100%; } to { width: 0%; } }
      `}</style>
    </div>
  );
}