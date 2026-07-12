const statusClassMap = {
  'Available': 'badge-available',
  'On Trip': 'badge-on-trip',
  'In Shop': 'badge-in-shop',
  'Retired': 'badge-retired',
  'Off Duty': 'badge-off-duty',
  'Suspended': 'badge-suspended',
  'Draft': 'badge-draft',
  'Dispatched': 'badge-dispatched',
  'Completed': 'badge-completed',
  'Cancelled': 'badge-cancelled',
  'Active': 'badge-active',
};

export default function StatusBadge({ status }) {
  return (
    <span className={`badge ${statusClassMap[status] || ''}`}>
      <span className="badge-dot" />
      {status}
    </span>
  );
}
