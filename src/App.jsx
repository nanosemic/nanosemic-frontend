import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Pro from "./pages/productPage";
import "./App.css";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Services from "./pages/Services";
import Footer from "./components/Footer";
import CustomToast from "./components/toastContainer";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./components/Admin/AdminDashboard";
import Loader from "./components/loader";
import ProductPage from "./pages/productItem";
import Product from "./pages/productPage"
import ProductListingAdmin from "./components/Admin/ProducListingAdmin";
import ScrollToTop from "./components/scrollToTop";
import Cartboard from "./pages/cart";
import PrivateRoute from "./components/privateRoute";
import { useLoad } from "./context/loading";
import AddressUpdate from './components/AddressUpdate';
import SummaryPage from './pages/SummaryPage';
import OrderSuccess from './components/OrderSuccess';
import MyOrdersPage from './pages/MyOrdersPage';
import Account from "./pages/account";
function App() {
  const { loading } = useLoad();

  return (
    <>


      <Navbar />
      <ScrollToTop/>
      <CustomToast />
      {loading && <Loader />}
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/services" element={<Services />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
        <Route path="/product" element={<Product />} />
        
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="/productlist" element={<ProductListingAdmin />} />
        <Route path="/cart" element={<Cartboard />} />
        <Route path="/address" element={<AddressUpdate />} />
        <Route path="/summary" element={<SummaryPage />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/my-orders" element={<MyOrdersPage />} />
        <Route path="/account" element={<Account/>}>

        </Route>
        


      </Routes>
      <Footer />
      
    </>
  );
}

export default App;
