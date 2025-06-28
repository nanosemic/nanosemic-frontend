import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const AddressUpdate = () => {
  const [addresses, setAddresses] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [form, setForm] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  // Fetch saved addresses on mount
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/my/address`, {
          withCredentials: true,
        });
        if(user) setAddresses(res.data.addresses || []);
      } catch (err) {
        console.error('Failed to fetch addresses:', err);
      }
    };
    fetchAddresses();
  }, []);

  // Handle selection of a saved address
  const handleSelect = (index) => {
    setSelectedIndex(index);
    setForm({
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    });
  };

  // Handle radio button delivery click
  const handleDeliverHere = async () => {
    if (selectedIndex === null) return;
    const selectedAddress = addresses[selectedIndex];
    localStorage.setItem('selectedAddress', JSON.stringify(selectedAddress));
    navigate('/summary');
  };

  // Handle new address input
  const handleChange = (e) => {
    setSelectedIndex(null); // indicate it's a new address
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit new address
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/update/address`, form, {
        withCredentials: true,
      });
      setMessage('New address added and selected!');
      setAddresses([...addresses, res.data.address]); // Update local state with new address
      localStorage.setItem('selectedAddress', JSON.stringify(res.data.address));
      setTimeout(() => navigate('/summary'), 1000);
    } catch (err) {
      setMessage('Error saving new address.');
      console.error(err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Delivery Address</h2>

      {addresses.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Saved Addresses</h3>
          <div className="space-y-3">
            {addresses.map((addr, idx) => (
              <label
                key={idx}
                className={`flex items-start gap-2 p-4 rounded-lg border transition duration-200 cursor-pointer ${
                  selectedIndex === idx
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-200 hover:border-gray-400'
                }`}
              >
                <input
                  type="radio"
                  name="savedAddress"
                  checked={selectedIndex === idx}
                  onChange={() => handleSelect(idx)}
                  className="mt-1"
                />
                <span className="text-sm text-gray-700 leading-5">
                  {`${addr.street}, ${addr.city}, ${addr.state}, ${addr.zipCode}, ${addr.country}`}
                </span>
              </label>
            ))}
          </div>
          <button
            onClick={handleDeliverHere}
            disabled={selectedIndex === null}
            className={`mt-4 px-5 py-2 rounded text-white font-medium ${
              selectedIndex === null
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            Deliver Here
          </button>
          <p className="text-sm italic text-gray-500 mt-2">— or add a new address below —</p>
        </div>
      )}

      <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Add New Address</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          {['street', 'city', 'state', 'zipCode', 'country'].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-600 capitalize mb-1">
                {field}
              </label>
              <input
                type="text"
                name={field}
                value={form[field]}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          ))}
          <button
            type="submit"
            className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
          >
            Save & Deliver Here
          </button>
        </form>
      </div>

      {message && (
        <p
          className={`mt-4 text-sm font-medium ${
            message.includes('added') ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default AddressUpdate;
