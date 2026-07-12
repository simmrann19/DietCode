import { useState, useMemo } from 'react';
import { useData } from '../DataContext';
import KPICard from '../components/KPICard';
import StatusBadge from '../components/StatusBadge';
import { VEHICLE_TYPES, VEHICLE_STATUSES, REGIONS } from '../data';

export default function Dashboard() {
  const { vehicles, drivers, trips } = useData();
  const [filterType, setFilterType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterRegion, setFilterRegion] = useState('');

  const filteredVehicles = useMemo(() => {
    return vehicles.filter(v => {
      if (filterType && v.type !== filterType) return false;
      if (filterStatus && v.status !== filterStatus) return false;
      if (filterRegion && v.region !== filterRegion) return false;
      return true;
    });
  }, [vehicles, filterType, filterStatus, filterRegion]);

  const kpis = useMemo(() => {
    const activeVehicles = filteredVehicles.filter(v => v.status === 'On Trip').length;
    const availableVehicles = filteredVehicles.filter(v => v.status === 'Available').length;
    const inMaintenance = filteredVehicles.filter(v => v.status === 'In Shop').length;
    const activeTrips = trips.filter(t => t.status === 'Dispatched').length;
    const pendingTrips = trips.filter(t => t.status === 'Draft').length;
    const driversOnDuty = drivers.filter(d => d.status === 'On Trip').length;
    const nonRetired = filteredVehicles.filter(v => v.status !== 'Retired').length;
    const utilization = nonRetired > 0 ? Math.round((activeVehicles / nonRetired) * 100) : 0;
    return { activeVehicles, availableVehicles, inMaintenance, activeTrips, pendingTrips, driversOnDuty, utilization };
  }, [filteredVehicles, trips, drivers]);

  const recentTrips = useMemo(() => {
    return [...trips].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);
  }, [trips]);

  const vehicleMap = Object.fromEntries(vehicles.map(v => [v.id, v]));
  const driverMap = Object.fromEntries(drivers.map(d => [d.id, d]));

  return (
    <div className="animate-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Fleet overview and key metrics</p>
        </div>
      </div>

      <div className="filter-bar">
        <select className="form-select" value={filterType} onChange={e => setFilterType(e.target.value)}>
          <option value="">All Types</option>
          {VEHICLE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <select className="form-select" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
          <option value="">All Statuses</option>
          {VEHICLE_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <select className="form-select" value={filterRegion} onChange={e => setFilterRegion(e.target.value)}>
          <option value="">All Regions</option>
          {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
      </div>

      <div className="kpi-grid">
        <KPICard
          label="Active Vehicles"
          value={kpis.activeVehicles}
          color="#FC7011"
          icon={<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 17h1l2-8h8l2 8h1"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="16.5" cy="17.5" r="2.5"/></svg>}
        />
        <KPICard
          label="Available Vehicles"
          value={kpis.availableVehicles}
          color="#7BB15D"
          icon={<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>}
        />
        <KPICard
          label="In Maintenance"
          value={kpis.inMaintenance}
          color="#C43A23"
          icon={<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>}
        />
        <KPICard
          label="Active Trips"
          value={kpis.activeTrips}
          color="#FC7011"
          icon={<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>}
        />
        <KPICard
          label="Pending Trips"
          value={kpis.pendingTrips}
          color="#F5A623"
          icon={<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>}
        />
        <KPICard
          label="Drivers On Duty"
          value={kpis.driversOnDuty}
          color="#7BB15D"
          icon={<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>}
        />
        <KPICard
          label="Fleet Utilization"
          value={`${kpis.utilization}%`}
          color="#FC7011"
          icon={<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>}
        />
      </div>

      <div className="card">
        <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '16px' }}>Recent Trips</h3>
        <div className="table-container" style={{ border: 'none' }}>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Route</th>
                <th>Vehicle</th>
                <th>Driver</th>
                <th>Status</th>
                <th>Cargo (kg)</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {recentTrips.map(trip => (
                <tr key={trip.id}>
                  <td>{trip.id}</td>
                  <td>{trip.source} → {trip.destination}</td>
                  <td>{vehicleMap[trip.vehicleId]?.registrationNumber || '—'}</td>
                  <td>{driverMap[trip.driverId]?.name || '—'}</td>
                  <td><StatusBadge status={trip.status} /></td>
                  <td>{trip.cargoWeight.toLocaleString()}</td>
                  <td>{trip.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
