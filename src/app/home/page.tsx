'use client';

import Header from '@/components/Header';
import NavigationMenu from '@/components/NavigationMenu';
import PWAInstallPrompt from '@/components/PWAInstallPrompt';
import ProtectedRoute from '@/components/protectedRoute';
import Link from 'next/link';
import {
  FaHeartbeat, FaCalendarAlt, FaPills, FaFileMedicalAlt,
  FaUserMd, FaWeight, FaWater, FaRunning, FaClinicMedical,
  FaAllergies, FaSyringe, FaFirstAid, FaPrescriptionBottleAlt,
  FaChartLine, FaUtensils, FaBed, FaBrain, FaTooth
} from 'react-icons/fa';

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
          <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 mt-16">
            <div className="px-4 sm:px-0 mx-auto text-center max-w-2xl">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome to HealthBridge</h1>
              <p className="text-gray-700 mb-8 text-lg">Your comprehensive health management dashboard</p>
            </div>
            
            <NavigationMenu />
            <PWAInstallPrompt />
            
            {/* Daily Health Tracking */}
            <div className="mt-10 px-4 sm:px-0">
              <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">Daily Health Tracking</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <HealthCardLink 
                  href="/vitals"
                  icon={<FaHeartbeat className="text-red-500 text-2xl" />}
                  title="Vital Signs"
                  description="Track blood pressure, heart rate, and temperature"
                  color="red"
                />
                <HealthCardLink 
                  href="/weight"
                  icon={<FaWeight className="text-blue-500 text-2xl" />}
                  title="Weight Tracker"
                  description="Log and analyze weight trends over time"
                  color="blue"
                />
                <HealthCardLink 
                  href="/hydration"
                  icon={<FaWater className="text-cyan-500 text-2xl" />}
                  title="Hydration Log"
                  description="Monitor daily water intake"
                  color="cyan"
                />
                <HealthCardLink 
                  href="/activity"
                  icon={<FaRunning className="text-green-500 text-2xl" />}
                  title="Activity Log"
                  description="Record exercise and steps"
                  color="green"
                />
              </div>
            </div>
            
            {/* Medical Management */}
            <div className="mt-10 px-4 sm:px-0">
              <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">Medical Management</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <HealthCardLink 
                  href="/medications"
                  icon={<FaPills className="text-purple-500 text-2xl" />}
                  title="Medications"
                  description="Manage prescriptions and reminders"
                  color="purple"
                />
                <HealthCardLink 
                  href="/allergies"
                  icon={<FaAllergies className="text-amber-500 text-2xl" />}
                  title="Allergies"
                  description="Document allergies and reactions"
                  color="amber"
                />
                <HealthCardLink 
                  href="/immunizations"
                  icon={<FaSyringe className="text-emerald-500 text-2xl" />}
                  title="Immunizations"
                  description="Vaccination records and schedules"
                  color="emerald"
                />
                <HealthCardLink 
                  href="/conditions"
                  icon={<FaClinicMedical className="text-indigo-500 text-2xl" />}
                  title="Health Conditions"
                  description="Manage chronic conditions"
                  color="indigo"
                />
              </div>
            </div>
            
            {/* Appointments & Records */}
            <div className="mt-10 px-4 sm:px-0">
              <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">Appointments & Records</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <HealthCardLink 
                  href="/appointments"
                  icon={<FaCalendarAlt className="text-teal-500 text-2xl" />}
                  title="Appointments"
                  description="Schedule doctor visits"
                  color="teal"
                />
                <HealthCardLink 
                  href="/care-team"
                  icon={<FaUserMd className="text-pink-500 text-2xl" />}
                  title="Care Team"
                  description="Your healthcare providers"
                  color="pink"
                />
                <HealthCardLink 
                  href="/medical-records"
                  icon={<FaFileMedicalAlt className="text-orange-500 text-2xl" />}
                  title="Medical Records"
                  description="Test results and documents"
                  color="orange"
                />
                <HealthCardLink 
                  href="/insurance"
                  icon={<FaFirstAid className="text-rose-500 text-2xl" />}
                  title="Insurance"
                  description="Policy details and claims"
                  color="rose"
                />
              </div>
            </div>
            
            {/* Wellness & Lifestyle */}
            <div className="mt-10 px-4 sm:px-0 mb-10">
              <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">Wellness & Lifestyle</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <HealthCardLink 
                  href="/nutrition"
                  icon={<FaUtensils className="text-lime-500 text-2xl" />}
                  title="Nutrition Log"
                  description="Track meals and nutrients"
                  color="lime"
                />
                <HealthCardLink 
                  href="/sleep"
                  icon={<FaBed className="text-violet-500 text-2xl" />}
                  title="Sleep Tracker"
                  description="Monitor sleep patterns"
                  color="violet"
                />
                <HealthCardLink 
                  href="/mental-health"
                  icon={<FaBrain className="text-sky-500 text-2xl" />}
                  title="Mental Health"
                  description="Mood and stress tracking"
                  color="sky"
                />
                <HealthCardLink 
                  href="/dental"
                  icon={<FaTooth className="text-fuchsia-500 text-2xl" />}
                  title="Dental Health"
                  description="Oral care tracking"
                  color="fuchsia"
                />
              </div>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}

// Reusable HealthCard component with Link
type HealthCardLinkProps = {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  color: keyof typeof colorClasses;
};

const colorClasses = {
  red: 'bg-red-50 border-red-100 text-red-800 hover:bg-red-100',
  blue: 'bg-blue-50 border-blue-100 text-blue-800 hover:bg-blue-100',
  cyan: 'bg-cyan-50 border-cyan-100 text-cyan-800 hover:bg-cyan-100',
  green: 'bg-green-50 border-green-100 text-green-800 hover:bg-green-100',
  purple: 'bg-purple-50 border-purple-100 text-purple-800 hover:bg-purple-100',
  amber: 'bg-amber-50 border-amber-100 text-amber-800 hover:bg-amber-100',
  emerald: 'bg-emerald-50 border-emerald-100 text-emerald-800 hover:bg-emerald-100',
  indigo: 'bg-indigo-50 border-indigo-100 text-indigo-800 hover:bg-indigo-100',
  teal: 'bg-teal-50 border-teal-100 text-teal-800 hover:bg-teal-100',
  pink: 'bg-pink-50 border-pink-100 text-pink-800 hover:bg-pink-100',
  orange: 'bg-orange-50 border-orange-100 text-orange-800 hover:bg-orange-100',
  rose: 'bg-rose-50 border-rose-100 text-rose-800 hover:bg-rose-100',
  lime: 'bg-lime-50 border-lime-100 text-lime-800 hover:bg-lime-100',
  violet: 'bg-violet-50 border-violet-100 text-violet-800 hover:bg-violet-100',
  sky: 'bg-sky-50 border-sky-100 text-sky-800 hover:bg-sky-100',
  fuchsia: 'bg-fuchsia-50 border-fuchsia-100 text-fuchsia-800 hover:bg-fuchsia-100'
};

function HealthCardLink({ href, icon, title, description, color }: HealthCardLinkProps) {
  return (
    <Link href={href} passHref>
      <div className={`rounded-lg p-6 border ${colorClasses[color]} shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col cursor-pointer`}>
        <div className="mb-4">
          {icon}
        </div>
        <h3 className="text-lg font-medium mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </Link>
  );
}