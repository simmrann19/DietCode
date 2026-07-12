import { useState } from 'react';
import { useData } from '../DataContext';
import DataTable from '../components/DataTable';
import StatusBadge from '../components/StatusBadge';
import Modal from '../components/Modal';
import { VEHICLE_TYPES, VEHICLE_STATUSES, REGIONS } from '../data';

const emptyVehicle = {
  registrationNumber: '', name: '', type: 'Truck',
  maxLoadCapacity: '', odometer: '', acquisitionCost: '',
  status: 'Available', region: 'West',
};

export default function Vehicles() {
  const { vehicles, addVehicle, updateVehicle } = useData();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyVehicle);
  const [error, setError] = useState('');

  const columns = [
    { key: 'registrationNumber', label: 'Reg. Number' },
    { key: 'name', label: 'Vehicle Name' },
    { key: 'type', label: 'Type' },
    { key: 'maxLoadCapacity', label: 'Max Load (kg)', render: v => v?.toLocaleString() },
    { key: 'odometer', label: 'Odometer (km)', render: v => v?.toLocaleString() },
    { key: 'acquisitionCost', label: 'Cost (₹)', render: v => `₹${v?.toLocaleString()}` },
    { key: 'region', label: 'Region' },
    { key: 'status', label: 'Status', render: v => <StatusBadge status={v} /> },
  ];

  const openAdd = () => {
    setEditing(null);
    setForm(emptyVehicle);
    setError('');
    setModalOpen(true);
  };

  const openEdit = (vehicle) => {
    setEditing(vehicle.id);
    setForm({ ...vehicle });
    setError('');
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      maxLoadCapacity: Number(form.maxLoadCapacity),
      odometer: Number(form.odometer),
      acquisitionCost: Number(form.acquisitionCost),
    };
    const err = editing ? updateVehicle(editing, payload) : addVehicle(payload);
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
          <h1 className="page-title">Vehicle Registry</h1>
          <p className="page-subtitle">{vehicles.length} vehicles registered</p>
        </div>
        <button className="btn btn-primary" onClick={openAdd}>+ Add Vehicle</button>
      </div>

      <DataTable
        columns={columns}
        data={vehicles}
        renderActions={(row) => (
          <button className="btn btn-ghost btn-sm" onClick={() => openEdit(row)}>Edit</button>
        )}
      />

      <Modal title={editing ? 'Edit Vehicle' : 'Add Vehicle'} isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Registration Number</label>
              <input className="form-input" value={form.registrationNumber} onChange={set('registrationNumber')} placeholder="MH-12-AB-1234" required />
            </div>
            <div className="form-group">
              <label className="form-label">Vehicle Name / Model</label>
              <input className="form-input" value={form.name} onChange={set('name')} placeholder="Tata Prima" required />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Type</label>
              <select className="form-select" value={form.type} onChange={set('type')}>
                {VEHICLE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Max Load Capacity (kg)</label>
              <input className="form-input" type="number" value={form.maxLoadCapacity} onChange={set('maxLoadCapacity')} required />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Odometer (km)</label>
              <input className="form-input" type="number" value={form.odometer} onChange={set('odometer')} required />
            </div>
            <div className="form-group">
              <label className="form-label">Acquisition Cost (₹)</label>
              <input className="form-input" type="number" value={form.acquisitionCost} onChange={set('acquisitionCost')} required />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Region</label>
              <select className="form-select" value={form.region} onChange={set('region')}>
                {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Status</label>
              <select className="form-select" value={form.status} onChange={set('status')}>
                {VEHICLE_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          {error && <div className="form-error">{error}</div>}
          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">{editing ? 'Update' : 'Add Vehicle'}</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
