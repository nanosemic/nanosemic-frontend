import React from 'react'
import logo from "../assets/logo.png"
import { FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <>
       
    
  <div className="bg-black">
  <div className="bg-black text-white py-10 ">
    <footer className="max-w-[1280px] mx-auto px-3 pt-4 lg:px-9">
    <div className="grid gap-10 row-gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">

        <div className="sm:col-span-2">
            <a href="#" className="inline-flex items-center">
                <img src="/logo3.png" alt="logo" className="w-[65px]"/>
                <span className="ml-2 text-[23px] font-ancizar font-bold tracking-wide text-white">nanosemic</span>
            </a>
            <div className="mt-6 lg:max-w-xl">
               
                    <div className='flex justify-between md:w-[75%] gap-4 my-6 mt-20'>
                    <Link to="https://g.co/kgs/DhcmQ6L" className="w-full min-w-xl">
                    <img src="https://mcqmate.com/public/images/icons/playstore.svg" alt="Playstore Button"
                        className="h-10"/>
                        </Link>
                        <Link to ='https://in.linkedin.com/company/nano-semic' >
                        <FaLinkedinIn size={30} className='hover:text-blue-500'/>
                        </Link>
                       

                         </div>
            </div>
        </div>
       


        <div className="flex flex-col gap-2 text-sm">
            <p className="text-base font-bold tracking-wide text-white">Company</p>
            {/* <a href ="/home" className='transition-colors duration-300  hover:text-blue-400'>Home</a> */}
            <a href ="/about" className='transition-colors duration-300  hover:text-blue-400'>About</a>
            <a href ="/pro" className='transition-colors duration-300  hover:text-blue-400'>Product</a>
            <a href ="/services" className='transition-colors duration-300  hover:text-blue-400'>Services</a>

            <p to className="text-base font-bold tracking-wide text-white">Products</p>
            <a href ="/product/684b17e9d5b2ef323890c06d"className='transition-colors duration-300  hover:text-blue-400'>ArsenSafe Arsenic Sensor</a>
            <a href="/product/684b17e9d5b2ef323890c072" className='transition-colors duration-300  hover:text-blue-400'>IDE Glass Substrate for Sensor</a>
            <a href="/product/684b17e9d5b2ef323890c075" className='transition-colors duration-300  hover:text-blue-400'>IDE PET Substrate for Sensor</a>
            <a href="/product" className='transition-colors underline duration-300  hover:text-blue-400'>See More</a>
        </div>
        <div className="flex flex-col gap-2 text-sm">
            <p className="text-base font-bold tracking-wide text-white">Services</p>
            <a href ="/services" className='transition-colors duration-300  hover:text-blue-400'>Power Devices</a>
            <a href ="/services" className='transition-colors duration-300  hover:text-blue-400'>Semiconductor Simulation & Modeling</a>
            <a href="/services" className='transition-colors duration-300  hover:text-blue-400'>Technical Consulting</a>
            <a href="/services" className='transition-colors duration-300  hover:text-blue-400'>Semiconductor Consultancy</a>

            <p className="text-base font-bold tracking-wide text-white">Contacts</p>
            <div className="">
            <p className="mr-1 text-white"> Nano Semic Pvt Ltd, Research & Entrepreneurship Park , C/O<br/>IIT Bhubaneswar, Kansapada<br/> Odisha : 752050</p>
                <p className="mr-1 text-white">Email :
                <a href="" title="send email" className='hover:text-blue-500'>  nanosemic.official@gmail.com</a></p>
            </div>
            </div>

    </div>

    <div className="flex flex-col-reverse justify-between pt-5 pb-5 border-t lg:flex-row">
        <p className="text-sm text-white">© Copyright 2024 Company. All rights reserved.</p>
        <ul className="flex flex-col mb-3 space-y-2 lg:mb-0 sm:space-y-0 sm:space-x-5 sm:flex-row">
            <li>
                <a href ="/policy"
                    className="text-sm text-white hover:text-blue-400  transition-colors duration-300 hover:text-deep-purple-accent-400">Policy
                    
                </a>  &

            </li>
            <li>
                <a href  ="/terms"
                    className="text-sm text-white transition-colors duration-300  hover:text-blue-400 ">Terms and Condition
                </a>
            </li>
        </ul>
    </div>

</footer>
</div>
  </div>    
    </>
  )
}

export default Footer
