// utils/animations.js
export const fadeIn = (direction = "up", delay = 0) => {
  return {
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
  };
};
