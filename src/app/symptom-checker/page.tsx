'use client';

import { useState, useRef, useEffect } from 'react';
import { Bot, User, SendHorizonal, Thermometer, Stethoscope, AlertTriangle, Pill, Sparkles } from 'lucide-react';
import Header from '@/components/Header';

interface SymptomData {
  name: string;
  severity: string;
  conditions: string[];
}

interface ConditionData {
  name: string;
  confidence: string;
  treatments: string[];
}

interface BotMessageData {
  symptoms?: SymptomData[];
  conditions?: ConditionData[];
  actions?: string[];
}

type Message = {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  type?: 'symptom' | 'diagnosis' | 'recommendation' | 'warning';
  data?: BotMessageData;
};

export default function SymptomChecker() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: '👋 Hello! I\'m your medical assistant. Please describe your symptoms in detail (e.g., "I have had a high fever and severe headache for 2 days").',
      sender: 'bot',
      type: 'diagnosis'
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function handleSendMessage() {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      type: 'symptom'
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    setInputValue('');

    try {
      const res = await fetch('/api/symptom-parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputValue }),
      });

      const { analysis } = await res.json();
      const botMessage: Message = {
        id: messages.length + 2,
        sender: 'bot',
        type: 'diagnosis',
        text: generateResponseText(analysis),
        data: {
          symptoms: analysis.detectedSymptoms?.map((s: any) => ({
            name: s.name,
            severity: s.severity,
            conditions: s.possibleConditions
          })),
          conditions: analysis.possibleConditions?.map((c: any) => ({
            name: c.name,
            confidence: c.confidence,
            treatments: c.treatment
          })),
          actions: analysis.recommendedActions
        }
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          id: messages.length + 2,
          text: '⚠️ Sorry, I encountered an error. Please try again or consult a healthcare professional if this is urgent.',
          sender: 'bot',
          type: 'warning'
        },
      ]);
    }

    setIsTyping(false);
  }

  function generateResponseText(analysis: any): string {
    if (!analysis.detectedSymptoms?.length) {
      return "🤔 I couldn't identify specific symptoms. Could you describe how you're feeling in more detail? For example: 'I have a fever and cough'";
    }

    let response = `🩺 Based on your symptoms:\n\n`;
    
    if (analysis.detectedSymptoms) {
      response += `• ${analysis.detectedSymptoms.map((s: any) => 
        `${s.name} (${s.severity})`
      ).join('\n• ')}\n\n`;
    }

    if (analysis.possibleConditions?.length) {
      response += `Possible conditions:\n${analysis.possibleConditions.map((c: any) => 
        `- ${c.name} (${(c.confidence * 100).toFixed(0)}% confidence)`
      ).join('\n')}\n\n`;
    }

    if (analysis.severityAssessment === 'severe') {
      response += `🚨 SEVERE SYMPTOMS DETECTED!\nPlease seek medical attention immediately.\n\n`;
    }

    response += `💡 Recommended actions:\n- ${analysis.recommendedActions.join('\n- ')}`;

    return response;
  }

  const getMessageStyle = (type: Message['type'], sender: Message['sender']) => {
    const base = 'max-w-[85%] p-4 rounded-xl shadow-sm';
    
    if (sender === 'user') {
      return `${base} bg-blue-600 text-white ml-auto rounded-br-none`;
    }
    
    switch(type) {
      case 'warning':
        return `${base} bg-red-50 border-l-4 border-red-500 text-red-800 rounded-bl-none`;
      case 'recommendation':
        return `${base} bg-green-50 border-l-4 border-green-500 text-green-800 rounded-bl-none`;
      case 'diagnosis':
        return `${base} bg-white border-l-4 border-blue-500 text-gray-800 rounded-bl-none`;
      default:
        return `${base} bg-gray-50 rounded-bl-none`;
    }
  };

  const renderMessageContent = (message: Message) => {
    if (!message.data) {
      return <p className="whitespace-pre-line">{message.text}</p>;
    }

    return (
      <div className="space-y-3">
        {message.data.symptoms && (
          <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
            <h4 className="font-semibold text-blue-800 flex items-center gap-2">
              <Thermometer className="w-5 h-5" />
              Detected Symptoms
            </h4>
            <ul className="mt-2 space-y-2">
              {message.data.symptoms.map((symptom, i) => (
                <li key={i} className="text-sm">
                  <span className="font-medium capitalize">{symptom.name}</span>
                  <span className={`text-xs ml-2 px-2 py-0.5 rounded-full ${
                    symptom.severity === 'severe' ? 'bg-red-100 text-red-800' :
                    symptom.severity === 'moderate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {symptom.severity}
                  </span>
                  {symptom.conditions.length > 0 && (
                    <div className="text-xs mt-1 text-gray-600">
                      Associated with: {symptom.conditions.join(', ')}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
        {message.data.actions && (
          <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-100">
            <h4 className="font-semibold text-green-800 flex items-center gap-2">
              <Pill className="w-5 h-5" />
              Recommended Actions
            </h4>
            <ul className="mt-2 space-y-1">
              {message.data.actions.map((action, i) => (
                <li key={i} className="text-sm flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  {action}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-3xl mx-auto p-4 flex flex-col h-[90vh] bg-gray-50">
      <Header /> 
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-blue-700 flex items-center justify-center gap-3">
          <div className="bg-blue-100 p-2 rounded-full">
            <Stethoscope className="w-6 h-6 text-blue-600" />
          </div>
          Medical Symptom Checker
        </h1>
        <p className="text-gray-600 mt-2 flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-gray-400" />
          Describe your symptoms for personalized health insights
        </p>
      </div>

      <div className="flex-grow overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-sm p-4 mb-4">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`mb-4 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={getMessageStyle(msg.type, msg.sender)}>
              <div className="flex items-center gap-2 mb-2">
                {msg.sender === 'bot' ? (
                  <div className="bg-blue-100 p-1 rounded-full">
                    <Bot className="w-4 h-4 text-blue-600" />
                  </div>
                ) : (
                  <div className="bg-white p-1 rounded-full">
                    <User className="w-4 h-4 text-blue-600" />
                  </div>
                )}
                <span className="text-xs font-medium text-gray-500">
                  {msg.sender === 'bot' ? 'Medical Assistant' : 'You'}
                </span>
              </div>
              {renderMessageContent(msg)}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex items-center gap-2 text-gray-500 pl-2">
            <div className="bg-blue-100 p-1 rounded-full">
              <Bot className="w-4 h-4 text-blue-600" />
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              <span className="text-sm ml-2">Analyzing symptoms...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-gray-200 pt-4 bg-white rounded-xl p-4 shadow-sm">
        <div className="flex items-center gap-2">
          <input
            type="text"
            className="flex-grow border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Describe your symptoms (e.g., headache, fever, nausea)..."
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
            disabled={isTyping}
          />
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg disabled:opacity-50 flex items-center gap-1 transition-colors shadow-md"
            onClick={handleSendMessage}
            disabled={isTyping || inputValue.trim().length === 0}
          >
            <SendHorizonal className="w-5 h-5" />
            <span className="sr-only">Send</span>
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          <button 
            onClick={() => setInputValue('fever and body aches')}
            className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-1.5 rounded-full transition-colors flex items-center gap-1"
          >
            <Thermometer className="w-3 h-3" />
            Fever
          </button>
          <button 
            onClick={() => setInputValue('persistent cough with phlegm')}
            className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-1.5 rounded-full transition-colors flex items-center gap-1"
          >
            <Pill className="w-3 h-3" />
            Cough
          </button>
          <button 
            onClick={() => setInputValue('dizziness and nausea')}
            className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-1.5 rounded-full transition-colors flex items-center gap-1"
          >
            <AlertTriangle className="w-3 h-3" />
            Dizziness
          </button>
          <button 
            onClick={() => setInputValue('severe headache with light sensitivity')}
            className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-1.5 rounded-full transition-colors flex items-center gap-1"
          >
            <Stethoscope className="w-3 h-3" />
            Headache
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-3 flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
          <span>For medical emergencies, call your local emergency number immediately. This tool does not provide medical diagnosis.</span>
        </p>
      </div>
    </div>
  );
}