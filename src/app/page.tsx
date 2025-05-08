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
      description: 'Connect with healthcare professionals from the comfort of your home',
      color: 'bg-blue-100',
      textColor: 'text-blue-800',
      borderColor: 'border-blue-200'
    },
    {
      icon: '📊',
      title: 'Health Analytics',
      description: 'Track your health metrics and get personalized insights',
      color: 'bg-emerald-100',
      textColor: 'text-emerald-800',
      borderColor: 'border-emerald-200'
    },
    {
      icon: '💊',
      title: 'Medication Management',
      description: 'Never miss a dose with our smart reminders',
      color: 'bg-purple-100',
      textColor: 'text-purple-800',
      borderColor: 'border-purple-200'
    },
    {
      icon: '🔒',
      title: 'Secure Records',
      description: 'Your health data is encrypted and protected',
      color: 'bg-amber-100',
      textColor: 'text-amber-800',
      borderColor: 'border-amber-200'
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
      
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col items-center justify-center p-4 sm:p-6">
        <div className="max-w-6xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Hero Section */}
          <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 p-8 md:p-12 text-white">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Welcome to HealthBridge</h1>
                <p className="text-lg sm:text-xl md:text-2xl font-light mb-8 opacity-90">
                  Your digital gateway to comprehensive healthcare solutions
                </p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <Link 
                  href="/login" 
                  className="px-6 py-2.5 sm:px-8 sm:py-3 bg-white text-blue-600 rounded-full font-medium hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl text-sm sm:text-base"
                >
                  Login
                </Link>
                <Link 
                  href="/register" 
                  className="px-6 py-2.5 sm:px-8 sm:py-3 bg-transparent border-2 border-white rounded-full font-medium hover:bg-white hover:text-blue-600 transition-all text-sm sm:text-base"
                >
                  Register
                </Link>
              </motion.div>
            </div>
          </div>
          
          {/* Features Section */}
          <div className="p-6 md:p-10 lg:p-12">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
                Our Comprehensive Features
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.6, duration: 0.5 }}
                    className={`${feature.color} ${feature.borderColor} border p-6 rounded-xl hover:shadow-md transition-all`}
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-3xl">{feature.icon}</span>
                      <div>
                        <h3 className={`${feature.textColor} text-lg font-semibold mb-2`}>{feature.title}</h3>
                        <p className="text-gray-700">{feature.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Feature Spotlight */}
              <div className={`${features[currentFeature].color} ${features[currentFeature].borderColor} border rounded-xl p-8 mb-10 text-center`}>
                <motion.div
                  key={currentFeature}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="text-5xl mb-4">{features[currentFeature].icon}</div>
                  <h3 className={`${features[currentFeature].textColor} text-xl font-bold mb-3`}>
                    {features[currentFeature].title}
                  </h3>
                  <p className={`${features[currentFeature].textColor} max-w-2xl mx-auto`}>
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
                className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 mb-10 border border-blue-100"
              >
                <div className="max-w-3xl mx-auto">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-blue-200 flex items-center justify-center text-blue-600 text-xl">SJ</div>
                    <div className="ml-4">
                      <p className="font-medium text-blue-800">Sarah Johnson</p>
                      <p className="text-sm text-blue-600">Patient since 2022</p>
                    </div>
                  </div>
                  <p className="italic text-gray-700 text-lg">
                    "HealthBridge has completely transformed how I manage my family's healthcare. The virtual consultations saved us countless hours of waiting rooms!"
                  </p>
                </div>
              </motion.div>
              
              {/* Final CTA */}
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Ready to experience better healthcare?</h3>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  Join thousands of satisfied users managing their health with our platform
                </p>
                <Link 
                  href="/register" 
                  className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-medium hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl"
                >
                  Get Started Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}