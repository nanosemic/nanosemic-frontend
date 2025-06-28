import { useNavigate } from "react-router-dom";
import power from "../assets/powerk.jpg";
import simu from "../assets/simu.jpg";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useLoad } from "../context/loading";

function Services() {
  const navigate = useNavigate();
  const { loading, setLoading } = useLoad();

  useEffect(() => {
    setLoading(true);
    const img = new Image();
    img.src = '/services.jpg';
    img.onload = () => setLoading(false);
  }, []);

  return (
    <>
      {/* Services Header */}
      <div
        className="relative bg-cover bg-center h-[320px] sm:h-[400px] md:h-[440px]"
        style={{ backgroundImage: `url('/services.jpg')` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center h-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="text-center px-2 sm:px-6"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] text-white font-extrabold leading-snug mb-4">
              Solutions Designed for Your Success
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
              We specialize in delivering comprehensive solutions across the semiconductor development lifecycle. From advanced device design and simulation to precision modeling and technical consulting, our services are engineered to accelerate innovation and ensure performance at scale.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Workforce Training */}
      <section className="bg-white py-10 sm:py-16">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 flex flex-col lg:grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <img
              src="training.jpg"
              alt="Training"
              className="rounded-lg shadow-md w-full"
            />
          </motion.div>
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <div>
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                Semiconductor Workforce Training
              </h2>
              <p className="mt-6 text-lg text-gray-600">
                We offer carefully curated short-term and long-term courses and hands-on training for professionals, freshers, and students looking to upskill themselves. We also conduct technical workshops (for companies), faculty development programs (for engineering colleges and universities), and camps (for schools). Our goal is to bridge industry-academia knowledge through tailored training.
              </p>
              <div className="mt-6">
                <a
                  href="/Contact"
                  className="inline-block bg-indigo-600 text-white px-5 py-3 rounded-md hover:bg-indigo-500 text-sm font-semibold"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Power Devices */}
      <section className="bg-white py-10 sm:py-16">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 flex flex-col lg:grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <img
              src={power}
              alt="Power Devices"
              className="rounded-lg shadow-md w-full"
            />
          </motion.div>
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <div>
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                Power Devices
              </h2>
              <p className="mt-6 text-lg text-gray-600">
                We offer consultancy services for the design and development of a wide range of power semiconductor devices based on silicon, silicon carbide (SiC), and gallium nitride (GaN)...
              </p>
              <div className="mt-6">
                <a
                  href="/Contact"
                  className="inline-block bg-indigo-600 text-white px-5 py-3 rounded-md hover:bg-indigo-500 text-sm font-semibold"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Simulation & Modeling */}
      <section className="bg-white py-10 sm:py-16">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 flex flex-col lg:grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <img
              src={simu}
              alt="Simulation and Modeling"
              className="rounded-lg shadow-md w-full"
            />
          </motion.div>
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <div>
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                Semiconductor Simulation & Modeling
              </h2>
              <p className="mt-6 text-lg text-gray-600">
                We offer services for simulation, modeling, and design of devices including power devices, sensors, NAND memory, CMOS image sensors, and solar cells. This includes TCAD simulation, process calibration, and custom design support.
              </p>
              <div className="mt-6">
                <a
                  href="/Contact"
                  className="inline-block bg-indigo-600 text-white px-5 py-3 rounded-md hover:bg-indigo-500 text-sm font-semibold"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Technical Consulting */}
      <section className="bg-white py-10 sm:py-16">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 flex flex-col lg:grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <img
              src="/consulting.jpg"
              alt="Technical Consulting"
              className="rounded-lg shadow-md w-full"
            />
          </motion.div>
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <div>
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                Technical Consulting
              </h2>
              <p className="mt-6 text-lg text-gray-600">
                We specialize in delivering comprehensive solutions pertaining to semiconductor technology and workforce development. Our services range from conducting customised skill training programs to offering advanced device design, simulation, and modeling support for semiconductor R&D.
              </p>
              <div className="mt-6">
                <a
                  href="/Contact"
                  className="inline-block bg-indigo-600 text-white px-5 py-3 rounded-md hover:bg-indigo-500 text-sm font-semibold"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

export default Services;
