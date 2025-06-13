import { useNavigate } from "react-router-dom";
import power from "../assets/powerk.jpg";
import simu from "../assets/simu.jpg";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useLoad } from "../context/loading";

function Services() {
  const navigate = useNavigate();
  const {loading,setLoading} = useLoad();
  
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
        className="relative bg-cover bg-center h-[440px]"
        style={{ backgroundImage: `url('/services.jpg')` }}
      >
        {/* Overlay for darkening background */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content */}
        <div className="relative top-12 z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center ">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="relative z-10 text-center max-w-3xl"
          >
            <h2 className="text-5xl text-white md:text-[56px] font-extrabold leading-tight mb-4">
              Solutions Designed for Your Success
            </h2>
            <p className="text-[20px] text-gray-300 mb-3 leading-relaxed">
              We specialize in delivering comprehensive solutions across the
              semiconductor development lifecycle. From advanced device design
              and simulation to precision modeling and technical consulting, our
              services are engineered to accelerate innovation and ensure
              performance at scale.
            </p>
            {/* <p className="text-gray-400 text-md">
              Trusted by researchers, engineers, and makers across the globe.
            </p> */}
          </motion.div>
        </div>
      </div>

      <section className="bg-white py-10 sm:py-16">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <div>
              <img
                src="training.jpg"
                alt="Simulation and Modeling"
                className="rounded-lg shadow-md w-full"
              />
            </div>
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
                We offer carefully curated short-term and long-term courses and hands on training for professionals, freshers, and students looking for upskilling themselves to be ready for the rapidly evolving semiconductor technology ecosystem.  Further, we offer to conduct technical workshops (for companies), faculty development programs ( for engineering colleges and universities), and summer/winter camps (for schools). Our goal is to bridge industry-academia knowledge through tailored training programs.
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

      {/* Section 1: Power Devices */}
      <section className="bg-white py-10 sm:py-16">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Power Devices
            </h2>
            <p className="mt-6 text-lg text-gray-600">
              We offer consultancy services for the design and development of a
              wide range of power semiconductor devices based on silicon,
              silicon carbide (SiC), and gallium nitride (GaN)...
            </p>
            <div className="mt-6">
              <a
                href="/Contact"
                className="inline-block bg-indigo-600 text-white px-5 py-3 rounded-md hover:bg-indigo-500 text-sm font-semibold"
              >
                Contact Us
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <img
              src={power}
              alt="Power Devices"
              className="rounded-lg shadow-md w-full"
            />
          </motion.div>
        </div>
      </section>

      {/* Section 2: Semiconductor Simulation & Modeling */}
      <section className="bg-white py-10 sm:py-16">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <div>
              <img
                src={simu}
                alt="Simulation and Modeling"
                className="rounded-lg shadow-md w-full"
              />
            </div>
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
                We offer services for simulation, modeling, and design of
                devices including power devices, sensors, NAND memory, CMOS
                image sensors, and solar cells. This includes TCAD simulation,
                process calibration, and custom design support.
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

      {/* Section 3: Technical Consulting */}
      <section className="bg-white py-10 sm:py-16">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
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
                We specialize in delivering comprehensive solutions pertaining
                to semiconductor technology and workforce development. Our
                services range from conducting customised skill training
                programs for semiconductor technology workforce development to
                offering advanced device design, simulation, and modeling
                support for your semiconductor device research and development.
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
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <div>
              <img
                src="/consulting.jpg"
                alt="Technical Consulting"
                className="rounded-lg shadow-md w-full"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

export default Services;
