import React, { useEffect, useState } from 'react';
import { getAllRooms, addRoom, updateRoom, deleteRoom, getAvailableRooms } from '../api';
import { useToastContext } from '../App';
import ConfirmDialog from './ConfirmDialog';

const typeClass = { SINGLE: 'badge-single', DOUBLE: 'badge-double', SUITE: 'badge-suite' };
const typeLabel = { SINGLE: 'יחיד', DOUBLE: 'זוגי', SUITE: 'סוויטה' };

export default function Rooms() {
  const toast = useToastContext();
  const [rooms, setRooms] = useState([]);
  const [form, setForm] = useState({ id: 0, roomNumber: '', type: 'SINGLE', pricePerNight: 0, available: true });
  const [editing, setEditing] = useState(false);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [searching, setSearching] = useState(false);
  const [searchCount, setSearchCount] = useState(0);
  const [confirmId, setConfirmId] = useState(null);

  const load = () => { setSearching(false); getAllRooms().then(r => setRooms(r.data)); };
  useEffect(() => { load(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) await updateRoom(form);
      else await addRoom(form);
      setForm({ id: 0, roomNumber: '', type: 'SINGLE', pricePerNight: 0, available: true });
      setEditing(false);
      load();
      toast.success(editing ? 'החדר עודכן בהצלחה' : 'החדר נוסף בהצלחה', 'חדרים');
    } catch (err) { toast.error(err.response?.data || 'שגיאה', 'שגיאה'); }
  };

  const handleEdit = (r) => { setForm(r); setEditing(true); window.scrollTo(0, 0); };
  const handleDelete = async (id) => {
    await deleteRoom(id);
    load();
    toast.warning('החדר נמחק', 'מחיקה');
  };

  const searchAvailable = async () => {
    if (!checkIn || !checkOut) return toast.warning('יש למלא תאריכים');
    const res = await getAvailableRooms(checkIn, checkOut);
    setRooms(res.data);
    setSearchCount(res.data.length);
    setSearching(true);
    toast.info(`נמצאו ${res.data.length} חדרים פנויים`, 'תוצאות חיפוש');
  };

  return (
    <div>
      <ConfirmDialog
        isOpen={confirmId !== null}
        title="מחיקת חדר"
        message="האם אתה בטוח שברצונך למחוק את החדר? פעולה זו אינה ניתנת לביטול."
        onConfirm={() => { handleDelete(confirmId); setConfirmId(null); }}
        onCancel={() => setConfirmId(null)}
      />
      {/* Availability search */}
      <div className="card" style={{ marginBottom: 16 }}>
        <div className="card-header">
          <div>
            <div className="card-title">בדיקת זמינות חדרים</div>
            <div className="card-subtitle">חפש חדרים פנויים לפי תאריכי שהייה</div>
          </div>
          {searching && <button className="btn btn-secondary btn-sm" onClick={load}>הצג הכל</button>}
        </div>
        <div className="card-body">
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end', flexWrap: 'wrap' }}>
            <div className="form-group" style={{ flex: 1, minWidth: 160 }}>
              <label className="form-label">תאריך כניסה</label>
              <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)} />
            </div>
            <div className="form-group" style={{ flex: 1, minWidth: 160 }}>
              <label className="form-label">תאריך יציאה</label>
              <input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)} />
            </div>
            <button className="btn btn-primary" onClick={searchAvailable}>חפש</button>
          </div>
          {searching && (
            <div className="alert alert-success" style={{ marginTop: 12, marginBottom: 0 }}>
              ✅ נמצאו {searchCount} חדרים פנויים
            </div>
          )}
        </div>
      </div>

      {/* Form */}
      <div className="card" style={{ marginBottom: 16 }}>
        <div className="card-header">
          <div className="card-title">{editing ? 'עריכת חדר' : 'הוספת חדר חדש'}</div>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr) auto', gap: 12, alignItems: 'flex-end' }}>
              <div className="form-group">
                <label className="form-label">מספר חדר</label>
                <input placeholder="101" value={form.roomNumber} onChange={e => setForm({ ...form, roomNumber: e.target.value })} required />
              </div>
              <div className="form-group">
                <label className="form-label">סוג חדר</label>
                <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                  <option value="SINGLE">יחיד (Single)</option>
                  <option value="DOUBLE">זוגי (Double)</option>
                  <option value="SUITE">סוויטה (Suite)</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">מחיר ללילה (₪)</label>
                <input type="number" placeholder="0" value={form.pricePerNight || ''} onChange={e => setForm({ ...form, pricePerNight: +e.target.value })} required />
              </div>
              <div className="form-group">
                <label className="form-label">סטטוס</label>
                <label className="checkbox-label" style={{ paddingTop: 6 }}>
                  <input type="checkbox" checked={form.available} onChange={e => setForm({ ...form, available: e.target.checked })} />
                  חדר פנוי
                </label>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button type="submit" className="btn btn-primary">{editing ? 'עדכן' : 'הוסף'}</button>
                {editing && <button type="button" className="btn btn-secondary" onClick={() => { setEditing(false); setForm({ id: 0, roomNumber: '', type: 'SINGLE', pricePerNight: 0, available: true }); }}>ביטול</button>}
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Table */}
      <div className="card">
        <div className="card-header">
          <div>
            <div className="card-title">רשימת חדרים</div>
            <div className="card-subtitle">{rooms.length} חדרים</div>
          </div>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>מספר חדר</th><th>סוג</th><th>מחיר ללילה</th><th>סטטוס</th><th>פעולות</th></tr>
            </thead>
            <tbody>
              {rooms.length === 0 ? (
                <tr><td colSpan={5}><div className="empty-state"><div className="icon">🛏️</div><p>אין חדרים</p></div></td></tr>
              ) : rooms.map(r => (
                <tr key={r.id}>
                  <td style={{ fontWeight: 700 }}>{r.roomNumber}</td>
                  <td><span className={`badge ${typeClass[r.type]}`}>{typeLabel[r.type]}</span></td>
                  <td style={{ fontWeight: 600 }}>₪{r.pricePerNight.toLocaleString()}</td>
                  <td><span className={`badge ${r.available ? 'badge-available' : 'badge-occupied'}`}>{r.available ? '● פנוי' : '● תפוס'}</span></td>
                  <td>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button className="btn btn-info btn-sm" onClick={() => handleEdit(r)}>עריכה</button>
                      <button className="btn btn-danger btn-sm" onClick={() => setConfirmId(r.id)}>מחיקה</button>
                    </div>
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
