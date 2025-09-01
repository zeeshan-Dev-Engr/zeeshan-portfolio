import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  DollarSign, 
  Calendar, 
  TrendingUp, 
  Building,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Users,
  Star
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useAuthStore } from '../../store/authStore';

const Dashboard = () => {
  const { user } = useAuthStore();
  const [dateRange, setDateRange] = useState('7d');

  // Mock data - in production, this would come from your API
  const stats = {
    totalRevenue: 15420,
    totalBookings: 48,
    occupancyRate: 78,
    totalProperties: 6,
    revenueChange: 12.5,
    bookingsChange: 8.3,
    occupancyChange: -2.1,
    propertiesChange: 0,
  };

  const revenueData = [
    { date: 'Jan 1', revenue: 1200 },
    { date: 'Jan 2', revenue: 1800 },
    { date: 'Jan 3', revenue: 900 },
    { date: 'Jan 4', revenue: 2400 },
    { date: 'Jan 5', revenue: 1600 },
    { date: 'Jan 6', revenue: 2800 },
    { date: 'Jan 7', revenue: 2200 },
  ];

  const bookingData = [
    { date: 'Jan 1', bookings: 2 },
    { date: 'Jan 2', bookings: 3 },
    { date: 'Jan 3', bookings: 1 },
    { date: 'Jan 4', bookings: 4 },
    { date: 'Jan 5', bookings: 3 },
    { date: 'Jan 6', bookings: 5 },
    { date: 'Jan 7', bookings: 4 },
  ];

  const recentBookings = [
    {
      id: '1',
      property: 'Ocean View Suite',
      guest: 'Sarah Johnson',
      checkIn: '2024-01-15',
      checkOut: '2024-01-18',
      total: 720,
      status: 'confirmed',
    },
    {
      id: '2',
      property: 'Downtown Loft',
      guest: 'Mike Chen',
      checkIn: '2024-01-16',
      checkOut: '2024-01-20',
      total: 880,
      status: 'pending',
    },
    {
      id: '3',
      property: 'Garden Apartment',
      guest: 'Emma Davis',
      checkIn: '2024-01-14',
      checkOut: '2024-01-17',
      total: 540,
      status: 'confirmed',
    },
  ];

  const aiInsights = [
    {
      type: 'pricing',
      title: 'Pricing Optimization',
      message: 'Consider increasing rates for Ocean View Suite by 15% for next weekend due to local events.',
      impact: '+$340 potential revenue',
      confidence: 92,
    },
    {
      type: 'occupancy',
      title: 'Occupancy Alert',
      message: 'Downtown Loft has lower bookings than expected. Consider promotional pricing.',
      impact: '3 more bookings potential',
      confidence: 78,
    },
  ];

  const StatCard = ({ title, value, change, icon: Icon, prefix = '', suffix = '' }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {prefix}{typeof value === 'number' ? value.toLocaleString() : value}{suffix}
          </p>
          <div className="flex items-center mt-2">
            {change !== 0 && (
              <>
                {change > 0 ? (
                  <ArrowUpRight className="w-4 h-4 text-success-500" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 text-error-500" />
                )}
                <span className={`text-sm font-medium ml-1 ${
                  change > 0 ? 'text-success-500' : 'text-error-500'
                }`}>
                  {Math.abs(change)}% from last month
                </span>
              </>
            )}
          </div>
        </div>
        <div className="bg-primary-50 p-3 rounded-lg">
          <Icon className="w-6 h-6 text-primary-600" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-gray-600 mt-1">
              Here's what's happening with your properties today.
            </p>
          </div>
          <Link
            to="/properties/new"
            className="bg-primary-600 text-white hover:bg-primary-700 px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors duration-200"
          >
            <Plus className="w-4 h-4" />
            <span>Add Property</span>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Revenue"
          value={stats.totalRevenue}
          change={stats.revenueChange}
          icon={DollarSign}
          prefix="$"
        />
        <StatCard
          title="Total Bookings"
          value={stats.totalBookings}
          change={stats.bookingsChange}
          icon={Calendar}
        />
        <StatCard
          title="Occupancy Rate"
          value={stats.occupancyRate}
          change={stats.occupancyChange}
          icon={TrendingUp}
          suffix="%"
        />
        <StatCard
          title="Properties"
          value={stats.totalProperties}
          change={stats.propertiesChange}
          icon={Building}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Revenue Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Revenue Trend</h3>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#3B82F6" 
                strokeWidth={3}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bookings Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Activity</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={bookingData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip formatter={(value) => [`${value}`, 'Bookings']} />
              <Bar 
                dataKey="bookings" 
                fill="#10B981"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <span className="bg-primary-100 p-2 rounded-lg mr-3">
            🤖
          </span>
          AI Insights & Recommendations
        </h3>
        <div className="space-y-4">
          {aiInsights.map((insight, index) => (
            <div
              key={index}
              className="p-4 bg-gradient-to-r from-primary-50 to-blue-50 rounded-lg border border-primary-100"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">{insight.title}</h4>
                  <p className="text-gray-700 mb-2">{insight.message}</p>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium text-success-600 bg-success-50 px-2 py-1 rounded">
                      {insight.impact}
                    </span>
                    <span className="text-sm text-gray-500">
                      {insight.confidence}% confidence
                    </span>
                  </div>
                </div>
                <button className="bg-primary-600 text-white hover:bg-primary-700 px-3 py-1 rounded text-sm font-medium transition-colors duration-200">
                  Apply
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Recent Bookings</h3>
            <Link
              to="/bookings"
              className="text-primary-600 hover:text-primary-700 font-medium text-sm"
            >
              View all
            </Link>
          </div>
        </div>
        <div className="overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Property & Guest
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dates
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {booking.property}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <Users className="w-3 h-3 mr-1" />
                        {booking.guest}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(booking.checkIn).toLocaleDateString()} - {' '}
                    {new Date(booking.checkOut).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${booking.total}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      booking.status === 'confirmed'
                        ? 'bg-success-100 text-success-800'
                        : 'bg-warning-100 text-warning-800'
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;