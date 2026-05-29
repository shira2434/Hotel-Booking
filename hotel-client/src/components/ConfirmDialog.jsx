import React from 'react';

export default function ConfirmDialog({ isOpen, title, message, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9998,
      background: 'rgba(15,23,42,0.4)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      animation: 'fadeIn 0.15s ease',
    }}>
      <div style={{
        background: '#fff',
        borderRadius: 16,
        padding: '28px 28px 24px',
        width: 360,
        boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
        animation: 'popIn 0.2s ease',
      }}>
        <div style={{
          width: 48, height: 48,
          background: '#fef2f2',
          borderRadius: 12,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.4rem',
          marginBottom: 16,
        }}>🗑️</div>

        <div style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>
          {title}
        </div>
        <div style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.5, marginBottom: 24 }}>
          {message}
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={onCancel}
            style={{
              flex: 1, padding: '9px 0',
              borderRadius: 8, border: '1.5px solid #e2e8f0',
              background: '#fff', color: '#374151',
              fontSize: '0.875rem', fontWeight: 600,
              cursor: 'pointer', transition: 'all 0.15s',
            }}
            onMouseEnter={e => e.target.style.background = '#f8fafc'}
            onMouseLeave={e => e.target.style.background = '#fff'}
          >
            ביטול
          </button>
          <button
            onClick={onConfirm}
            style={{
              flex: 1, padding: '9px 0',
              borderRadius: 8, border: 'none',
              background: 'linear-gradient(135deg, #ef4444, #dc2626)',
              color: '#fff',
              fontSize: '0.875rem', fontWeight: 600,
              cursor: 'pointer', transition: 'all 0.15s',
              boxShadow: '0 4px 12px rgba(239,68,68,0.3)',
            }}
            onMouseEnter={e => e.target.style.opacity = '0.9'}
            onMouseLeave={e => e.target.style.opacity = '1'}
          >
            מחק
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes popIn { from { opacity: 0; transform: scale(0.92); } to { opacity: 1; transform: scale(1); } }
      `}</style>
    </div>
  );
}
