import React, { useEffect, useState } from 'react';
import { getAllCustomers, addCustomer, updateCustomer, deleteCustomer } from '../api';
import { useToastContext } from '../App';
import ConfirmDialog from './ConfirmDialog';

export default function Customers() {
  const toast = useToastContext();
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({ id: 0, fullName: '', email: '', phone: '' });
  const [editing, setEditing] = useState(false);
  const [confirmId, setConfirmId] = useState(null);

  const load = () => getAllCustomers().then(r => setCustomers(r.data));
  useEffect(() => { load(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) await updateCustomer(form);
      else await addCustomer(form);
      setForm({ id: 0, fullName: '', email: '', phone: '' });
      setEditing(false);
      load();
      toast.success(editing ? 'פרטי הלקוח עודכנו' : 'הלקוח נוסף בהצלחה', 'לקוחות');
    } catch (err) { toast.error(err.response?.data || 'שגיאה', 'שגיאה'); }
  };

  const handleEdit = (c) => { setForm(c); setEditing(true); window.scrollTo(0, 0); };
  const handleDelete = async (id) => {
    await deleteCustomer(id);
    load();
    toast.warning('הלקוח נמחק מהמערכת', 'מחיקה');
  };

  const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6'];

  return (
    <div>
      <ConfirmDialog
        isOpen={confirmId !== null}
        title="מחיקת לקוח"
        message="האם אתה בטוח שברצונך למחוק את הלקוח? כל הנתונים יימחקו לצמיתות."
        onConfirm={() => { handleDelete(confirmId); setConfirmId(null); }}
        onCancel={() => setConfirmId(null)}
      />
      <div className="card" style={{ marginBottom: 16 }}>
        <div className="card-header">
          <div className="card-title">{editing ? 'עריכת לקוח' : 'הוספת לקוח חדש'}</div>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr) auto', gap: 12, alignItems: 'flex-end' }}>
              <div className="form-group">
                <label className="form-label">שם מלא</label>
                <input placeholder="ישראל ישראלי" value={form.fullName} onChange={e => setForm({ ...form, fullName: e.target.value })} required />
              </div>
              <div className="form-group">
                <label className="form-label">אימייל</label>
                <input placeholder="example@email.com" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
              </div>
              <div className="form-group">
                <label className="form-label">טלפון</label>
                <input placeholder="050-0000000" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} required />
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button type="submit" className="btn btn-primary">{editing ? 'עדכן' : 'הוסף'}</button>
                {editing && <button type="button" className="btn btn-secondary" onClick={() => { setEditing(false); setForm({ id: 0, fullName: '', email: '', phone: '' }); }}>ביטול</button>}
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div>
            <div className="card-title">רשימת לקוחות</div>
            <div className="card-subtitle">{customers.length} לקוחות רשומים</div>
          </div>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>לקוח</th><th>אימייל</th><th>טלפון</th><th>פעולות</th></tr>
            </thead>
            <tbody>
              {customers.length === 0 ? (
                <tr><td colSpan={4}><div className="empty-state"><div className="icon">👤</div><p>אין לקוחות רשומים</p></div></td></tr>
              ) : customers.map((c, i) => (
                <tr key={c.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div className="avatar" style={{ background: `linear-gradient(135deg, ${colors[i % colors.length]}22, ${colors[i % colors.length]}44)`, color: colors[i % colors.length] }}>
                        {c.fullName.charAt(0)}
                      </div>
                      <span style={{ fontWeight: 600 }}>{c.fullName}</span>
                    </div>
                  </td>
                  <td style={{ color: '#64748b', fontSize: '0.83rem' }}>{c.email}</td>
                  <td style={{ color: '#64748b', fontSize: '0.83rem' }}>{c.phone}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button className="btn btn-info btn-sm" onClick={() => handleEdit(c)}>עריכה</button>
                      <button className="btn btn-danger btn-sm" onClick={() => setConfirmId(c.id)}>מחיקה</button>
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
