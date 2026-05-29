import React, { useEffect, useState } from 'react';
import {
  getAllBookings, addBooking, cancelBooking,
  getTotalRevenue, getRevenueByRoomType, extendBooking,
  getAllCustomers, getAllRooms
} from '../api';
import { useToastContext } from '../App';

const typeClass = { SINGLE: 'badge-single', DOUBLE: 'badge-double', SUITE: 'badge-suite' };
const typeLabel = { SINGLE: 'יחיד', DOUBLE: 'זוגי', SUITE: 'סוויטה' };

export default function Bookings() {
  const toast = useToastContext();
  const [bookings, setBookings] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [form, setForm] = useState({ customerId: 0, roomId: 0, checkIn: '', checkOut: '' });
  const [totalRevenue, setTotalRevenue] = useState(null);
  const [revenueByType, setRevenueByType] = useState(null);
  const [extendId, setExtendId] = useState('');
  const [newCheckOut, setNewCheckOut] = useState('');

  const load = () => getAllBookings().then(r => setBookings(r.data));

  useEffect(() => {
    load();
    getAllCustomers().then(r => setCustomers(r.data));
    getAllRooms().then(r => setRooms(r.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addBooking({ ...form, id: 0, customerName: '', roomNumber: '', roomType: '', cancelled: false, totalPrice: 0 });
      setForm({ customerId: 0, roomId: 0, checkIn: '', checkOut: '' });
      load();
      toast.success('ההזמנה נוספה בהצלחה', 'הזמנה חדשה');
    } catch (err) { toast.error(err.response?.data || 'שגיאה בהוספת הזמנה', 'שגיאה'); }
  };

  const handleCancel = async (id) => {
    try { await cancelBooking(id); load(); toast.warning('ההזמנה בוטלה', 'ביטול הזמנה'); }
    catch (err) { toast.error(err.response?.data || 'לא ניתן לבטל הזמנה זו', 'שגיאה'); }
  };

  const handleExtend = async () => {
    if (!extendId || !newCheckOut) return toast.warning('יש למלא מזהה ותאריך');
    try { await extendBooking(+extendId, newCheckOut); load(); toast.success('ההזמנה הוארכה בהצלחה', 'הארכת הזמנה'); }
    catch (err) { toast.error(err.response?.data || 'שגיאה בהארכה', 'שגיאה'); }
  };

  const activeCount = bookings.filter(b => !b.cancelled).length;

  return (
    <div>
      {/* New booking */}
      <div className="card" style={{ marginBottom: 16 }}>
        <div className="card-header">
          <div className="card-title">הזמנה חדשה</div>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr) auto', gap: 12, alignItems: 'flex-end' }}>
              <div className="form-group">
                <label className="form-label">לקוח</label>
                <select value={form.customerId} onChange={e => setForm({ ...form, customerId: +e.target.value })} required>
                  <option value={0}>בחר לקוח</option>
                  {customers.map(c => <option key={c.id} value={c.id}>{c.fullName}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">חדר</label>
                <select value={form.roomId} onChange={e => setForm({ ...form, roomId: +e.target.value })} required>
                  <option value={0}>בחר חדר</option>
                  {rooms.map(r => <option key={r.id} value={r.id}>{r.roomNumber} — {typeLabel[r.type] || r.type}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">תאריך כניסה</label>
                <input type="date" value={form.checkIn} onChange={e => setForm({ ...form, checkIn: e.target.value })} required />
              </div>
              <div className="form-group">
                <label className="form-label">תאריך יציאה</label>
                <input type="date" value={form.checkOut} onChange={e => setForm({ ...form, checkOut: e.target.value })} required />
              </div>
              <button type="submit" className="btn btn-primary">הוסף</button>
            </div>
          </form>
        </div>
      </div>

      {/* Tools */}
      <div className="feature-grid">
        <div className="feature-card">
          <div className="feature-card-title">💰 סיכום הכנסות</div>
          <button className="btn btn-success btn-sm" onClick={() => getTotalRevenue().then(r => setTotalRevenue(r.data))}>
            חשב הכנסות
          </button>
          {totalRevenue !== null && (
            <div style={{ marginTop: 14 }}>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-1px' }}>
                ₪{Number(totalRevenue).toLocaleString('he-IL', { maximumFractionDigits: 0 })}
              </div>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: 3 }}>מהזמנות פעילות</div>
            </div>
          )}
        </div>

        <div className="feature-card">
          <div className="feature-card-title">📊 הכנסות לפי סוג חדר</div>
          <button className="btn btn-info btn-sm" onClick={() => getRevenueByRoomType().then(r => setRevenueByType(r.data))}>
            הצג פירוט
          </button>
          {revenueByType && (
            <div style={{ marginTop: 12 }}>
              {Object.entries(revenueByType).map(([type, val]) => (
                <div key={type} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid #f8fafc' }}>
                  <span className={`badge ${typeClass[type]}`}>{typeLabel[type] || type}</span>
                  <span style={{ fontSize: '0.82rem', fontWeight: 700 }}>₪{Number(val).toLocaleString('he-IL', { maximumFractionDigits: 0 })}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="feature-card">
          <div className="feature-card-title">📅 הארכת הזמנה</div>
          <div className="form-group" style={{ marginBottom: 8 }}>
            <label className="form-label">מזהה הזמנה</label>
            <input placeholder="מספר הזמנה" value={extendId} onChange={e => setExtendId(e.target.value)} />
          </div>
          <div className="form-group" style={{ marginBottom: 10 }}>
            <label className="form-label">תאריך יציאה חדש</label>
            <input type="date" value={newCheckOut} onChange={e => setNewCheckOut(e.target.value)} />
          </div>
          <button className="btn btn-warning btn-sm" onClick={handleExtend}>הארך הזמנה</button>
        </div>
      </div>

      {/* Table */}
      <div className="card">
        <div className="card-header">
          <div>
            <div className="card-title">רשימת הזמנות</div>
            <div className="card-subtitle">{activeCount} פעילות מתוך {bookings.length}</div>
          </div>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>#</th><th>לקוח</th><th>חדר</th><th>סוג</th>
                <th>כניסה</th><th>יציאה</th><th>מחיר</th><th>סטטוס</th><th>פעולות</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length === 0 ? (
                <tr><td colSpan={9}><div className="empty-state"><div className="icon">📋</div><p>אין הזמנות</p></div></td></tr>
              ) : bookings.map(b => (
                <tr key={b.id} style={{ opacity: b.cancelled ? 0.5 : 1 }}>
                  <td style={{ color: '#94a3b8', fontSize: '0.75rem' }}>#{b.id}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div className="avatar">{b.customerName?.charAt(0)}</div>
                      <span style={{ fontWeight: 600 }}>{b.customerName}</span>
                    </div>
                  </td>
                  <td style={{ fontWeight: 600 }}>{b.roomNumber}</td>
                  <td><span className={`badge ${typeClass[b.roomType]}`}>{typeLabel[b.roomType] || b.roomType}</span></td>
                  <td style={{ color: '#64748b', fontSize: '0.82rem' }}>{b.checkIn}</td>
                  <td style={{ color: '#64748b', fontSize: '0.82rem' }}>{b.checkOut}</td>
                  <td style={{ fontWeight: 700 }}>₪{b.totalPrice.toLocaleString('he-IL', { maximumFractionDigits: 0 })}</td>
                  <td><span className={`badge ${b.cancelled ? 'badge-cancelled' : 'badge-active'}`}>{b.cancelled ? 'בוטל' : 'פעיל'}</span></td>
                  <td>
                    {!b.cancelled && (
                      <button className="btn btn-danger btn-sm" onClick={() => handleCancel(b.id)}>ביטול</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
