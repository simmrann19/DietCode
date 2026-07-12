import { createContext, useContext, useState } from 'react';
import {
  initialVehicles, initialDrivers, initialTrips,
  initialMaintenance, initialFuelLogs, initialExpenses, generateId
} from './data';

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [vehicles, setVehicles] = useState(initialVehicles);
  const [drivers, setDrivers] = useState(initialDrivers);
  const [trips, setTrips] = useState(initialTrips);
  const [maintenance, setMaintenance] = useState(initialMaintenance);
  const [fuelLogs, setFuelLogs] = useState(initialFuelLogs);
  const [expenses, setExpenses] = useState(initialExpenses);

  const addVehicle = (vehicle) => {
    const exists = vehicles.find(v => v.registrationNumber === vehicle.registrationNumber);
    if (exists) return 'Registration number already exists';
    setVehicles(prev => [...prev, { ...vehicle, id: generateId('V') }]);
    return null;
  };

  const updateVehicle = (id, updates) => {
    if (updates.registrationNumber) {
      const exists = vehicles.find(v => v.registrationNumber === updates.registrationNumber && v.id !== id);
      if (exists) return 'Registration number already exists';
    }
    setVehicles(prev => prev.map(v => v.id === id ? { ...v, ...updates } : v));
    return null;
  };

  const addDriver = (driver) => {
    setDrivers(prev => [...prev, { ...driver, id: generateId('D') }]);
    return null;
  };

  const updateDriver = (id, updates) => {
    setDrivers(prev => prev.map(d => d.id === id ? { ...d, ...updates } : d));
    return null;
  };

  const getAvailableVehicles = () => {
    return vehicles.filter(v => v.status === 'Available');
  };

  const getAvailableDrivers = () => {
    return drivers.filter(d => {
      if (d.status !== 'Available') return false;
      if (new Date(d.licenseExpiry) < new Date()) return false;
      return true;
    });
  };

  const createTrip = (trip) => {
    if (trip.vehicleId) {
      const vehicle = vehicles.find(v => v.id === trip.vehicleId);
      if (!vehicle) return 'Vehicle not found';
      if (vehicle.status !== 'Available') return 'Vehicle is not available';
      if (trip.cargoWeight > vehicle.maxLoadCapacity) {
        return `Cargo weight exceeds vehicle capacity (${vehicle.maxLoadCapacity.toLocaleString()} kg)`;
      }
    }
    if (trip.driverId) {
      const driver = drivers.find(d => d.id === trip.driverId);
      if (!driver) return 'Driver not found';
      if (driver.status !== 'Available') return 'Driver is not available';
      if (new Date(driver.licenseExpiry) < new Date()) return 'Driver license has expired';
    }
    setTrips(prev => [...prev, {
      ...trip,
      id: generateId('T'),
      status: 'Draft',
      createdAt: new Date().toISOString().split('T')[0],
      completedAt: null,
    }]);
    return null;
  };

  const dispatchTrip = (tripId) => {
    const trip = trips.find(t => t.id === tripId);
    if (!trip) return 'Trip not found';
    if (trip.status !== 'Draft') return 'Only draft trips can be dispatched';
    if (!trip.vehicleId || !trip.driverId) return 'Vehicle and driver must be assigned before dispatch';

    const vehicle = vehicles.find(v => v.id === trip.vehicleId);
    if (!vehicle || vehicle.status !== 'Available') return 'Vehicle is not available';
    if (trip.cargoWeight > vehicle.maxLoadCapacity) return 'Cargo weight exceeds vehicle capacity';

    const driver = drivers.find(d => d.id === trip.driverId);
    if (!driver || driver.status !== 'Available') return 'Driver is not available';
    if (new Date(driver.licenseExpiry) < new Date()) return 'Driver license has expired';

    setTrips(prev => prev.map(t => t.id === tripId ? { ...t, status: 'Dispatched' } : t));
    setVehicles(prev => prev.map(v => v.id === trip.vehicleId ? { ...v, status: 'On Trip' } : v));
    setDrivers(prev => prev.map(d => d.id === trip.driverId ? { ...d, status: 'On Trip' } : d));
    return null;
  };

  const completeTrip = (tripId) => {
    const trip = trips.find(t => t.id === tripId);
    if (!trip) return 'Trip not found';
    if (trip.status !== 'Dispatched') return 'Only dispatched trips can be completed';

    setTrips(prev => prev.map(t => t.id === tripId ? { ...t, status: 'Completed', completedAt: new Date().toISOString().split('T')[0] } : t));
    setVehicles(prev => prev.map(v => v.id === trip.vehicleId ? { ...v, status: 'Available' } : v));
    setDrivers(prev => prev.map(d => d.id === trip.driverId ? { ...d, status: 'Available' } : d));
    return null;
  };

  const cancelTrip = (tripId) => {
    const trip = trips.find(t => t.id === tripId);
    if (!trip) return 'Trip not found';
    if (trip.status === 'Completed' || trip.status === 'Cancelled') return 'Cannot cancel this trip';

    if (trip.status === 'Dispatched') {
      setVehicles(prev => prev.map(v => v.id === trip.vehicleId ? { ...v, status: 'Available' } : v));
      setDrivers(prev => prev.map(d => d.id === trip.driverId ? { ...d, status: 'Available' } : d));
    }
    setTrips(prev => prev.map(t => t.id === tripId ? { ...t, status: 'Cancelled', revenue: 0 } : t));
    return null;
  };

  const createMaintenance = (record) => {
    const vehicle = vehicles.find(v => v.id === record.vehicleId);
    if (!vehicle) return 'Vehicle not found';
    if (vehicle.status === 'On Trip') return 'Cannot add vehicle to maintenance while on trip';

    setMaintenance(prev => [...prev, { ...record, id: generateId('M'), status: 'Active' }]);
    setVehicles(prev => prev.map(v => v.id === record.vehicleId ? { ...v, status: 'In Shop' } : v));
    return null;
  };

  const closeMaintenance = (id) => {
    const record = maintenance.find(m => m.id === id);
    if (!record) return 'Record not found';

    setMaintenance(prev => prev.map(m => m.id === id ? { ...m, status: 'Completed', endDate: new Date().toISOString().split('T')[0] } : m));
    const vehicle = vehicles.find(v => v.id === record.vehicleId);
    if (vehicle && vehicle.status !== 'Retired') {
      setVehicles(prev => prev.map(v => v.id === record.vehicleId ? { ...v, status: 'Available' } : v));
    }
    return null;
  };

  const addFuelLog = (log) => {
    setFuelLogs(prev => [...prev, { ...log, id: generateId('F') }]);
    return null;
  };

  const addExpense = (expense) => {
    setExpenses(prev => [...prev, { ...expense, id: generateId('E') }]);
    return null;
  };

  return (
    <DataContext.Provider value={{
      vehicles, drivers, trips, maintenance, fuelLogs, expenses,
      addVehicle, updateVehicle, addDriver, updateDriver,
      createTrip, dispatchTrip, completeTrip, cancelTrip,
      createMaintenance, closeMaintenance,
      addFuelLog, addExpense,
      getAvailableVehicles, getAvailableDrivers,
    }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
