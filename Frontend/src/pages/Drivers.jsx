import { useState } from 'react';
import { useData } from '../DataContext';
import DataTable from '../components/DataTable';
import StatusBadge from '../components/StatusBadge';
import Modal from '../components/Modal';
import { DRIVER_STATUSES } from '../data';

const LICENSE_CATEGORIES = ['LMV', 'HMV', 'HGMV', 'HTV'];

const emptyDriver = {
  name: '', licenseNumber: '', licenseCategory: 'HMV',
  licenseExpiry: '', contactNumber: '', safetyScore: '',
  status: 'Available',
};

export default function Drivers() {
  const { drivers, addDriver, updateDriver } = useData();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyDriver);
  const [error, setError] = useState('');

  const isExpired = (date) => new Date(date) < new Date();

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'licenseNumber', label: 'License No.' },
    { key: 'licenseCategory', label: 'Category' },
    {
      key: 'licenseExpiry', label: 'License Expiry',
      render: (v) => (
        <span className={isExpired(v) ? 'text-error' : ''}>
          {v} {isExpired(v) ? '(Expired)' : ''}
        </span>
      ),
    },
    { key: 'contactNumber', label: 'Contact' },
    {
      key: 'safetyScore', label: 'Safety Score',
      render: (v) => (
        <span className={v >= 85 ? 'score-high' : v >= 70 ? 'score-medium' : 'score-low'}>
          {v}
        </span>
      ),
    },
    { key: 'status', label: 'Status', render: v => <StatusBadge status={v} /> },
  ];

  const openAdd = () => {
    setEditing(null);
    setForm(emptyDriver);
    setError('');
    setModalOpen(true);
  };

  const openEdit = (driver) => {
    setEditing(driver.id);
    setForm({ ...driver, safetyScore: String(driver.safetyScore) });
    setError('');
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...form, safetyScore: Number(form.safetyScore) };
    const err = editing ? updateDriver(editing, payload) : addDriver(payload);
    if (err) {
      setError(err);
    } else {
      setModalOpen(false);
    }
  };

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));

  return (
    <div className="animate-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Driver Management</h1>
          <p className="page-subtitle">{drivers.length} drivers registered</p>
        </div>
        <button className="btn btn-primary" onClick={openAdd}>+ Add Driver</button>
      </div>

      <DataTable
        columns={columns}
        data={drivers}
        renderActions={(row) => (
          <button className="btn btn-ghost btn-sm" onClick={() => openEdit(row)}>Edit</button>
        )}
      />

      <Modal title={editing ? 'Edit Driver' : 'Add Driver'} isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input className="form-input" value={form.name} onChange={set('name')} placeholder="Rajesh Kumar" required />
            </div>
            <div className="form-group">
              <label className="form-label">License Number</label>
              <input className="form-input" value={form.licenseNumber} onChange={set('licenseNumber')} placeholder="MH-2020-0012345" required />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">License Category</label>
              <select className="form-select" value={form.licenseCategory} onChange={set('licenseCategory')}>
                {LICENSE_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">License Expiry</label>
              <input className="form-input" type="date" value={form.licenseExpiry} onChange={set('licenseExpiry')} required />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Contact Number</label>
              <input className="form-input" value={form.contactNumber} onChange={set('contactNumber')} placeholder="9876543210" required />
            </div>
            <div className="form-group">
              <label className="form-label">Safety Score (0–100)</label>
              <input className="form-input" type="number" min="0" max="100" value={form.safetyScore} onChange={set('safetyScore')} required />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Status</label>
            <select className="form-select" value={form.status} onChange={set('status')}>
              {DRIVER_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          {error && <div className="form-error">{error}</div>}
          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">{editing ? 'Update' : 'Add Driver'}</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
