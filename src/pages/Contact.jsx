import  { useState } from "react";
import axios from "axios";
import { useLoad } from "../context/loading";
import { toast } from "react-toastify";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";
import { motion } from "framer-motion";
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    message: "",
  });
  const {loading,setLoading} = useLoad();
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send feedback to your backend API
      setLoading(true);
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/contact`, {
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        message: formData.message,
      },{withCredentials:true});
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/admin/savecontact`, {
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        message: formData.message,
      },{withCredentials:true});

      
      
     
      setFormData({
        name: "",
        email: "",
        mobile: "",
        message: "",
      });
      setLoading(false);
      toast.success("Form submitted successfully!");
      
    } catch (error) {
      console.error("Error saving feedback: ", error);
      toast.error("Failed to submit form. Please try again.");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-ogcolor min-h-96">
        <div
          className="relative bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/contact.jpg')`,
            minHeight: "70vh",
          }}
        >
          <div className="absolute inset-0 bg-black/60"></div>{" "}
          {/* Dark overlay */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-24"
          >
            <div className="text-center sm:text-left text-white">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-bold mb-8">
                Get In Touch
              </h1>

              <p className="text-lg sm:text-xl leading-relaxed">
                Have questions or need a hand?
                <br />
                Reach out to us—we’re always happy to help and just a message
                away!
              </p>
            </div>
          </motion.div>
        </div>
        <div className="min-h-screen bg-white flex flex-col md:flex-row px-6 md:px-20 py-12 gap-12">
          {/* Left Section - Info */}
          <div className="md:w-1/2 flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Contact Us
            </h1>
            <p className="text-gray-600 mb-8">
              Feel free to use the form, drop us an email or call us.
            </p>

            <div className="space-y-6 text-gray-700">
              <div className="flex items-center gap-4">
                <FaPhoneAlt className="text-orange-500" />
                <span>+91-1002002999</span>
              </div>
              <div className="flex items-center gap-4">
                <FaEnvelope className="text-orange-500" />
                <span>nanosemic.official@gmail.com</span>
              </div>
              <div className="flex items-center gap-4">
                <a
                  href="https://www.google.com/maps/dir//Nano+Semic+Nano+Semic+Pvt+Ltd,+Research+%26+Entrepreneurship+Park+C%2FO,+IIT+Bhubaneswar,+Kansapada,+Odisha+752050/@20.1495728,85.6742934,16z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3a19adf474fd646f:0x6362bd4580ab753f!2m2!1d85.6742934!2d20.1495728?entry=ttu&g_ep=EgoyMDI1MDUyNi4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className=""
                >
                <FaMapMarkerAlt className="text-orange-500" />
                </a>
                <div>
                  <p>
                    Nano Semic Pvt Ltd,
                    <br />
                    Research & Entrepreneurship Park, C/O <br />
                    IIT Bhubaneswar, Kansapada <br />
                    Odisha: 752050
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                
                  <FaClock className="text-orange-500 w-5 h-5" />
                
                <span className="text-sm text-gray-700">
                  <p>
                    Monday - Friday: 9am - 6pm <br />
                    Saturday: 9am - 4pm <br />
                    Sunday: Closed
                  </p>
                </span>
              </div>
            </div>
          </div>

          {/* Right Section - Form */}
          <div className="md:w-1/2 bg-white shadow-lg p-6 rounded-md">
            <form className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4">
               
                <input
                  type="text"
                  name ="name"
                  value={formData.name}
                  placeholder="Name"
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@email.com"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <input
                type="tel"
                name="mobile"
                placeholder="Mobile no."
                value={formData.mobile}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <textarea
                placeholder="Type your message ..."
                name="message"
                onChange={handleChange}
                value={formData.message}
                className="w-full border border-gray-300 rounded px-4 py-2 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <button
                type="button"
                onClick={handleSubmit}
                className="bg-orange-500 text-white font-semibold px-6 py-2 rounded-full hover:bg-orange-600 transition duration-200"
              >
                Submit
              </button>
            </form>
          </div>
        </div>

        

        
      </div>
    </>
  );
};

export default Contact;
