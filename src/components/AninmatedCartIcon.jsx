import React from 'react';
import { motion } from 'framer-motion';

const AnimatedCartIcon = () => {
  return (
    <motion.div
      style={{ position: 'fixed', bottom: 20, right: 20, cursor: 'pointer', zIndex: 1000 }}
      initial={{ scale: 1 }}
      animate={{ scale: [1, 1.2, 1] }}  // pulsate scale animation
      transition={{
        duration: 1.5,
        repeat: Infinity,
        repeatType: 'loop',
        ease: 'easeInOut',
      }}
      onClick={() => {
        // Navigate to cart page or do something
        window.location.href = '/cart';  // simple redirect example
      }}
      aria-label="Go to Cart"
      title="Go to Cart"
    >
      <img
        src="/cart.png"  // adjust path if needed
        alt="Cart"
        style={{ width: 45, height: 45 }}
      />
    </motion.div>
  );
};

export default AnimatedCartIcon;
