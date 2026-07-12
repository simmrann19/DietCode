import { useState } from 'react';
import { useData } from '../DataContext';
import DataTable from '../components/DataTable';
import StatusBadge from '../components/StatusBadge';
import Modal from '../components/Modal';
import { MAINTENANCE_TYPES } from '../data';

const emptyRecord = {
  vehicleId: '', type: 'Scheduled', description: '', cost: '', startDate: '',
};

export default function Maintenance() {
  const { maintenance, vehicles, createMaintenance, closeMaintenance } = useData();
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(emptyRecord);
  const [error, setError] = useState('');
  const [toast, setToast] = useState('');

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const vehicleMap = Object.fromEntries(vehicles.map(v => [v.id, v]));
  const eligibleVehicles = vehicles.filter(v => v.status !== 'On Trip' && v.status !== 'Retired');

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'vehicleId', label: 'Vehicle', render: v => vehicleMap[v]?.registrationNumber || v },
    { key: 'type', label: 'Type' },
    { key: 'description', label: 'Description' },
    { key: 'cost', label: 'Cost (₹)', render: v => `₹${v?.toLocaleString()}` },
    { key: 'startDate', label: 'Start Date' },
    { key: 'endDate', label: 'End Date', render: v => v || '—' },
    { key: 'status', label: 'Status', render: v => <StatusBadge status={v} /> },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...form, cost: Number(form.cost) };
    const err = createMaintenance(payload);
    if (err) {
      setError(err);
    } else {
      setModalOpen(false);
    }
  };

  const handleClose = (record) => {
    const err = closeMaintenance(record.id);
    if (err) showToast(err);
  };

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));

  return (
    <div className="animate-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Maintenance</h1>
          <p className="page-subtitle">
            {maintenance.filter(m => m.status === 'Active').length} active records
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => { setForm(emptyRecord); setError(''); setModalOpen(true); }}>
          + Add Record
        </button>
      </div>

      {toast && <div className="toast toast-error">{toast}</div>}

      <DataTable
        columns={columns}
        data={maintenance}
        renderActions={(row) => (
          row.status === 'Active'
            ? <button className="btn btn-success btn-sm" onClick={() => handleClose(row)}>Close</button>
            : null
        )}
      />

      <Modal title="Add Maintenance Record" isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Vehicle</label>
              <select className="form-select" value={form.vehicleId} onChange={set('vehicleId')} required>
                <option value="">Select Vehicle</option>
                {eligibleVehicles.map(v => (
                  <option key={v.id} value={v.id}>{v.registrationNumber} — {v.name}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Type</label>
              <select className="form-select" value={form.type} onChange={set('type')}>
                {MAINTENANCE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Description</label>
            <input className="form-input" value={form.description} onChange={set('description')} placeholder="e.g. Engine overhaul" required />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Cost (₹)</label>
              <input className="form-input" type="number" value={form.cost} onChange={set('cost')} required />
            </div>
            <div className="form-group">
              <label className="form-label">Start Date</label>
              <input className="form-input" type="date" value={form.startDate} onChange={set('startDate')} required />
            </div>
          </div>
          {error && <div className="form-error">{error}</div>}
          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Create Record</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
