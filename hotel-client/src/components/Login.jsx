import React, { useState } from 'react';
import { loginCustomer, registerCustomer } from '../api';

export default function Login({ onLogin }) {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = isRegister ? await registerCustomer(form) : await loginCustomer(form.email, form.password);
      onLogin(res.data);
    } catch (err) {
      setError(err.response?.data || 'שגיאה, נסה שוב');
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.logo}>
          <div style={styles.logoIcon}>🏨</div>
          <h1 style={styles.logoTitle}>Grand Hotel</h1>
          <p style={styles.logoSub}>מערכת ניהול</p>
        </div>

        <div style={styles.tabs}>
          <button style={{ ...styles.tab, ...(isRegister ? {} : styles.tabActive) }} onClick={() => setIsRegister(false)}>כניסה</button>
          <button style={{ ...styles.tab, ...(isRegister ? styles.tabActive : {}) }} onClick={() => setIsRegister(true)}>הרשמה</button>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          {isRegister && (
            <>
              <div className="form-group">
                <label className="form-label">שם מלא</label>
                <input placeholder="ישראל ישראלי" value={form.fullName} onChange={e => setForm({ ...form, fullName: e.target.value })} required />
              </div>
              <div className="form-group">
                <label className="form-label">טלפון</label>
                <input placeholder="050-0000000" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} required />
              </div>
            </>
          )}
          <div className="form-group">
            <label className="form-label">אימייל</label>
            <input placeholder="example@email.com" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
          </div>
          <div className="form-group">
            <label className="form-label">סיסמה</label>
            <input placeholder="••••••••" type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
          </div>

          {error && <div className="alert alert-info" style={{ background: '#fef2f2', color: '#dc2626', borderColor: '#fecaca' }}>{error}</div>}

          <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 4 }}>
            {isRegister ? 'הרשמה' : 'כניסה'}
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #ede9fe, #ddd6fe, #c7d2fe)' },
  card: { background: '#fff', borderRadius: 18, padding: '36px 32px', width: 380, boxShadow: '0 20px 60px rgba(99,102,241,0.15)', border: '1px solid #e2e8f0' },
  logo: { textAlign: 'center', marginBottom: 28 },
  logoIcon: { width: 56, height: 56, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', margin: '0 auto 12px' },
  logoTitle: { fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' },
  logoSub: { fontSize: '0.75rem', color: '#94a3b8', marginTop: 2 },
  tabs: { display: 'flex', background: '#f8fafc', borderRadius: 10, padding: 4, marginBottom: 24, border: '1px solid #e2e8f0' },
  tab: { flex: 1, padding: '8px 0', border: 'none', background: 'none', borderRadius: 7, cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, color: '#64748b', transition: 'all 0.15s' },
  tabActive: { background: '#fff', color: '#6366f1', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' },
  form: { display: 'flex', flexDirection: 'column', gap: 14 },
};
