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
  // Fetch addresses on mount
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        // const token = localStorage.getItem('token');
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/my/address`, {
          withCredentials:true,
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
    }); // clear form since it's a new address
  };
const handleDeliverHere = async () => {
  if (selectedIndex === null) return;

  const selectedAddress = addresses[selectedIndex];

  // Optionally store in localStorage or context
  localStorage.setItem('selectedAddress', JSON.stringify(selectedAddress));

  // Navigate to summary page
  navigate('/summary');
};

  // Handle form input change
  const handleChange = (e) => {
    setSelectedIndex(null); // user is choosing to enter a new address
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit new address
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    
    const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/update/address`, form, {
     withCredentials:true
    });

    // Save the newly added address to localStorage
    const newAddress = res.data.addresses[res.data.addresses.length - 1]; // Get the last added address
    
    localStorage.setItem('selectedAddress', JSON.stringify(newAddress));
    // Update the addresses state
    setMessage('New address added and selected!');
    setTimeout(() => navigate('/summary'), 1000);
  } catch (err) {
    setMessage('Error saving new address.');
    console.error(err);
  }
};


  return (
    <div className="max-w-2xl mx-auto p-4 shadow-lg rounded-md bg-white">
      <h2 className="text-xl font-bold mb-4">Select or Add Delivery Address</h2>

      {addresses.length > 0 && (
        <div className="mb-6">
          <h3 className="text-md font-semibold mb-2">Saved Addresses</h3>
          {addresses.map((addr, idx) => (
            <div key={idx} className="border p-3 mb-2 rounded cursor-pointer hover:bg-gray-50">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="savedAddress"
                  checked={selectedIndex === idx}
                  onChange={() => handleSelect(idx)}
                />
                <span>{`${addr.street}, ${addr.city}, ${addr.state}, ${addr.zipCode}, ${addr.country}`}</span>
              </label>
            </div>
          ))}
          <button
            onClick={handleDeliverHere}
            disabled={selectedIndex === null}
            className={`mt-2 px-4 py-2 rounded text-white ${
              selectedIndex === null ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            Deliver Here
          </button>
          <p className="text-sm italic text-gray-500 mt-2">Or add a new address below</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {['street', 'city', 'state', 'zipCode', 'country'].map((field) => (
          <div key={field} className="mb-4">
            <label className="block text-sm font-medium capitalize mb-1">{field}</label>
            <input
              type="text"
              name={field}
              value={form[field]}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Save & Deliver Here
        </button>
      </form>

      {message && (
        <p
          className={`mt-3 text-sm ${
            message.includes('success') ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default AddressUpdate;
