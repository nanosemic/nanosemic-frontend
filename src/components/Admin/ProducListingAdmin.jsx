import React, { useState } from 'react';
import axios from 'axios';

const ProductForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    includes: '',
    price: '',
    category: '',
    stock: '',
    discount: '',
    imageUrls: [],
  });
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async () => {
    if (!images || images.length === 0) return [];
    const form = new FormData();
    images.forEach((img) => form.append("image", img));
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/product/upload`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data.imageUrls;
    } catch (error) {
      console.error("Image upload error:", error);
      return [];
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const imageUrls = await handleImageUpload();
      const productData = {
        ...formData,
        imageUrls,
        includes: formData.includes.split(',').map(i => i.trim()),
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        discount: parseInt(formData.discount),
      };
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/product/create`, productData);
      alert('Product created!');
      setFormData({
        title: '',
        description: '',
        includes: '',
        price: '',
        category: '',
        stock: '',
        discount: '',
        imageUrls: [],
      });
      setImages(null);
    } catch (error) {
      console.error('Product creation error:', error);
      alert('Failed to create product.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#111827] p-6">
      <div className="w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-100">Create Product</h2>
        <form
          onSubmit={handleSubmit}
          className="bg-[#1f2937] p-6 rounded-xl shadow-lg space-y-4 max-w-lg"
        >
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            className="w-full px-4 py-2 bg-[#111827] border border-gray-700 rounded text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
            className="w-full px-4 py-2 bg-[#111827] border border-gray-700 rounded text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <input
            type="text"
            name="includes"
            placeholder="Includes (comma-separated)"
            value={formData.includes}
            onChange={(e) => setFormData({ ...formData, includes: e.target.value })}
            className="w-full px-4 py-2 bg-[#111827] border border-gray-700 rounded text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            required
            className="w-full px-4 py-2 bg-[#111827] border border-gray-700 rounded text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={formData.stock}
            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
            required
            className="w-full px-4 py-2 bg-[#111827] border border-gray-700 rounded text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <input
            type="number"
            name="discount"
            placeholder="Discount (%)"
            value={formData.discount}
            onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
            className="w-full px-4 py-2 bg-[#111827] border border-gray-700 rounded text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <select
            name="category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            required
            className="w-full px-4 py-2 bg-[#111827] border border-gray-700 rounded text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="">Select Category</option>
            <option value="Health Products">Health Products</option>
            <option value="Education Products">Education Products</option>
            <option value="Agriculture Products">Agriculture Products</option>
            <option value="Safety Products">Safety Products</option>
          </select>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setImages([...e.target.files])}
            className="w-full text-gray-100"
            required
          />
          <button
            type="submit"
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition-colors duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Product'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
