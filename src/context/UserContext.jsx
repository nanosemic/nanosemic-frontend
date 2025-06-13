import { createContext, useContext, useState } from 'react';

const UserContext = createContext(null);

// Custom hook to use context easily
export const useUser = () => useContext(UserContext);

// Provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // You can load from localStorage if needed

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
