import { createContext, useContext, useState, useCallback } from "react";

const NotiContext = createContext();

export function NotiProvider({ children }) {
  const [message, setMessage] = useState(null);

  const showMessage = useCallback((msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), 3000);
  }, []);

  return (
    <NotiContext.Provider value={{ showMessage }}>
      {children}
      {message && <Notification message={message} />}
    </NotiContext.Provider>
  );
}

export function useNoti() {
  return useContext(NotiContext);
}

function Notification({ message }) {
  return <div className="notification">{message}</div>;
}
