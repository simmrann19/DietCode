import { useState, useMemo } from 'react';
import { useData } from '../DataContext';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import { EXPENSE_TYPES } from '../data';

export default function Fuel() {
  const { vehicles, fuelLogs, expenses, maintenance, addFuelLog, addExpense } = useData();
  const [activeTab, setActiveTab] = useState('fuel');
  const [fuelModalOpen, setFuelModalOpen] = useState(false);
  const [expenseModalOpen, setExpenseModalOpen] = useState(false);
  const [fuelForm, setFuelForm] = useState({ vehicleId: '', liters: '', cost: '', date: '', odometer: '' });
  const [expenseForm, setExpenseForm] = useState({ vehicleId: '', type: 'Toll', description: '', cost: '', date: '' });

  const vehicleMap = Object.fromEntries(vehicles.map(v => [v.id, v]));

  const costSummary = useMemo(() => {
    const costs = {};
    vehicles.forEach(v => { costs[v.id] = { fuel: 0, maintenance: 0, expenses: 0 }; });
    fuelLogs.forEach(f => { if (costs[f.vehicleId]) costs[f.vehicleId].fuel += f.cost; });
    maintenance.forEach(m => { if (costs[m.vehicleId]) costs[m.vehicleId].maintenance += m.cost; });
    expenses.forEach(e => { if (costs[e.vehicleId]) costs[e.vehicleId].expenses += e.cost; });

    return vehicles.map(v => ({
      id: v.id,
      registrationNumber: v.registrationNumber,
      name: v.name,
      fuel: costs[v.id]?.fuel || 0,
      maintenance: costs[v.id]?.maintenance || 0,
      expenses: costs[v.id]?.expenses || 0,
      total: (costs[v.id]?.fuel || 0) + (costs[v.id]?.maintenance || 0) + (costs[v.id]?.expenses || 0),
    })).sort((a, b) => b.total - a.total);
  }, [vehicles, fuelLogs, maintenance, expenses]);

  const fuelColumns = [
    { key: 'vehicleId', label: 'Vehicle', render: v => vehicleMap[v]?.registrationNumber || v },
    { key: 'liters', label: 'Liters' },
    { key: 'cost', label: 'Cost (₹)', render: v => `₹${v?.toLocaleString()}` },
    { key: 'date', label: 'Date' },
    { key: 'odometer', label: 'Odometer (km)', render: v => v?.toLocaleString() },
  ];

  const expenseColumns = [
    { key: 'vehicleId', label: 'Vehicle', render: v => vehicleMap[v]?.registrationNumber || v },
    { key: 'type', label: 'Type' },
    { key: 'description', label: 'Description' },
    { key: 'cost', label: 'Cost (₹)', render: v => `₹${v?.toLocaleString()}` },
    { key: 'date', label: 'Date' },
  ];

  const costColumns = [
    { key: 'registrationNumber', label: 'Vehicle' },
    { key: 'name', label: 'Model' },
    { key: 'fuel', label: 'Fuel (₹)', render: v => `₹${v.toLocaleString()}` },
    { key: 'maintenance', label: 'Maintenance (₹)', render: v => `₹${v.toLocaleString()}` },
    { key: 'expenses', label: 'Other (₹)', render: v => `₹${v.toLocaleString()}` },
    { key: 'total', label: 'Total (₹)', render: v => <strong className="text-accent">₹{v.toLocaleString()}</strong> },
  ];

  const handleFuelSubmit = (e) => {
    e.preventDefault();
    addFuelLog({
      ...fuelForm,
      liters: Number(fuelForm.liters),
      cost: Number(fuelForm.cost),
      odometer: Number(fuelForm.odometer),
    });
    setFuelModalOpen(false);
  };

  const handleExpenseSubmit = (e) => {
    e.preventDefault();
    addExpense({ ...expenseForm, cost: Number(expenseForm.cost) });
    setExpenseModalOpen(false);
  };

  const setFuel = (field) => (e) => setFuelForm(f => ({ ...f, [field]: e.target.value }));
  const setExp = (field) => (e) => setExpenseForm(f => ({ ...f, [field]: e.target.value }));

  return (
    <div className="animate-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Fuel & Expenses</h1>
          <p className="page-subtitle">Operational cost tracking</p>
        </div>
        <div className="page-actions">
          <button className="btn btn-primary" onClick={() => { setFuelForm({ vehicleId: '', liters: '', cost: '', date: '', odometer: '' }); setFuelModalOpen(true); }}>
            + Fuel Log
          </button>
          <button className="btn btn-secondary" onClick={() => { setExpenseForm({ vehicleId: '', type: 'Toll', description: '', cost: '', date: '' }); setExpenseModalOpen(true); }}>
            + Expense
          </button>
        </div>
      </div>

      <div className="tab-segment">
        {['fuel', 'expenses', 'summary'].map(tab => (
          <button
            key={tab}
            className={`btn btn-sm ${activeTab === tab ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'fuel' ? 'Fuel Logs' : tab === 'expenses' ? 'Expenses' : 'Cost Summary'}
          </button>
        ))}
      </div>

      {activeTab === 'fuel' && <DataTable columns={fuelColumns} data={fuelLogs} />}
      {activeTab === 'expenses' && <DataTable columns={expenseColumns} data={expenses} />}
      {activeTab === 'summary' && <DataTable columns={costColumns} data={costSummary} />}

      <Modal title="Add Fuel Log" isOpen={fuelModalOpen} onClose={() => setFuelModalOpen(false)}>
        <form onSubmit={handleFuelSubmit}>
          <div className="form-group">
            <label className="form-label">Vehicle</label>
            <select className="form-select" value={fuelForm.vehicleId} onChange={setFuel('vehicleId')} required>
              <option value="">Select Vehicle</option>
              {vehicles.map(v => <option key={v.id} value={v.id}>{v.registrationNumber} — {v.name}</option>)}
            </select>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Liters</label>
              <input className="form-input" type="number" step="0.1" value={fuelForm.liters} onChange={setFuel('liters')} required />
            </div>
            <div className="form-group">
              <label className="form-label">Cost (₹)</label>
              <input className="form-input" type="number" value={fuelForm.cost} onChange={setFuel('cost')} required />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Date</label>
              <input className="form-input" type="date" value={fuelForm.date} onChange={setFuel('date')} required />
            </div>
            <div className="form-group">
              <label className="form-label">Odometer (km)</label>
              <input className="form-input" type="number" value={fuelForm.odometer} onChange={setFuel('odometer')} required />
            </div>
          </div>
          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={() => setFuelModalOpen(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Add Log</button>
          </div>
        </form>
      </Modal>

      <Modal title="Add Expense" isOpen={expenseModalOpen} onClose={() => setExpenseModalOpen(false)}>
        <form onSubmit={handleExpenseSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Vehicle</label>
              <select className="form-select" value={expenseForm.vehicleId} onChange={setExp('vehicleId')} required>
                <option value="">Select Vehicle</option>
                {vehicles.map(v => <option key={v.id} value={v.id}>{v.registrationNumber} — {v.name}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Type</label>
              <select className="form-select" value={expenseForm.type} onChange={setExp('type')}>
                {EXPENSE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Description</label>
            <input className="form-input" value={expenseForm.description} onChange={setExp('description')} placeholder="e.g. Mumbai-Pune Expressway toll" required />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Cost (₹)</label>
              <input className="form-input" type="number" value={expenseForm.cost} onChange={setExp('cost')} required />
            </div>
            <div className="form-group">
              <label className="form-label">Date</label>
              <input className="form-input" type="date" value={expenseForm.date} onChange={setExp('date')} required />
            </div>
          </div>
          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={() => setExpenseModalOpen(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Add Expense</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
