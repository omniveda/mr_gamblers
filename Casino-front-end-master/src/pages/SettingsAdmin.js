import { useState } from "react";
import Sidebar from "../components/Sidebar";

const SettingsAdmin = () => {
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("admin");

  const handleSave = () => {
    alert("Settings Saved!");
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-6">Admin Settings</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            className="w-full p-2 border rounded mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            className="w-full p-2 border rounded mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsAdmin;
