import React, { useEffect, useState } from 'react';
import { getBookingStats, getAllRooms, getRevenueByRoomType } from '../api';

const typeLabels = { SINGLE: 'יחיד', DOUBLE: 'זוגי', SUITE: 'סוויטה' };
const typeColors = { SINGLE: '#22c55e', DOUBLE: '#6366f1', SUITE: '#f59e0b' };
const typeBadge = { SINGLE: 'badge-single', DOUBLE: 'badge-double', SUITE: 'badge-suite' };

export default function Dashboard({ setPage }) {
  const [stats, setStats] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [revenueByType, setRevenueByType] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getBookingStats(), getAllRooms(), getRevenueByRoomType()])
      .then(([s, r, rev]) => {
        setStats(s.data);
        setRooms(r.data);
        setRevenueByType(rev.data);
        setLoading(false);
      }).catch(() => setLoading(false));
  }, []);

  if (loading) return (
    <div style={{ textAlign: 'center', padding: 80, color: '#94a3b8' }}>
      <div style={{ fontSize: '2rem', marginBottom: 12 }}>⏳</div>
      <p style={{ fontSize: '0.9rem' }}>טוען נתונים...</p>
    </div>
  );

  if (!stats) return (
    <div className="alert alert-info">
      ⚠️ לא ניתן להתחבר לשרת. ודאי שהשרת רץ על פורט 8080.
    </div>
  );

  const availableRooms = rooms.filter(r => r.available).length;
  const occupiedRooms = rooms.length - availableRooms;
  const occupancyRate = rooms.length > 0 ? Math.round((occupiedRooms / rooms.length) * 100) : 0;
  const maxRevenue = revenueByType ? Math.max(...Object.values(revenueByType), 1) : 1;

  return (
    <div>
      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card blue">
          <div className="stat-top">
            <div className="stat-icon-wrap blue">📋</div>
            <span className="stat-trend neutral">{stats.activeBookings} פעילות</span>
          </div>
          <div className="stat-value">{stats.totalBookings}</div>
          <div className="stat-label">סה"כ הזמנות</div>
        </div>

        <div className="stat-card green">
          <div className="stat-top">
            <div className="stat-icon-wrap green">💰</div>
            <span className="stat-trend up">↑ פעיל</span>
          </div>
          <div className="stat-value">₪{Number(stats.totalRevenue).toLocaleString('he-IL', { maximumFractionDigits: 0 })}</div>
          <div className="stat-label">סה"כ הכנסות</div>
        </div>

        <div className="stat-card amber">
          <div className="stat-top">
            <div className="stat-icon-wrap amber">🛏️</div>
            <span className="stat-trend neutral">{occupiedRooms}/{rooms.length}</span>
          </div>
          <div className="stat-value">{occupancyRate}%</div>
          <div className="stat-label">אחוז תפוסה</div>
        </div>

        <div className="stat-card red">
          <div className="stat-top">
            <div className="stat-icon-wrap red">❌</div>
            <span className="stat-trend neutral">
              {stats.totalBookings > 0 ? Math.round((stats.cancelledBookings / stats.totalBookings) * 100) : 0}%
            </span>
          </div>
          <div className="stat-value">{stats.cancelledBookings}</div>
          <div className="stat-label">ביטולים</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>

        {/* Revenue by type */}
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">הכנסות לפי סוג חדר</div>
              <div className="card-subtitle">פירוט הכנסות מהזמנות פעילות</div>
            </div>
          </div>
          <div className="card-body">
            {revenueByType && Object.keys(revenueByType).length > 0 ? (
              Object.entries(revenueByType).map(([type, val]) => (
                <div className="revenue-row" key={type}>
                  <div className="revenue-label">
                    <span className={`badge ${typeBadge[type]}`}>{typeLabels[type] || type}</span>
                  </div>
                  <div className="revenue-track">
                    <div className="revenue-fill" style={{ width: `${(val / maxRevenue) * 100}%`, background: typeColors[type] }} />
                  </div>
                  <div className="revenue-val">₪{Number(val).toLocaleString('he-IL', { maximumFractionDigits: 0 })}</div>
                </div>
              ))
            ) : (
              <div className="empty-state"><div className="icon">📭</div><p>אין נתונים עדיין</p></div>
            )}
          </div>
        </div>

        {/* Room status */}
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">סטטוס חדרים</div>
              <div className="card-subtitle">זמינות בזמן אמת</div>
            </div>
          </div>
          <div className="card-body">
            <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
              <div style={{ flex: 1, background: '#f0fdf4', borderRadius: 10, padding: '12px 14px', border: '1px solid #bbf7d0' }}>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#15803d' }}>{availableRooms}</div>
                <div style={{ fontSize: '0.72rem', color: '#16a34a', fontWeight: 600, marginTop: 2 }}>פנויים</div>
              </div>
              <div style={{ flex: 1, background: '#fef2f2', borderRadius: 10, padding: '12px 14px', border: '1px solid #fecaca' }}>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#dc2626' }}>{occupiedRooms}</div>
                <div style={{ fontSize: '0.72rem', color: '#ef4444', fontWeight: 600, marginTop: 2 }}>תפוסים</div>
              </div>
            </div>
            <div className="occ-bar-wrap">
              <div className="occ-bar-track">
                <div className="occ-bar-fill" style={{ width: `${occupancyRate}%` }} />
              </div>
              <div className="occ-labels">
                <span>0%</span>
                <span>תפוסה {occupancyRate}%</span>
                <span>100%</span>
              </div>
            </div>
            <div className="room-grid">
              {rooms.map(r => (
                <div key={r.id} className={`room-chip ${r.available ? 'available' : 'occupied'}`}>
                  {r.roomNumber}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">פעולות מהירות</div>
        </div>
        <div className="card-body">
          <div className="quick-actions">
            <button className="btn btn-primary" onClick={() => setPage('bookings')}>➕ הזמנה חדשה</button>
            <button className="btn btn-info" onClick={() => setPage('rooms')}>🛏️ ניהול חדרים</button>
            <button className="btn btn-secondary" onClick={() => setPage('customers')}>👤 ניהול לקוחות</button>
          </div>
        </div>
      </div>
    </div>
  );
}
