import React from 'react'
import { motion } from 'framer-motion';
import Slider from 'react-slick';
const featureItems = [
    {
      title: "Easy Turf Booking",
      description: "Book your favorite turf in just a few clicks. Simple, fast, and convenient!",
    },
    {
      title: "Instant Availability Updates",
      description: "Get real-time availability updates to ensure you never miss out on your preferred slot.",
    },
    {
      title: "Flexible Scheduling",
      description: "Choose from a range of time slots that fit your schedule. Flexibility at its best!",
    },
    {
      title: "Instant Booking Confirmation",
      description: "Receive instant confirmation and details of your booking directly on your device.",
    },
    {
      title: "Find Nearby Turf",
      description: "Locate and book turfs near you effortlessly with our convenient location-based search.",
    },
    {
      title: "Choose Your Perfect Size",
      description: "Select turfs based on your preferred size for a tailored experience.",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

function HomeCaraouselSlider() {
  return (
    <div>
      <div className="mt-8 w-full lg:w-3/4">
        <Slider {...settings}>
          {featureItems.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-stone-700 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              whileHover={{ scale: 1.05 }}
            >
              <h2 className="text-xl font-semibold mb-2">{feature.title}</h2>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </Slider>
      </div>
    </div>
  )
}

export default HomeCaraouselSlider
