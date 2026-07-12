import { useMemo } from 'react';
import { useData } from '../DataContext';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from 'recharts';

const COLORS = ['#FC7011', '#7BB15D', '#C43A23', '#F5A623', '#9E9E9F', '#4A90D9'];

const tooltipStyle = {
  backgroundColor: '#1a1a1d',
  border: '1px solid #2a2a2d',
  borderRadius: '8px',
  color: '#F8F8F8',
  fontSize: '12px',
};

export default function Reports() {
  const { vehicles, trips, fuelLogs, maintenance, expenses } = useData();

  const fuelEfficiency = useMemo(() => {
    const vehicleFuel = {};
    fuelLogs.forEach(f => {
      if (!vehicleFuel[f.vehicleId]) vehicleFuel[f.vehicleId] = 0;
      vehicleFuel[f.vehicleId] += f.liters;
    });
    const vehicleDistance = {};
    trips.filter(t => t.status === 'Completed').forEach(t => {
      if (!vehicleDistance[t.vehicleId]) vehicleDistance[t.vehicleId] = 0;
      vehicleDistance[t.vehicleId] += t.plannedDistance;
    });
    return vehicles
      .filter(v => vehicleFuel[v.id] && vehicleDistance[v.id])
      .map(v => ({
        name: v.registrationNumber,
        efficiency: Number((vehicleDistance[v.id] / vehicleFuel[v.id]).toFixed(2)),
      }))
      .sort((a, b) => b.efficiency - a.efficiency);
  }, [vehicles, trips, fuelLogs]);

  const fleetUtilization = useMemo(() => {
    const counts = { Available: 0, 'On Trip': 0, 'In Shop': 0, Retired: 0 };
    vehicles.forEach(v => { if (counts[v.status] !== undefined) counts[v.status]++; });
    return Object.entries(counts)
      .filter(([, value]) => value > 0)
      .map(([name, value]) => ({ name, value }));
  }, [vehicles]);

  const operationalCost = useMemo(() => {
    return vehicles.map(v => {
      const fuelCost = fuelLogs.filter(f => f.vehicleId === v.id).reduce((s, f) => s + f.cost, 0);
      const maintCost = maintenance.filter(m => m.vehicleId === v.id).reduce((s, m) => s + m.cost, 0);
      const other = expenses.filter(e => e.vehicleId === v.id).reduce((s, e) => s + e.cost, 0);
      return { name: v.registrationNumber, fuel: fuelCost, maintenance: maintCost, other };
    })
      .filter(v => v.fuel + v.maintenance + v.other > 0)
      .sort((a, b) => (b.fuel + b.maintenance + b.other) - (a.fuel + a.maintenance + a.other))
      .slice(0, 8);
  }, [vehicles, fuelLogs, maintenance, expenses]);

  const vehicleROI = useMemo(() => {
    return vehicles.map(v => {
      const revenue = trips
        .filter(t => t.vehicleId === v.id && t.status === 'Completed')
        .reduce((s, t) => s + t.revenue, 0);
      const fuelCost = fuelLogs.filter(f => f.vehicleId === v.id).reduce((s, f) => s + f.cost, 0);
      const maintCost = maintenance.filter(m => m.vehicleId === v.id).reduce((s, m) => s + m.cost, 0);
      const roi = v.acquisitionCost > 0
        ? Number(((revenue - fuelCost - maintCost) / v.acquisitionCost * 100).toFixed(1))
        : 0;
      return { name: v.registrationNumber, roi, revenue, costs: fuelCost + maintCost };
    })
      .filter(v => v.revenue > 0 || v.costs > 0)
      .sort((a, b) => b.roi - a.roi);
  }, [vehicles, trips, fuelLogs, maintenance]);

  const exportCSV = (data, filename) => {
    if (!data.length) return;
    const headers = Object.keys(data[0]);
    const csv = [
      headers.join(','),
      ...data.map(row => headers.map(h => row[h]).join(',')),
    ].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="animate-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Reports & Analytics</h1>
          <p className="page-subtitle">Fleet performance insights</p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn btn-secondary btn-sm" onClick={() => exportCSV(fuelEfficiency, 'fuel_efficiency')}>
            Export Fuel
          </button>
          <button className="btn btn-secondary btn-sm" onClick={() => exportCSV(vehicleROI, 'vehicle_roi')}>
            Export ROI
          </button>
          <button className="btn btn-primary btn-sm" onClick={() => exportCSV(operationalCost, 'operational_costs')}>
            Export Costs
          </button>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <h3 className="chart-title">Fuel Efficiency (km/L)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={fuelEfficiency}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2d" />
              <XAxis dataKey="name" stroke="#9E9E9F" fontSize={11} angle={-35} textAnchor="end" height={60} />
              <YAxis stroke="#9E9E9F" fontSize={11} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="efficiency" fill="#FC7011" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3 className="chart-title">Fleet Utilization</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={fleetUtilization}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
                labelLine={false}
              >
                {fleetUtilization.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: '12px', color: '#9E9E9F' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3 className="chart-title">Operational Cost Breakdown (Top 8)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={operationalCost}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2d" />
              <XAxis dataKey="name" stroke="#9E9E9F" fontSize={11} angle={-35} textAnchor="end" height={60} />
              <YAxis stroke="#9E9E9F" fontSize={11} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="fuel" stackId="a" fill="#FC7011" name="Fuel" />
              <Bar dataKey="maintenance" stackId="a" fill="#C43A23" name="Maintenance" />
              <Bar dataKey="other" stackId="a" fill="#F5A623" name="Other" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3 className="chart-title">Vehicle ROI (%)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={vehicleROI}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2d" />
              <XAxis dataKey="name" stroke="#9E9E9F" fontSize={11} angle={-35} textAnchor="end" height={60} />
              <YAxis stroke="#9E9E9F" fontSize={11} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="roi" fill="#7BB15D" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
