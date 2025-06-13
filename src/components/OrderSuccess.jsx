import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OrderSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect after 5 seconds
    const timeout = setTimeout(() => {
      navigate('/my-orders');
    }, 10000);

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white">
      <video
        autoPlay
        muted
        className="w-full max-w-md rounded-lg shadow-lg"
        onEnded={() => navigate('/my-orders')}
      >
        <source src="../public/Payment Success-vmake.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <h2 className="text-xl text-center font-semibold text-green-600 mt-4">
        Your order has been placed successfully!
      </h2>
    </div>
  );
};

export default OrderSuccess;
