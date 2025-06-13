import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { UserProvider } from "./context/UserContext.jsx"; 
import { ModalProvider } from "./context/loginBox.jsx"; 
import { BrowserRouter } from "react-router-dom";
import { LoadProvider } from "./context/loading.jsx"; 

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store.js"; // adjust path

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <UserProvider>
          <LoadProvider>
            <ModalProvider>
              <App />
            </ModalProvider>
          </LoadProvider>
        </UserProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
