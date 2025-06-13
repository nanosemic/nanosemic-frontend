import { createContext, useContext, useState } from 'react';

const LoadContext = createContext();

export const LoadProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");

  return (
    <LoadContext.Provider value={{ loading, setLoading,error, setError,toast,setToast }}>
      {children}
    </LoadContext.Provider>
  );
};

export const useLoad = () => useContext(LoadContext);
