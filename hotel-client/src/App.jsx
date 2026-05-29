import React, { useState, createContext, useContext } from 'react';
import Rooms from './components/Rooms';
import Customers from './components/Customers';
import Bookings from './components/Bookings';
import Dashboard from './components/Dashboard';
import Toast from './components/Toast';
import useToast from './useToast';

export const ToastContext = createContext(null);
export const useToastContext = () => useContext(ToastContext);

const pages = [
  { id: 'dashboard', label: 'לוח בקרה', icon: '📊' },
  { id: 'bookings', label: 'הזמנות', icon: '📋' },
  { id: 'rooms', label: 'חדרים', icon: '🛏️' },
  { id: 'customers', label: 'לקוחות', icon: '👤' },
];

export default function App() {
  const [page, setPage] = useState('dashboard');
  const { toasts, removeToast, toast } = useToast();
  const current = pages.find(p => p.id === page);

  return (
    <ToastContext.Provider value={toast}>
      <div className="app-layout">
        <aside className="sidebar">
          <div className="sidebar-logo">
            <div className="logo-mark">
              <div className="logo-icon">🏨</div>
              <div className="logo-text">
                <h1>Grand Hotel</h1>
                <p>מערכת ניהול</p>
              </div>
            </div>
          </div>
          <nav className="sidebar-nav">
            <div className="nav-section-label">ניווט</div>
            {pages.map(p => (
              <button key={p.id} className={`nav-item ${page === p.id ? 'active' : ''}`} onClick={() => setPage(p.id)}>
                <span className="nav-icon">{p.icon}</span>
                {p.label}
              </button>
            ))}
          </nav>
          <div className="sidebar-footer">
            <div className="status-dot"><div className="dot" />מערכת פעילה</div>
          </div>
        </aside>

        <div className="main-content">
          <div className="topbar">
            <div className="topbar-left">
              <span className="breadcrumb">Grand Hotel</span>
              <span className="breadcrumb-sep">/</span>
              <span className="topbar-page">{current?.label}</span>
            </div>
            <div className="topbar-right">
              <div className="topbar-pill"><span>●</span> מחובר לשרת</div>
            </div>
          </div>
          <div className="page">
            {page === 'dashboard' && <Dashboard setPage={setPage} />}
            {page === 'bookings' && <Bookings />}
            {page === 'rooms' && <Rooms />}
            {page === 'customers' && <Customers />}
          </div>
        </div>
      </div>
      <Toast toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
}
