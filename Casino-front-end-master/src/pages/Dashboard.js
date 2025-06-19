import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";
import Sidebar from "../components/Sidebar";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";

const GA4_PROPERTY_ID = "489779842";

const recentTransactions = [
  {
    id: 1,
    user: "John Doe",
    amount: "$500",
    type: "Deposit",
    date: "2023-07-15",
  },
  {
    id: 2,
    user: "Jane Smith",
    amount: "$1200",
    type: "Withdrawal",
    date: "2023-07-14",
  },
  {
    id: 3,
    user: "Mike Johnson",
    amount: "$750",
    type: "Deposit",
    date: "2023-07-14",
  },
];

const DashboardContent = () => {
  const [token, setToken] = useState(null);
  const [analyticsData, setAnalyticsData] = useState([]);

  // Google Login hook
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      setToken(tokenResponse.access_token);
    },
    onError: (error) => {
      console.error("Login Failed:", error);
    },
    scope: "https://www.googleapis.com/auth/analytics.readonly",
  });

  // Fetch analytics data when token changes
  useEffect(() => {
    const fetchAnalyticsData = async () => {
      if (!token) return;

      try {
        const response = await fetch(
          `https://analyticsdata.googleapis.com/v1beta/properties/${GA4_PROPERTY_ID}:runReport`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              dateRanges: [{ startDate: "2025-01-01", endDate: "2025-05-20" }],
              metrics: [{ name: "activeUsers" }, { name: "totalRevenue" }],
              dimensions: [{ name: "date" }],
            }),
          }
        );

        const json = await response.json();

        if (json.error) {
          console.error("API Error:", json.error);
          return;
        }

        if (!json.rows) {
          console.warn("No data rows returned");
          return;
        }

        // Map GA4 data to chart format
        const chartData = json.rows.map((row) => ({
          name: row.dimensionValues[0].value,
          users: Number(row.metricValues[0].value),
          revenue: Number(row.metricValues[1].value),
        }));

        setAnalyticsData(chartData);
      } catch (err) {
        console.error("Fetch Analytics Error:", err);
      }
    };

    fetchAnalyticsData();
  }, [token]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 p-4 sm:p-6 md:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">
          Admin Dashboard
        </h2>

        {!token && (
          <button
            onClick={() => login()}
            className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Login with Google to Load Analytics Data
          </button>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {[
            {
              title: "Total Casinos",
              value: 25,
              color: "text-blue-600",
              sub: "+12% from last month",
              subColor: "text-green-500",
            },
            {
              title: "Total Blogs",
              value: 12,
              color: "text-green-600",
              sub: "+3 new this week",
              subColor: "text-blue-500",
            },
            {
              title: "Active Users",
              value:
                analyticsData.length > 0
                  ? analyticsData.reduce((a, c) => a + c.users, 0)
                  : 180,
              color: "text-yellow-600",
              sub: "-2% from yesterday",
              subColor: "text-red-500",
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-xl shadow-lg border border-gray-200"
            >
              <h3 className="text-base font-semibold text-gray-600 mb-2">
                {stat.title}
              </h3>
              <p className={`text-3xl sm:text-4xl font-bold ${stat.color}`}>
                {stat.value}
              </p>
              <span className={`text-sm ${stat.subColor}`}>{stat.sub}</span>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-5 rounded-xl shadow-lg border border-gray-200">
            <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-700">
              Monthly User Activity
            </h3>
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={analyticsData.length > 0 ? analyticsData : undefined}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="users" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-lg border border-gray-200">
            <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-700">
              Active User In last 30 min
            </h3>
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={analyticsData.length > 0 ? analyticsData : undefined}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#10B981"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  );
};

const Dashboard = () => {
  return (
    <GoogleOAuthProvider clientId="541803818140-q1dtlr4jcj41r544cqpi748166mmm0lc.apps.googleusercontent.com">
      <DashboardContent />
    </GoogleOAuthProvider>
  );
};

export default Dashboard;
