export const VEHICLE_TYPES = ['Truck', 'Van', 'Trailer', 'Bus'];
export const VEHICLE_STATUSES = ['Available', 'On Trip', 'In Shop', 'Retired'];
export const DRIVER_STATUSES = ['Available', 'On Trip', 'Off Duty', 'Suspended'];
export const TRIP_STATUSES = ['Draft', 'Dispatched', 'Completed', 'Cancelled'];
export const MAINTENANCE_TYPES = ['Scheduled', 'Repair', 'Inspection'];
export const EXPENSE_TYPES = ['Toll', 'Parking', 'Fine', 'Other'];
export const REGIONS = ['North', 'South', 'East', 'West', 'Central'];

export const CITIES = [
  'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad',
  'Pune', 'Ahmedabad', 'Kolkata', 'Jaipur', 'Lucknow',
  'Surat', 'Nagpur', 'Indore', 'Bhopal', 'Chandigarh'
];

export const initialVehicles = [
  { id: 'V001', registrationNumber: 'MH-12-AB-1234', name: 'Tata Prima', type: 'Truck', maxLoadCapacity: 25000, odometer: 145230, acquisitionCost: 3200000, status: 'Available', region: 'West' },
  { id: 'V002', registrationNumber: 'MH-14-CD-5678', name: 'Ashok Leyland 3520', type: 'Truck', maxLoadCapacity: 35000, odometer: 210450, acquisitionCost: 4100000, status: 'On Trip', region: 'West' },
  { id: 'V003', registrationNumber: 'DL-01-EF-9012', name: 'Mahindra Bolero Pickup', type: 'Van', maxLoadCapacity: 1500, odometer: 87650, acquisitionCost: 950000, status: 'Available', region: 'North' },
  { id: 'V004', registrationNumber: 'KA-05-GH-3456', name: 'Eicher Pro 3019', type: 'Truck', maxLoadCapacity: 19000, odometer: 178900, acquisitionCost: 2800000, status: 'In Shop', region: 'South' },
  { id: 'V005', registrationNumber: 'TN-09-IJ-7890', name: 'Tata 407', type: 'Van', maxLoadCapacity: 3500, odometer: 125000, acquisitionCost: 1100000, status: 'Available', region: 'South' },
  { id: 'V006', registrationNumber: 'GJ-06-KL-2345', name: 'BharatBenz 1617R', type: 'Truck', maxLoadCapacity: 16000, odometer: 195600, acquisitionCost: 2500000, status: 'On Trip', region: 'West' },
  { id: 'V007', registrationNumber: 'RJ-14-MN-6789', name: 'Tata Starbus', type: 'Bus', maxLoadCapacity: 5000, odometer: 230100, acquisitionCost: 5500000, status: 'Available', region: 'North' },
  { id: 'V008', registrationNumber: 'UP-32-OP-1357', name: 'Ashok Leyland Dost', type: 'Van', maxLoadCapacity: 2500, odometer: 67800, acquisitionCost: 780000, status: 'Retired', region: 'North' },
  { id: 'V009', registrationNumber: 'MH-04-QR-2468', name: 'Volvo FH16', type: 'Trailer', maxLoadCapacity: 40000, odometer: 310500, acquisitionCost: 7200000, status: 'Available', region: 'West' },
  { id: 'V010', registrationNumber: 'KA-01-ST-1359', name: 'Eicher Pro 6049', type: 'Trailer', maxLoadCapacity: 49000, odometer: 256700, acquisitionCost: 5800000, status: 'On Trip', region: 'South' },
  { id: 'V011', registrationNumber: 'AP-07-UV-8024', name: 'Tata Ultra 1918', type: 'Truck', maxLoadCapacity: 18000, odometer: 142300, acquisitionCost: 2400000, status: 'Available', region: 'South' },
  { id: 'V012', registrationNumber: 'MP-09-WX-4680', name: 'Mahindra Furio', type: 'Truck', maxLoadCapacity: 14000, odometer: 98700, acquisitionCost: 1900000, status: 'Available', region: 'Central' },
];

export const initialDrivers = [
  { id: 'D001', name: 'Rajesh Kumar', licenseNumber: 'MH-2018-0012345', licenseCategory: 'HMV', licenseExpiry: '2027-03-15', contactNumber: '9876543210', safetyScore: 92, status: 'Available' },
  { id: 'D002', name: 'Suresh Patil', licenseNumber: 'MH-2019-0067890', licenseCategory: 'HMV', licenseExpiry: '2026-11-20', contactNumber: '9876543211', safetyScore: 87, status: 'On Trip' },
  { id: 'D003', name: 'Amit Sharma', licenseNumber: 'DL-2020-0034567', licenseCategory: 'LMV', licenseExpiry: '2028-06-10', contactNumber: '9876543212', safetyScore: 95, status: 'Available' },
  { id: 'D004', name: 'Vikram Singh', licenseNumber: 'RJ-2017-0089012', licenseCategory: 'HMV', licenseExpiry: '2025-01-05', contactNumber: '9876543213', safetyScore: 78, status: 'Off Duty' },
  { id: 'D005', name: 'Manoj Yadav', licenseNumber: 'KA-2021-0045678', licenseCategory: 'HMV', licenseExpiry: '2029-08-22', contactNumber: '9876543214', safetyScore: 91, status: 'Available' },
  { id: 'D006', name: 'Pradeep Joshi', licenseNumber: 'UP-2019-0023456', licenseCategory: 'HMV', licenseExpiry: '2027-12-30', contactNumber: '9876543215', safetyScore: 65, status: 'Suspended' },
  { id: 'D007', name: 'Arjun Reddy', licenseNumber: 'TN-2020-0078901', licenseCategory: 'HMV', licenseExpiry: '2028-04-18', contactNumber: '9876543216', safetyScore: 88, status: 'On Trip' },
  { id: 'D008', name: 'Kiran Desai', licenseNumber: 'GJ-2018-0056789', licenseCategory: 'LMV', licenseExpiry: '2026-09-12', contactNumber: '9876543217', safetyScore: 94, status: 'Available' },
  { id: 'D009', name: 'Ravi Verma', licenseNumber: 'MP-2022-0012345', licenseCategory: 'HMV', licenseExpiry: '2030-02-28', contactNumber: '9876543218', safetyScore: 82, status: 'Available' },
  { id: 'D010', name: 'Sandeep Nair', licenseNumber: 'AP-2019-0098765', licenseCategory: 'HMV', licenseExpiry: '2027-07-05', contactNumber: '9876543219', safetyScore: 89, status: 'On Trip' },
];

export const initialTrips = [
  { id: 'T001', source: 'Mumbai', destination: 'Pune', vehicleId: 'V002', driverId: 'D002', cargoWeight: 22000, plannedDistance: 150, status: 'Dispatched', createdAt: '2026-07-01', completedAt: null, revenue: 45000 },
  { id: 'T002', source: 'Delhi', destination: 'Jaipur', vehicleId: 'V003', driverId: 'D003', cargoWeight: 1200, plannedDistance: 280, status: 'Completed', createdAt: '2026-06-28', completedAt: '2026-06-29', revenue: 35000 },
  { id: 'T003', source: 'Bangalore', destination: 'Chennai', vehicleId: 'V010', driverId: 'D007', cargoWeight: 38000, plannedDistance: 350, status: 'Dispatched', createdAt: '2026-07-05', completedAt: null, revenue: 72000 },
  { id: 'T004', source: 'Ahmedabad', destination: 'Mumbai', vehicleId: 'V006', driverId: 'D010', cargoWeight: 14000, plannedDistance: 530, status: 'Dispatched', createdAt: '2026-07-08', completedAt: null, revenue: 58000 },
  { id: 'T005', source: 'Hyderabad', destination: 'Nagpur', vehicleId: null, driverId: null, cargoWeight: 10000, plannedDistance: 500, status: 'Draft', createdAt: '2026-07-10', completedAt: null, revenue: 42000 },
  { id: 'T006', source: 'Lucknow', destination: 'Delhi', vehicleId: 'V003', driverId: 'D003', cargoWeight: 1000, plannedDistance: 500, status: 'Completed', createdAt: '2026-06-15', completedAt: '2026-06-16', revenue: 28000 },
  { id: 'T007', source: 'Kolkata', destination: 'Bhopal', vehicleId: null, driverId: null, cargoWeight: 15000, plannedDistance: 1400, status: 'Draft', createdAt: '2026-07-11', completedAt: null, revenue: 95000 },
  { id: 'T008', source: 'Pune', destination: 'Nagpur', vehicleId: 'V001', driverId: 'D001', cargoWeight: 20000, plannedDistance: 720, status: 'Completed', createdAt: '2026-06-20', completedAt: '2026-06-22', revenue: 65000 },
  { id: 'T009', source: 'Surat', destination: 'Ahmedabad', vehicleId: 'V005', driverId: 'D005', cargoWeight: 2500, plannedDistance: 265, status: 'Cancelled', createdAt: '2026-06-25', completedAt: null, revenue: 0 },
  { id: 'T010', source: 'Chennai', destination: 'Hyderabad', vehicleId: 'V011', driverId: 'D009', cargoWeight: 16000, plannedDistance: 630, status: 'Completed', createdAt: '2026-06-10', completedAt: '2026-06-12', revenue: 52000 },
  { id: 'T011', source: 'Jaipur', destination: 'Chandigarh', vehicleId: null, driverId: null, cargoWeight: 8000, plannedDistance: 670, status: 'Draft', createdAt: '2026-07-12', completedAt: null, revenue: 48000 },
  { id: 'T012', source: 'Indore', destination: 'Bhopal', vehicleId: 'V012', driverId: 'D008', cargoWeight: 5000, plannedDistance: 190, status: 'Completed', createdAt: '2026-06-05', completedAt: '2026-06-05', revenue: 18000 },
];

export const initialMaintenance = [
  { id: 'M001', vehicleId: 'V004', type: 'Repair', description: 'Engine overhaul', cost: 85000, startDate: '2026-07-01', endDate: null, status: 'Active' },
  { id: 'M002', vehicleId: 'V001', type: 'Scheduled', description: 'Regular service - 150000km', cost: 15000, startDate: '2026-06-25', endDate: '2026-06-27', status: 'Completed' },
  { id: 'M003', vehicleId: 'V002', type: 'Inspection', description: 'Annual fitness inspection', cost: 5000, startDate: '2026-06-20', endDate: '2026-06-20', status: 'Completed' },
  { id: 'M004', vehicleId: 'V006', type: 'Repair', description: 'Brake pad replacement', cost: 12000, startDate: '2026-06-15', endDate: '2026-06-16', status: 'Completed' },
  { id: 'M005', vehicleId: 'V009', type: 'Scheduled', description: 'Oil change and filter replacement', cost: 8000, startDate: '2026-06-28', endDate: '2026-06-28', status: 'Completed' },
  { id: 'M006', vehicleId: 'V010', type: 'Inspection', description: 'Pre-trip safety inspection', cost: 3000, startDate: '2026-07-04', endDate: '2026-07-04', status: 'Completed' },
  { id: 'M007', vehicleId: 'V007', type: 'Scheduled', description: 'Tire rotation and alignment', cost: 18000, startDate: '2026-06-10', endDate: '2026-06-11', status: 'Completed' },
  { id: 'M008', vehicleId: 'V003', type: 'Repair', description: 'Clutch plate replacement', cost: 22000, startDate: '2026-05-20', endDate: '2026-05-23', status: 'Completed' },
];

export const initialFuelLogs = [
  { id: 'F001', vehicleId: 'V001', liters: 120, cost: 12000, date: '2026-07-01', odometer: 145100 },
  { id: 'F002', vehicleId: 'V002', liters: 180, cost: 18000, date: '2026-07-02', odometer: 210200 },
  { id: 'F003', vehicleId: 'V003', liters: 45, cost: 4500, date: '2026-06-30', odometer: 87500 },
  { id: 'F004', vehicleId: 'V005', liters: 60, cost: 6000, date: '2026-07-03', odometer: 124800 },
  { id: 'F005', vehicleId: 'V006', liters: 150, cost: 15000, date: '2026-07-05', odometer: 195300 },
  { id: 'F006', vehicleId: 'V009', liters: 200, cost: 20000, date: '2026-07-01', odometer: 310200 },
  { id: 'F007', vehicleId: 'V010', liters: 250, cost: 25000, date: '2026-07-04', odometer: 256400 },
  { id: 'F008', vehicleId: 'V001', liters: 130, cost: 13000, date: '2026-06-20', odometer: 144500 },
  { id: 'F009', vehicleId: 'V002', liters: 170, cost: 17000, date: '2026-06-25', odometer: 209800 },
  { id: 'F010', vehicleId: 'V011', liters: 140, cost: 14000, date: '2026-06-28', odometer: 142000 },
  { id: 'F011', vehicleId: 'V012', liters: 80, cost: 8000, date: '2026-07-01', odometer: 98500 },
  { id: 'F012', vehicleId: 'V007', liters: 160, cost: 16000, date: '2026-06-15', odometer: 229800 },
  { id: 'F013', vehicleId: 'V004', liters: 140, cost: 14000, date: '2026-06-20', odometer: 178600 },
  { id: 'F014', vehicleId: 'V006', liters: 140, cost: 14000, date: '2026-06-28', odometer: 195000 },
  { id: 'F015', vehicleId: 'V003', liters: 50, cost: 5000, date: '2026-06-15', odometer: 87200 },
];

export const initialExpenses = [
  { id: 'E001', vehicleId: 'V001', type: 'Toll', description: 'Mumbai-Pune Expressway', cost: 1200, date: '2026-06-22' },
  { id: 'E002', vehicleId: 'V002', type: 'Toll', description: 'NH-48 Toll Plaza', cost: 800, date: '2026-07-02' },
  { id: 'E003', vehicleId: 'V003', type: 'Parking', description: 'Delhi warehouse parking', cost: 500, date: '2026-06-30' },
  { id: 'E004', vehicleId: 'V006', type: 'Toll', description: 'Multiple toll plazas - Ahmedabad route', cost: 2500, date: '2026-07-08' },
  { id: 'E005', vehicleId: 'V010', type: 'Toll', description: 'Bangalore-Chennai highway', cost: 1800, date: '2026-07-05' },
  { id: 'E006', vehicleId: 'V009', type: 'Parking', description: 'Port warehouse overnight', cost: 1000, date: '2026-07-01' },
  { id: 'E007', vehicleId: 'V001', type: 'Fine', description: 'Overweight penalty', cost: 5000, date: '2026-06-21' },
  { id: 'E008', vehicleId: 'V011', type: 'Toll', description: 'Hyderabad outer ring road', cost: 600, date: '2026-06-12' },
  { id: 'E009', vehicleId: 'V007', type: 'Parking', description: 'Bus depot charges', cost: 300, date: '2026-06-15' },
  { id: 'E010', vehicleId: 'V012', type: 'Toll', description: 'Indore-Bhopal highway', cost: 400, date: '2026-06-05' },
];

export function generateId(prefix) {
  return `${prefix}${String(Date.now()).slice(-6)}`;
}
