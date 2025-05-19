'use client';
import Header from '@/components/Header';
import { useState, useRef, useEffect } from 'react';

type Message = {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

const medicalKnowledge = {
  "fever": {
    causes: ["Viral infection", "Bacterial infection", "Heat exhaustion"],
    recommendations: ["Take paracetamol (500mg every 6 hours)", "Drink plenty of fluids", "Rest", "See a doctor if fever persists beyond 3 days"]
  },
  "headache": {
    causes: ["Tension", "Migraine", "Dehydration", "Sinus infection"],
    recommendations: ["Take ibuprofen (200-400mg every 6-8 hours)", "Rest in a quiet, dark room", "Apply cold compress to forehead", "See a doctor if severe or persistent"]
  },
  "cough": {
    causes: ["Common cold", "Flu", "Allergies", "Bronchitis"],
    recommendations: ["Stay hydrated", "Use cough drops", "Try honey in warm water", "See a doctor if coughing up blood or lasts more than 2 weeks"]
  },
  "sore throat": {
    causes: ["Viral infection", "Strep throat", "Allergies", "Dry air"],
    recommendations: ["Gargle with warm salt water", "Use throat lozenges", "Stay hydrated", "See a doctor if severe or lasts more than a week"]
  },
  "fatigue": {
    causes: ["Lack of sleep", "Stress", "Anemia", "Thyroid issues"],
    recommendations: ["Get adequate sleep", "Exercise regularly", "Eat balanced meals", "See a doctor if persistent or with other symptoms"]
  }
};

export default function SymptomCheckerPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your medical assistant. What symptoms are you experiencing today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Process symptoms and generate bot response
    setTimeout(() => {
      const symptoms = inputValue.toLowerCase().split(/[,.]/).map(s => s.trim());
      const foundSymptoms: string[] = [];
      const allCauses: string[] = [];
      const allRecommendations: string[] = [];

      symptoms.forEach(symptom => {
        if (medicalKnowledge[symptom as keyof typeof medicalKnowledge]) {
          foundSymptoms.push(symptom);
          const data = medicalKnowledge[symptom as keyof typeof medicalKnowledge];
          allCauses.push(...data.causes);
          allRecommendations.push(...data.recommendations);
        }
      });

      let botResponse = '';
      if (foundSymptoms.length > 0) {
        botResponse = `For your symptoms (${foundSymptoms.join(', ')}):\n\n`;
        botResponse += `Possible causes:\n- ${Array.from(new Set(allCauses)).join('\n- ')}\n\n`;
        botResponse += `Recommendations:\n- ${Array.from(new Set(allRecommendations)).join('\n- ')}\n\n`;
        botResponse += `If symptoms persist or worsen, please consult a doctor.`;
      } else {
        botResponse = "I'm not sure I understand those symptoms. Could you describe them differently? Common symptoms I can help with include: fever, headache, cough, sore throat, fatigue.";
      }

      const botMessage: Message = {
        id: messages.length + 2,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <Header />
      <h1 className="text-3xl font-bold text-blue-600 mb-6 mt-16">Symptom Checker</h1>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Chat header */}
        <div className="bg-blue-600 p-4 text-white">
          <h2 className="text-xl font-semibold">Medical Assistant</h2>
          <p className="text-sm opacity-80">Describe your symptoms to get advice</p>
        </div>
        
        {/* Chat messages */}
        <div className="h-96 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-xs md:max-w-md rounded-lg px-4 py-2 ${message.sender === 'user' 
                  ? 'bg-blue-600 text-white rounded-br-none' 
                  : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}
              >
                <p className="whitespace-pre-wrap">{message.text}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Input area */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your symptoms here (e.g., fever, headache)"
              className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Send
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Note: This is for informational purposes only. Always consult a doctor for medical advice.
          </p>
        </div>
      </div>
    </div>
  );
}