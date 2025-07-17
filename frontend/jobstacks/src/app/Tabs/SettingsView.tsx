import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function SettingsView() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/users/me', {
          withCredentials: true,
        });
        setName(res.data.name);
        setEmail(res.data.email);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="pl-12 pr-8 pt-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      {/* Profile Settings */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Profile</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-neutral-800 text-white border border-neutral-700"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-neutral-800 text-white border border-neutral-700"
              placeholder="you@example.com"
            />
          </div>
        </div>
      </section>

      {/* Notifications */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Notifications</h2>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-300">Email Alerts</span>
          <input type="checkbox" className="toggle toggle-primary" />
        </div>
        <div className="flex items-center justify-between mt-4">
          <span className="text-sm text-gray-300">Push Notifications</span>
          <input type="checkbox" className="toggle toggle-primary" />
        </div>
      </section>

      {/* Security */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Security</h2>
        <div>
          <label className="block text-sm font-medium text-gray-300">Change Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-neutral-800 text-white border border-neutral-700"
            placeholder="New password"
          />
        </div>
      </section>
      <div className="mt-10">
        <button
          onClick={async () => {
            try {
              await axios.put(
                'http://localhost:4000/api/users/me',
                {
                  name,
                  email,
                  ...(password && { password }),
                },
                { withCredentials: true }
              );
              alert('Changes saved successfully.');
              setPassword('');
            } catch (error) {
              console.error('Failed to save changes:', error);
              alert('Failed to save changes.');
            }
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
