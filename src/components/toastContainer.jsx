import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function CustomToast() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={2400}
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover
      theme="dark"
      toastStyle={{
        backgroundColor: "#1f1f1f",
        color: "#fff",
        border: "1px solid #333",
        borderRadius: "12px",
        padding: "16px",
        fontSize: "14px",
      }}
      bodyClassName="custom-toast-body"
      progressStyle={{
        background: "#00e676",
        height: "4px",
      }}
    />
  );
}

export default CustomToast;
