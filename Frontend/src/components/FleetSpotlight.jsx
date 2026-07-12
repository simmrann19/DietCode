import StatusBadge from './StatusBadge';

export default function FleetSpotlight({ trip, vehicle, driver }) {
  if (!trip || !vehicle) {
    return (
      <div className="fleet-spotlight fleet-spotlight--empty">
        <div className="fleet-spotlight-truck">
          <svg viewBox="0 0 120 60" fill="none">
            <rect x="8" y="22" width="52" height="22" rx="4" fill="rgba(252,112,17,0.15)" stroke="var(--accent)" strokeWidth="1.5" />
            <path d="M60 28h28l8 16H60V28z" fill="rgba(252,112,17,0.1)" stroke="var(--accent)" strokeWidth="1.5" />
            <circle cx="24" cy="48" r="6" fill="var(--surface)" stroke="var(--accent)" strokeWidth="1.5" />
            <circle cx="24" cy="48" r="2" fill="var(--accent)" />
            <circle cx="84" cy="48" r="6" fill="var(--surface)" stroke="var(--accent)" strokeWidth="1.5" />
            <circle cx="84" cy="48" r="2" fill="var(--accent)" />
            <rect x="14" y="28" width="18" height="10" rx="2" fill="rgba(252,112,17,0.2)" />
          </svg>
        </div>
        <p>No active trips on the road</p>
      </div>
    );
  }

  const progress = 45 + (trip.id % 40);

  return (
    <div className="fleet-spotlight">
      <div className="fleet-spotlight-header">
        <div className="fleet-spotlight-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <path d="M5 17h1l2-8h8l2 8h1" />
            <circle cx="7.5" cy="17.5" r="2.5" />
            <circle cx="16.5" cy="17.5" r="2.5" />
          </svg>
        </div>
        <div>
          <div className="fleet-spotlight-title">{vehicle.registrationNumber}</div>
          <div className="fleet-spotlight-sub">{vehicle.name} · {vehicle.type}</div>
        </div>
        <StatusBadge status="On Trip" />
      </div>

      <div className="fleet-spotlight-route">
        <span>{trip.source}</span>
        <svg viewBox="0 0 24 8" width="24" height="8"><path d="M0 4h20M16 1l4 3-4 3" stroke="var(--accent)" strokeWidth="1.5" fill="none" /></svg>
        <span>{trip.destination}</span>
      </div>

      <div className="fleet-spotlight-progress">
        <div className="fleet-spotlight-progress-bar">
          <div className="fleet-spotlight-progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <div className="fleet-spotlight-progress-meta">
          <span>{progress}% complete</span>
          <span>{trip.plannedDistance} km</span>
        </div>
      </div>

      <div className="fleet-spotlight-stats">
        <div className="fleet-spotlight-stat">
          <span className="fleet-spotlight-stat-label">Driver</span>
          <span className="fleet-spotlight-stat-value">{driver?.name || '—'}</span>
        </div>
        <div className="fleet-spotlight-stat">
          <span className="fleet-spotlight-stat-label">Cargo</span>
          <span className="fleet-spotlight-stat-value">{trip.cargoWeight.toLocaleString()} kg</span>
        </div>
        <div className="fleet-spotlight-stat">
          <span className="fleet-spotlight-stat-label">Revenue</span>
          <span className="fleet-spotlight-stat-value text-accent">₹{trip.revenue.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
