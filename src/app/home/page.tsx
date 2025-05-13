'use client';

import Header from '@/components/Header';
import NavigationMenu from '@/components/NavigationMenu';
import PWAInstallPrompt from '@/components/PWAInstallPrompt';
import ProtectedRoute from '@/components/protectedRoute';
import { FaHeartbeat, FaCalendarAlt, FaPills, FaFileMedical, FaUserMd, FaWeight, FaWater, FaRunning, FaProcedures, FaAllergies } from 'react-icons/fa';

export default function HomePage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 relative overflow-hidden">
        {/* Transparent background image */}
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/images/medical-pattern.svg')] bg-repeat bg-center"></div>
        </div>
        
        <div className="relative z-10">
          <Header />
          <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 sm:px-0">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome to HealthBridge</h1>
              <p className="text-gray-700 mb-8 text-lg">Your comprehensive health management dashboard</p>
            </div>
            
            <NavigationMenu />
            <PWAInstallPrompt />
            
            {/* Health Monitoring Section */}
            <div className="mt-10 px-4 sm:px-0">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Health Monitoring</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <HealthCard 
                  icon={<FaHeartbeat className="text-red-500 text-2xl" />}
                  title="Vital Signs"
                  description="Track blood pressure, heart rate, and temperature"
                  color="red"
                />
                <HealthCard 
                  icon={<FaWeight className="text-blue-500 text-2xl" />}
                  title="Weight Management"
                  description="Log and analyze weight trends over time"
                  color="blue"
                />
                <HealthCard 
                  icon={<FaWater className="text-cyan-500 text-2xl" />}
                  title="Hydration Tracker"
                  description="Monitor daily water intake and set goals"
                  color="cyan"
                />
                <HealthCard 
                  icon={<FaRunning className="text-green-500 text-2xl" />}
                  title="Activity Tracking"
                  description="Record exercise and physical activity"
                  color="green"
                />
              </div>
            </div>
            
            {/* Medical Management Section */}
            <div className="mt-10 px-4 sm:px-0">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Medical Management</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <HealthCard 
                  icon={<FaPills className="text-purple-500 text-2xl" />}
                  title="Medication Tracker"
                  description="Manage prescriptions and set reminders"
                  color="purple"
                />
                <HealthCard 
                  icon={<FaAllergies className="text-amber-500 text-2xl" />}
                  title="Allergy Records"
                  description="Document allergies and reactions"
                  color="amber"
                />
                <HealthCard 
                  icon={<FaFileMedical className="text-emerald-500 text-2xl" />}
                  title="Health Records"
                  description="Store test results and medical reports"
                  color="emerald"
                />
                <HealthCard 
                  icon={<FaProcedures className="text-indigo-500 text-2xl" />}
                  title="Vaccination History"
                  description="Track immunization records"
                  color="indigo"
                />
              </div>
            </div>
            
            {/* Appointments & Care Section */}
            <div className="mt-10 px-4 sm:px-0 mb-10">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Appointments & Care</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <HealthCard 
                  icon={<FaCalendarAlt className="text-teal-500 text-2xl" />}
                  title="Appointments"
                  description="Schedule and manage doctor visits"
                  color="teal"
                />
                <HealthCard 
                  icon={<FaUserMd className="text-pink-500 text-2xl" />}
                  title="Care Team"
                  description="Manage your healthcare providers"
                  color="pink"
                />
                <HealthCard 
                  icon={<FaFileMedical className="text-orange-500 text-2xl" />}
                  title="Insurance Info"
                  description="Store policy details and claims"
                  color="orange"
                />
                <HealthCard 
                  icon={<FaHeartbeat className="text-rose-500 text-2xl" />}
                  title="Emergency Contacts"
                  description="Quick access to emergency information"
                  color="rose"
                />
              </div>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}

// Reusable HealthCard component
type HealthCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: keyof typeof colorClasses;
};

const colorClasses = {
  red: 'bg-red-50 border-red-100 text-red-800',
  blue: 'bg-blue-50 border-blue-100 text-blue-800',
  cyan: 'bg-cyan-50 border-cyan-100 text-cyan-800',
  green: 'bg-green-50 border-green-100 text-green-800',
  purple: 'bg-purple-50 border-purple-100 text-purple-800',
  amber: 'bg-amber-50 border-amber-100 text-amber-800',
  emerald: 'bg-emerald-50 border-emerald-100 text-emerald-800',
  indigo: 'bg-indigo-50 border-indigo-100 text-indigo-800',
  teal: 'bg-teal-50 border-teal-100 text-teal-800',
  pink: 'bg-pink-50 border-pink-100 text-pink-800',
  orange: 'bg-orange-50 border-orange-100 text-orange-800',
  rose: 'bg-rose-50 border-rose-100 text-rose-800',
};

function HealthCard({ icon, title, description, color }: HealthCardProps) {
  return (
    <div className={`rounded-lg p-6 border ${colorClasses[color]} shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col`}>
      <div className="mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}