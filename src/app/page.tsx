'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function WelcomePage() {
  const [currentFeature, setCurrentFeature] = useState(0);
  
  const features = [
    {
      icon: '🏥',
      title: 'Virtual Consultations',
      description: 'Connect with healthcare professionals from the comfort of your home'
    },
    {
      icon: '📊',
      title: 'Health Analytics',
      description: 'Track your health metrics and get personalized insights'
    },
    {
      icon: '💊',
      title: 'Medication Management',
      description: 'Never miss a dose with our smart reminders'
    },
    {
      icon: '🔒',
      title: 'Secure Records',
      description: 'Your health data is encrypted and protected'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <head>
        <title>HealthBridge - Your Digital Health Companion</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2563EB" />
      </head>
      
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col items-center justify-center p-6">
        <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Hero Section */}
          <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 p-8 md:p-12 text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to HealthBridge</h1>
              <p className="text-xl md:text-2xl font-light mb-8">Your digital gateway to better health</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex flex-wrap gap-4 justify-center"
            >
              <Link 
                href="/login" 
                className="px-8 py-3 bg-white text-blue-600 rounded-full font-medium hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl"
              >
                Login
              </Link>
              <Link 
                href="/register" 
                className="px-8 py-3 bg-transparent border-2 border-white rounded-full font-medium hover:bg-white hover:text-blue-600 transition-all"
              >
                Register
              </Link>
            </motion.div>
          </div>
          
          {/* Features Section */}
          <div className="p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
              Transforming Healthcare Experience
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.6, duration: 0.5 }}
                  className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition-all"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
            
            {/* Highlight Feature */}
            <div className="bg-blue-50 rounded-xl p-6 mb-8">
              <motion.div
                key={currentFeature}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <div className="text-5xl mb-4">{features[currentFeature].icon}</div>
                <h3 className="text-xl font-bold text-blue-700 mb-2">
                  {features[currentFeature].title}
                </h3>
                <p className="text-blue-600">
                  {features[currentFeature].description}
                </p>
              </motion.div>
            </div>
            
            {/* Testimonial */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-indigo-100 rounded-xl p-6 mb-8"
            >
              <p className="italic text-gray-700 mb-4">
                "HealthBridge has completely transformed how I manage my family's healthcare. The virtual consultations saved us countless hours!"
              </p>
              <p className="font-medium text-indigo-700">- Sarah Johnson</p>
            </motion.div>
            
            {/* Final CTA */}
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Ready to take control of your health?</h3>
              <Link 
                href="/register" 
                className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-medium hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl"
              >
                Get Started Now
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}