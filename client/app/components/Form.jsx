"use client"
import { useState } from 'react';
// import axios from 'axios';

const TransactionForm = () => {
  const [formData, setFormData] = useState({
    description: '',
    amount: 0,
    category: '',
    currency: '',
    date: {
      day: 0,
      month: 0,
      year: 0,
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
    //   await axios.post('/api/transactions', formData);
      // You can redirect or perform other actions upon successful submission
      console.log('Transaction submitted successfully!');
    } catch (error) {
      console.error('Error submitting transaction:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded shadow-md">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border rounded-md"
          />
        </label>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">
          Amount:
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border rounded-md"
          />
        </label>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">
          Category:
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </label>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">
          Currency:
          <input
            type="text"
            name="currency"
            value={formData.currency}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border rounded-md"
          />
        </label>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">
          Date:
          <div className="flex space-y-2 flex-col">
            <input
              type="number"
              name="date.day"
              placeholder="Day"
              value={formData.date.day}
              onChange={handleChange}
              required
              className="flex-1 p-2 border rounded-md"
            />
            <input
              type="number"
              name="date.month"
              placeholder="Month"
              value={formData.date.month}
              onChange={handleChange}
              required
              className="flex-1 p-2 border rounded-md"
            />
            <input
              type="number"
              name="date.year"
              placeholder="Year"
              value={formData.date.year}
              onChange={handleChange}
              required
              className="flex-1 p-2 border rounded-md"
            />
          </div>
        </label>
      </div>

      <div className="text-center">
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">
          Submit
        </button>
      </div>
    </form>
  );
};

export default TransactionForm;
