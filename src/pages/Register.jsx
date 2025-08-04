import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    gender: '',
    country: '',
    phone: '',
    education: '',
    englishGoal: '',
    learningStyle: '',
    level: 'Pre Beginning',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Save registration flag
    localStorage.setItem('isRegistered', 'true');
    window.dispatchEvent(new Event('userRegistered')); // For navbar updates

    // ✅ Navigate to result page with form data
    navigate('/result', { state: formData });
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-100 flex items-center justify-center px-4 py-8">
      <div className="rounded-2xl shadow-2xl w-full max-w-3xl p-8 bg-white">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Register for English Learning</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            { name: 'name', type: 'text', label: 'Full Name' },
            { name: 'email', type: 'email', label: 'Email Address' },
            { name: 'age', type: 'number', label: 'Age' },
            { name: 'phone', type: 'text', label: 'Phone Number' },
            { name: 'education', type: 'text', label: 'Education' },
            { name: 'englishGoal', type: 'text', label: 'English Learning Goal' },
            { name: 'learningStyle', type: 'text', label: 'Preferred Learning Style' },
          ].map(({ name, type, label }) => (
            <div key={name} className={['name', 'email'].includes(name) ? 'sm:col-span-2' : ''}>
              <label className="block mb-1 text-sm font-medium text-gray-700">{label}</label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          ))}

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Current Level</label>
            <select
              name="level"
              value={formData.level}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option>Pre Beginning</option>
              <option>Beginning</option>
              <option>Level One</option>
              <option>Level Two</option>
              <option>Level Three</option>
              <option>Level Four</option>
              <option>Level Five</option>
              <option>Advance</option>
            </select>
          </div>

          <div className="sm:col-span-2 flex justify-between">
            <button
              type="submit"
              className="w-1/4 bg-indigo-700 hover:bg-indigo-800 text-white font-semibold py-3 rounded-lg transition"
            >
              Register
            </button>
            <Link to='/'>
              <button
                type="button"
                className="px-5 bg-gray-300 hover:bg-gray-400 text-black font-semibold py-3 rounded-lg transition"
              >
                Cancel
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
