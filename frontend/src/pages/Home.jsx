import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import HeroIcon from '../assets/HomePage/heroIcon.svg';
import { IoSearchSharp } from "react-icons/io5";
import { GiSoccerBall, GiConfirmed } from "react-icons/gi";
import { MdSchedule } from "react-icons/md";
import { FaCalendarCheck } from "react-icons/fa";
import { LuCalendarClock } from "react-icons/lu";
import {Link} from 'react-router-dom'

const Home = () => {
  const [isInView, setIsInView] = useState(false);

  const handleScroll = () => {
    const scrollPosition = window.scrollY + window.innerHeight;
    const elements = document.querySelectorAll('.animate-on-scroll');

    elements.forEach(element => {
      const elementPosition = element.offsetTop + element.offsetHeight;
      if (scrollPosition > elementPosition) {
        element.classList.add('in-view');
      } else {
        element.classList.remove('in-view');
      }
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center bg-white">
        <div className="absolute inset-0 bg-white"></div>
        <motion.div
          className="relative container mx-auto flex flex-col md:flex-row items-center px-6 py-16 text-blue-700 bg-white shadow-lg transform transition-transform duration-300 ease-in-out"
          initial={{ scale: 1 }}
          whileInView={{ scale: 1.05 }}
          viewport={{ once: true }}
        >
          {/* Text Section */}
          <div className="w-full md:w-1/2 text-center md:text-left mb-8 md:mb-0">
            <h1 className="text-5xl font-bold mb-4">Book Your Turf with Ease</h1>
            <p className="text-xl mb-8">Find, book, and manage your turf bookings seamlessly.</p>
            <Link
              to={"/view/turfs"}
              href="#features"
              className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-3 px-6 rounded-full"
            >
              Book a Turf Now
            </Link>
          </div>
          {/* Hero Icon */}
          <div className="w-full md:w-1/2 text-center md:text-right">
            <img src={HeroIcon} alt="Hero Icon" className="w-full h-auto object-cover" />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-100">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <LuCalendarClock className="w-full h-32 mx-auto mb-4" />,
                title: "Easy Booking",
                description: "Book your turf in just a few clicks.",
              },
              {
                icon: <MdSchedule className="w-full h-32 mx-auto mb-4" />,
                title: "Flexible Scheduling",
                description: "Choose your preferred time slots easily.",
              },
              {
                icon: <FaCalendarCheck className="w-full h-32 mx-auto mb-4" />,
                title: "Instant Confirmation",
                description: "Get instant confirmation of your bookings.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="feature animate-on-scroll"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                {feature.icon}
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gray-200 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <IoSearchSharp className="w-full h-32 mx-auto mb-4" />,
                title: "Search",
                description: "Find available turfs near you.",
              },
              {
                icon: <GiConfirmed className="w-full h-32 mx-auto mb-4" />,
                title: "Book",
                description: "Choose your turf and book it online.",
              },
              {
                icon: <GiSoccerBall className="w-full h-32 mx-auto mb-4" />,
                title: "Play",
                description: "Show up and enjoy your game.",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                className="how-it-works animate-on-scroll"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                {step.icon}
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-Action */}
      <section className="bg-blue-800 py-16 text-white text-center">
        <motion.h2
          className="text-3xl font-bold mb-4"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Ready to Book a Turf?
        </motion.h2>
        <p className="text-xl mb-8">Sign up today and start booking your turfs easily.</p>
        <Link
          to="/signup"
          className="bg-white text-purple-600 font-bold py-3 px-6 rounded-full hover:bg-gray-200"
        >
          Sign Up Now
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-xs py-1">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2024 FiTiMe. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
