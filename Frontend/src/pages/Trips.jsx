import { useState } from 'react';
import { useData } from '../DataContext';
import DataTable from '../components/DataTable';
import StatusBadge from '../components/StatusBadge';
import Modal from '../components/Modal';
import { CITIES } from '../data';

const emptyTrip = {
  source: '', destination: '', vehicleId: '', driverId: '',
  cargoWeight: '', plannedDistance: '', revenue: '',
};

export default function Trips() {
  const {
    trips, vehicles, drivers,
    createTrip, dispatchTrip, completeTrip, cancelTrip,
    getAvailableVehicles, getAvailableDrivers,
  } = useData();
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(emptyTrip);
  const [error, setError] = useState('');
  const [toast, setToast] = useState('');

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const vehicleMap = Object.fromEntries(vehicles.map(v => [v.id, v]));
  const driverMap = Object.fromEntries(drivers.map(d => [d.id, d]));

  const columns = [
    { key: 'id', label: 'Trip ID' },
    { key: 'source', label: 'Route', render: (_, row) => `${row.source} → ${row.destination}` },
    { key: 'vehicleId', label: 'Vehicle', render: v => vehicleMap[v]?.registrationNumber || '—' },
    { key: 'driverId', label: 'Driver', render: v => driverMap[v]?.name || '—' },
    { key: 'cargoWeight', label: 'Cargo (kg)', render: v => v?.toLocaleString() },
    { key: 'plannedDistance', label: 'Distance (km)' },
    { key: 'revenue', label: 'Revenue (₹)', render: v => `₹${v?.toLocaleString()}` },
    { key: 'status', label: 'Status', render: v => <StatusBadge status={v} /> },
    { key: 'createdAt', label: 'Created' },
  ];

  const handleAction = (action, trip) => {
    let err;
    if (action === 'dispatch') err = dispatchTrip(trip.id);
    else if (action === 'complete') err = completeTrip(trip.id);
    else if (action === 'cancel') err = cancelTrip(trip.id);
    if (err) showToast(err);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      vehicleId: form.vehicleId || null,
      driverId: form.driverId || null,
      cargoWeight: Number(form.cargoWeight),
      plannedDistance: Number(form.plannedDistance),
      revenue: Number(form.revenue),
    };
    const err = createTrip(payload);
    if (err) {
      setError(err);
    } else {
      setModalOpen(false);
    }
  };

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));

  const availableVehicles = getAvailableVehicles();
  const availableDrivers = getAvailableDrivers();
  const selectedVehicle = form.vehicleId ? vehicles.find(v => v.id === form.vehicleId) : null;

  return (
    <div className="animate-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Trip Management</h1>
          <p className="page-subtitle">{trips.length} trips total</p>
        </div>
        <button className="btn btn-primary" onClick={() => { setForm(emptyTrip); setError(''); setModalOpen(true); }}>
          + Create Trip
        </button>
      </div>

      {toast && <div className="toast toast-error">{toast}</div>}

      <DataTable
        columns={columns}
        data={trips}
        renderActions={(row) => (
          <>
            {row.status === 'Draft' && (
              <button className="btn btn-success btn-sm" onClick={() => handleAction('dispatch', row)}>Dispatch</button>
            )}
            {row.status === 'Dispatched' && (
              <button className="btn btn-success btn-sm" onClick={() => handleAction('complete', row)}>Complete</button>
            )}
            {(row.status === 'Draft' || row.status === 'Dispatched') && (
              <button className="btn btn-danger btn-sm" onClick={() => handleAction('cancel', row)}>Cancel</button>
            )}
          </>
        )}
      />

      <Modal title="Create Trip" isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Source</label>
              <select className="form-select" value={form.source} onChange={set('source')} required>
                <option value="">Select City</option>
                {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Destination</label>
              <select className="form-select" value={form.destination} onChange={set('destination')} required>
                <option value="">Select City</option>
                {CITIES.filter(c => c !== form.source).map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Vehicle (optional for draft)</label>
              <select className="form-select" value={form.vehicleId} onChange={set('vehicleId')}>
                <option value="">Select Vehicle</option>
                {availableVehicles.map(v => (
                  <option key={v.id} value={v.id}>{v.registrationNumber} — {v.name}</option>
                ))}
              </select>
              {selectedVehicle && (
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>
                  Max capacity: {selectedVehicle.maxLoadCapacity.toLocaleString()} kg
                </span>
              )}
            </div>
            <div className="form-group">
              <label className="form-label">Driver (optional for draft)</label>
              <select className="form-select" value={form.driverId} onChange={set('driverId')}>
                <option value="">Select Driver</option>
                {availableDrivers.map(d => (
                  <option key={d.id} value={d.id}>{d.name} — Score: {d.safetyScore}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Cargo Weight (kg)</label>
              <input className="form-input" type="number" value={form.cargoWeight} onChange={set('cargoWeight')} required />
            </div>
            <div className="form-group">
              <label className="form-label">Planned Distance (km)</label>
              <input className="form-input" type="number" value={form.plannedDistance} onChange={set('plannedDistance')} required />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Revenue (₹)</label>
            <input className="form-input" type="number" value={form.revenue} onChange={set('revenue')} required />
          </div>
          {error && <div className="form-error">{error}</div>}
          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Create Trip</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
