export default function FleetMap({ trips = [], vehicles = [], drivers = [] }) {
  const vehicleMap = Object.fromEntries(vehicles.map(v => [v.id, v]));
  const driverMap = Object.fromEntries(drivers.map(d => [d.id, d]));
  const activeTrips = trips.filter(t => t.status === 'Dispatched').slice(0, 4);
  const positions = [
    { x: 18, y: 62 }, { x: 42, y: 38 }, { x: 68, y: 55 }, { x: 82, y: 28 },
  ];

  return (
    <div className="fleet-map">
      <svg className="fleet-map-grid" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
            <path d="M 8 0 L 0 0 0 8" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.3" />
          </pattern>
          <linearGradient id="routeGlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.1" />
            <stop offset="50%" stopColor="var(--accent)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <rect width="100" height="100" fill="url(#grid)" />
        <path d="M 12 72 Q 35 45 58 58 T 88 32" fill="none" stroke="url(#routeGlow)" strokeWidth="0.8" strokeDasharray="2 1.5" />
        <path d="M 8 45 Q 30 65 55 42 T 92 68" fill="none" stroke="rgba(96,165,250,0.25)" strokeWidth="0.5" />
        <circle cx="58" cy="58" r="1.2" fill="var(--accent)" opacity="0.4" />
        <circle cx="58" cy="58" r="2.5" fill="none" stroke="var(--accent)" strokeWidth="0.3" opacity="0.5" />
      </svg>

      {activeTrips.map((trip, i) => {
        const pos = positions[i % positions.length];
        const vehicle = vehicleMap[trip.vehicleId];
        return (
          <div
            key={trip.id}
            className={`fleet-map-marker ${i === 0 ? 'fleet-map-marker--active' : ''}`}
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            title={`${trip.source} → ${trip.destination}`}
          >
            <div className="fleet-map-marker-pulse" />
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
              <path d="M5 17h1l2-8h8l2 8h1" />
              <circle cx="7.5" cy="17.5" r="2.5" />
              <circle cx="16.5" cy="17.5" r="2.5" />
            </svg>
            {i === 0 && (
              <div className="fleet-map-tooltip">
                <span className="fleet-map-tooltip-reg">{vehicle?.registrationNumber || trip.id}</span>
                <span className="fleet-map-tooltip-route">{trip.source} → {trip.destination}</span>
              </div>
            )}
          </div>
        );
      })}

      <div className="fleet-map-controls">
        <button type="button" className="fleet-map-control" aria-label="Zoom in">+</button>
        <button type="button" className="fleet-map-control" aria-label="Zoom out">−</button>
      </div>

      <div className="fleet-map-legend">
        <span><i className="dot dot--accent" /> {activeTrips.length} active</span>
        <span><i className="dot dot--muted" /> {vehicles.filter(v => v.status === 'Available').length} idle</span>
      </div>
    </div>
  );
}
