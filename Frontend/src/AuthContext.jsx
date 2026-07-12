import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

const USERS = [
  { email: 'admin@transitops.in', password: 'admin123', name: 'Admin', role: 'Fleet Manager' },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('transitops_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (email, password) => {
    const found = USERS.find(u => u.email === email && u.password === password);
    if (!found) return 'Invalid email or password';
    const userData = { email: found.email, name: found.name, role: found.role };
    setUser(userData);
    localStorage.setItem('transitops_user', JSON.stringify(userData));
    return null;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('transitops_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
