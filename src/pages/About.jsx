import { motion } from "framer-motion";
import akashay from "../assets/aka.png";
import sir2 from "../assets/sir.jpg";
import miss from "../assets/miss.jpg";
import meg from "../assets/meg.jpg";
import { FaLinkedinIn } from "react-icons/fa";
import { useLoad } from "../context/loading";

import { useEffect } from "react";

const fadeIn = (direction = "up", delay = 0) => ({
  hidden: {
    y: direction === "up" ? 50 : -50,
    opacity: 0,
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      delay,
      duration: 0.6,
      ease: "easeOut",
    },
  },
});

const Section = ({ children, direction = "up", delay = 0 }) => (
  <motion.div
    variants={fadeIn(direction, delay)}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true }}
  >
    {children}
  </motion.div>
);

const GradientImage = ({ src, alt }) => (
  <div className="relative w-full  overflow-hidden rounded-lg shadow-lg">
    <img src={src} alt={alt} className="object-cover  w-full h-auto" />
    {/* <div className="absolute inset-0 " /> */}
    <div className="absolute inset-0 bg-gradient-to-r from-[#000000]/40 to-[#000000]/40" />
  </div>
);

const About = () => {
  const {loading, setLoading} = useLoad();
  useEffect(() => {
    setLoading(true);
  } , []);

  return (
    <div className=" relative  text-white font-sans">
      <div className="absolute inset-0 -z-10">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          onCanPlayThrough={() => setLoading(false)}
        >
          <source src="/video2.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* About Section */}

      <Section direction="up" delay={0.9}>
        <div className="max-w-3xl mx-auto py-20 px-6 mc-10 text-center backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl shadow-lg">
          {/* Image */}
          <div className="mb-8 w-full overflow-hidden rounded-xl">
            {/* <GradientImage src="/nanosemic.png" alt="About Image" /> */}
          </div>

          {/* Text */}
          <h1 className="text-5xl font-bold mb-6 text-white">About Us</h1>
          <p className="text-lg text-gray-300 leading-relaxed">
            Nano Semic Pvt. Ltd. is one of the brand new members in the discrete
            semiconductor innovation space. We specialize in developing advanced
            sensing platforms, unique sensing materials,
            smart sensor products and providing expert consultancy services in power devices and other semiconductor technologies .
          </p>
        </div>
      </Section>

      {/* Company Section */}
      <Section direction="down backdrop-blur-md bg-white/5">
        <div className=" max-w-6xl mx-auto py-20 px-6 grid my-10 md:grid-cols-2 gap-12 items-center max-w-3xl mx-auto py-20 px-6 text-center backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl shadow-lg">
          <div>
            <h2 className="text-4xl font-bold mb-6">Our Company</h2>
            <p className="text-lg text-gray-300">
             Nano Semic Pvt. Ltd. was founded in 2024 and is presently incubated with IIT Bhubaneswar Research and Entrepreneurship Park. We are a semiconductor products and services company. We offer a range of solutions starting from consumer sensors, sensor components, workforce training programs for industries, universities and schools and semiconductor technology development consultancy services.
            </p>
            {/* <ul className="list-disc pl-5 mt-4 space-y-2 text-lg text-gray-300">
              <li>Gas and water sensing in industries and homes.</li>
              <li>Healthcare diagnosis via non-invasive techniques.</li>
              <li>Educational and research tools for universities/schools.</li>
            </ul> */}
          </div>
          <div>
            {/* <GradientImage src="/nanosemic5.png" alt="Company" /> */}
            <div className="relative w-full  overflow-hidden rounded-lg shadow-lg">
              <img
                src="/nanosemic7.png"
                alt={"Company Image"}
                className="object-cover  w-full h-auto"
              />
              {/* <div className="absolute inset-0 " /> */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#000000]/20 to-[#000000]/20" />
            </div>
          </div>
        </div>
      </Section>

      {/* Mission Section */}
      <Section>
        <div className="max-w-6xl mx-auto py-20 px-6 grid my-10 md:grid-cols-2 gap-12 items-center max-w-3xl mx-auto py-20 px-6 text-center backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl shadow-lg">
          <div className="order-2 md:order-1">
            <GradientImage src={meg} alt="Mission" />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-4xl font-bold mb-6">Mission</h2>
            <p className="text-lg text-gray-300">
              To develop next generation sensing solutions and make sensor technology accessible, reliable, and affordable for
              everyone. Also play a leading role in enabling advanced semiconductor ecosystem through expert technical  consultancy services.
            </p>
          </div>
        </div>
      </Section>

      {/* Innovation Section */}
      {/* <Section direction="down">
        <div className="max-w-6xl mx-auto py-20 px-6 grid md:grid-cols-2 gap-12 items-center max-w-3xl mx-auto py-20 px-6 text-center backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl shadow-lg">
          <div>
            <h2 className="text-4xl font-bold mb-6">We are innovative</h2>
            <p className="text-lg text-gray-300">
              We craft intelligent sensing solutions that transform industries.
              From IoT-enabled environments to advanced automation, our
              cutting-edge sensor technology empowers businesses and enhances
              everyday life. Innovation is our core foundation.
            </p>
          </div>
          <div>
            <GradientImage src={miss} alt="Innovation" />
          </div>
        </div>
      </Section> */}

      {/* Core Team Section */}
      <Section>
        <div className="text-center py-20">
          <h2 className="text-4xl font-bold mb-6 text-white">
            Meet the Core Team
          </h2>
        </div>

        <div className="max-w-6xl mx-auto px-6 pb-20 flex justify-center lg:gap-24  gap-16">
          {[
            {
              name: "Dr. Sayan Dey",
              title: "Director/ Co-Founder",
              linkedin: "https://www.linkedin.com/in/sayandey?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
              image: sir2,
              bio: "Dr. Sayan received his B.Tech degree in ECE from WBUT, M.Tech from Jadavpur University and Ph.D. from IIT Kharagpur in 2020. Thereafter, he worked as a Fulbright-Nehru Fellow in Columbia University, USA till 2022. He received National Awards for best dissertations twice in 2015 and 2020 and the prestigious Fulbright Fellowship in 2021. He is currently an Assistant Professor in the Department of Electronics and Communication Engineering, School of Electrical and Computer Sciences at IIT Bhubaneswar and also one of the Directors of Nano Semic Pvt. Ltd.",
            },
            {
              name: "Dr. Akshay K",
              title: "Director/ Co-Founder",
              linkedin: "https://www.linkedin.com/in/akshay-k-ak-8129066062/?originalSubdomain=in",
              image: akashay,
              bio: "Dr. Akshay received the B.Tech. degree in ECE from NIT Calicut and MS and PhD degrees from IIT Madras as a Prime Minister's Research Fellow in 2022. He worked as a Senior Semiconductor Device Engineer in the Technology Development Group at Micron Technology till 2023. He is currently an Assistant Professor in the Department of Electronics and Communication Engineering, School of Electrical and Computer Sciences at IIT Bhubaneswar and also one of the Directors of Nano Semic Pvt. Ltd. ",
            },
          ].map((member, i) => (
            <Section direction={i % 2 === 0 ? "up" : "down"} key={member.name}>
              <div className="bg-black/60 text-white lg:w-[400px]  rounded-xl overflow-hidden backdrop-blur-md border border-white/10 shadow-xl transform transition-transform duration-500  hover:scale-105 hover:border-white/30 hover:shadow-[0_0_20px_#ffffff22] ">
                <div className="w-full h-64 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-contain "
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="text-md text-gray-300">{member.title}</p>
                  <p className="text-sm text-gray-400 mt-2">{member.bio}</p>
                  <div className="flex gap-4 mt-4">
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-400 transition-colors"  > 
                    <FaLinkedinIn
                      size={20}
                      className="hover:text-blue-400 transition-colors"
                    />  
                    </a>  
                    {/* <FaXTwitter
                      size={20}
                      className="hover:text-white transition-colors"
                    /> */}
                  </div>
                </div>
              </div>
            </Section>
          ))}
        </div>
      </Section>
    </div>
  );
};

export default About;
