import { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <ModalContext.Provider value={{ isLoginOpen, setIsLoginOpen }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
