import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { useLoad } from "../context/loading";

function Home() {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const { loading, setLoading } = useLoad();

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.55;
    }
  }, []);

  useEffect(() => {
    setLoading(true);
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute w-full h-full object-cover object-center z-0"
        onCanPlayThrough={() => setLoading(false)}
      >
        <source src="/video1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-10" />

      {/* Hero Section */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
        className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 md:px-10 bg-black bg-opacity-60 text-gray-200 rounded-xl shadow-2xl py-10 text-center mt-24 backdrop-blur-md"
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[65px] font-ancizar font-extrabold mb-4 text-[#f8fafc]">
          nanosemic
        </h1>
        <h2 className="text-base sm:text-lg font-semibold mb-6 text-[#cbd5e1]">
          Where precision meets possibilities
        </h2>
        <p className="text-sm sm:text-md text-[#e2e8f0] leading-relaxed mb-6 px-2 sm:px-6">
          Welcome to nanosemic, your trusted partner in the semiconductor
          industry. Our focus on innovation, quality, and customer satisfaction
          sets us apart from the competition. We are dedicated to delivering the
          best possible solutions to meet your needs. Our experienced team is
          always available to answer your questions and provide expert advice.
          We look forward to working with you to help you achieve your goals.
        </p>

        <Link to="/about">
          <button className="group relative h-12 w-full sm:w-[160px] items-center justify-center rounded-md border border-slate-600 bg-[linear-gradient(110deg,#1a1a1a,45%,#3a3a3a,55%,#1a1a1a)] bg-[length:200%_100%] px-6 font-medium text-slate-200 shadow-[0px_1px_0px_0px_#ffffff60_inset,0px_-1px_0px_0px_#ffffff60_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-700)_inset,0px_-1px_0px_0px_var(--zinc-700)_inset] transition-colors focus:outline-none animate-shimmer mt-4">
            <span className="flex w-full justify-center items-center gap-2">
              Learn More
            </span>
            <span className="group-hover:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></span>
            <span className="group-hover:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent"></span>
          </button>
        </Link>
      </motion.div>

      {/* WHAT WE OFFER Section */}
      <div className="relative z-20 max-w-6xl mx-auto mt-24 px-4 sm:px-6 pb-16">
        <h2 className="text-3xl sm:text-4xl text-white font-bold text-center mb-12">
          WHAT WE OFFER
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-10">
          {/* SERVICES */}
          <Link to="/services">
            <motion.div
              initial={{ x: 200, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.4, ease: "easeInOut" },
              }}
              className="bg-white/10 backdrop-blur-lg text-white rounded-2xl shadow-lg p-6 sm:p-8 hover:shadow-2xl border border-gray-200/20"
            >
              <h3 className="text-xl sm:text-2xl font-bold mb-4">OUR SERVICES</h3>
              <p className="text-sm sm:text-base text-gray-200 leading-relaxed">
                We provide cutting-edge consulting, rapid prototyping, and
                design services tailored to the semiconductor industry. Our
                experienced team supports you from concept to implementation
                with reliable expertise, innovation, and 24/7 support.
              </p>
            </motion.div>
          </Link>

          {/* PRODUCTS */}
          <Link to="/product">
            <motion.div
              initial={{ x: 200, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.4, ease: "easeInOut" },
              }}
              className="bg-white/10 backdrop-blur-lg text-white rounded-2xl shadow-lg p-6 sm:p-8 hover:shadow-2xl border border-gray-200/20"
            >
              <h3 className="text-xl sm:text-2xl font-bold mb-4">OUR PRODUCTS</h3>
              <p className="text-sm sm:text-base text-gray-200 leading-relaxed">
                Explore our suite of high-performance smart-sensing solutions and
                semiconductor components. Each product is designed with precision
                engineering to ensure performance, energy efficiency, and effortless
                integration into your systems and applications.
              </p>
            </motion.div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
