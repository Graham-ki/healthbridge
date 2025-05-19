// app/api/analyze-symptoms/route.ts
import { NextResponse } from 'next/server';
import natural from 'natural';
import compromise from 'compromise';
import { Nlp } from '@nlpjs/nlp';
import LangEn from '@nlpjs/lang-en';
import { supabase } from '../../../utils/client';

// Initialize NLP
const nlpManager = new Nlp({ languages: ['en'] });
nlpManager.use(LangEn);

// Enhanced medical knowledge base
const MEDICAL_KNOWLEDGE: {
  symptoms: { [key: string]: {
    description: string;
    severityLevels?: { [level: string]: string };
    types?: string[];
    possibleConditions: string[];
    recommendations: { [severity: string]: string[] };
  } };
  conditions: { [key: string]: {
    symptoms: string[];
    severity: string;
    treatment: string[];
    whenToSeekHelp: string;
  } };
} = {
  symptoms: {
    fever: {
      description: "Elevated body temperature above 98.6°F (37°C)",
      severityLevels: {
        mild: "99-100°F (37.2-37.8°C)",
        moderate: "100-102°F (37.8-38.9°C)",
        high: "Above 102°F (38.9°C)"
      },
      possibleConditions: ["Viral infection", "Bacterial infection", "Heat exhaustion", "COVID-19", "Flu"],
      recommendations: {
        mild: [
          "Take acetaminophen (500mg every 6 hours)",
          "Drink plenty of fluids",
          "Rest"
        ],
        moderate: [
          "Take ibuprofen (200-400mg every 6-8 hours)",
          "Use cool compresses",
          "Monitor temperature every 4 hours"
        ],
        high: [
          "Seek immediate medical attention for fever above 103°F (39.4°C)",
          "Go to emergency room if fever persists beyond 72 hours"
        ]
      }
    },
    headache: {
      description: "Pain in any region of the head",
      types: ["Tension", "Migraine", "Cluster", "Sinus"],
      possibleConditions: ["Stress", "Dehydration", "Sinus infection", "Hypertension", "Concussion"],
      recommendations: {
        mild: [
          "Take over-the-counter pain relievers (aspirin, ibuprofen, acetaminophen)",
          "Apply cold compress to forehead",
          "Rest in a quiet, dark room"
        ],
        severe: [
          "Seek emergency care for sudden, severe headache (thunderclap headache)",
          "Call emergency services if accompanied by confusion, fever, or stiff neck"
        ]
      }
    },
    // ... other symptoms
  },
  conditions: {
    flu: {
      symptoms: ["fever", "cough", "sore throat", "runny nose", "body aches"],
      severity: "Moderate",
      treatment: ["Rest", "Hydration", "Antiviral medications if early in infection"],
      whenToSeekHelp: "If symptoms worsen or breathing difficulties occur"
    },
    covid19: {
      symptoms: ["fever", "cough", "shortness of breath", "loss of taste/smell"],
      severity: "Varies",
      treatment: ["Isolation", "Symptomatic treatment", "Monoclonal antibodies for high-risk patients"],
      whenToSeekHelp: "If oxygen saturation drops below 92% or severe breathing difficulties"
    },
    // ... other conditions
  }
};

// Train NLP model
(async function() {
  // Add patterns for symptom recognition
  nlpManager.addDocument('en', 'I have %symptom%', 'symptom.describe');
  nlpManager.addDocument('en', 'I am experiencing %symptom%', 'symptom.describe');
  nlpManager.addDocument('en', 'My %symptom% is %severity%', 'symptom.describe');
  
  // Add answers
  nlpManager.addAnswer('en', 'symptom.describe', 'I understand you have {{symptom}}. Let me help with that.');
  
  await nlpManager.train();
})();

export async function POST(request: Request) {
  try {
    const { text, userId } = await request.json();

    if (!text || typeof text !== 'string') {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    // 1. NLP Processing
    const nlpResponse = await nlpManager.process('en', text);
    
    // 2. Advanced symptom extraction
    const doc = compromise(text.toLowerCase());
    const symptoms = doc.terms().match('#Noun').out('array');
    
    // 3. Severity detection
    const severityTokenizer = new natural.WordTokenizer();
    const stemmer = natural.PorterStemmer;
    const severityAnalyzer = new natural.SentimentAnalyzer('English', stemmer, 'afinn');
    const severityTokens = severityTokenizer.tokenize(text);
    const severityScore = severityAnalyzer.getSentiment(severityTokens);
    const severity = severityScore > 0.3 ? 'severe' : severityScore < -0.3 ? 'mild' : 'moderate';

    // 4. Detect known symptoms with context
    interface SymptomRecommendation {
      [severity: string]: string[];
    }

    interface SymptomData {
      description: string;
      severityLevels?: { [level: string]: string };
      types?: string[];
      possibleConditions: string[];
      recommendations: SymptomRecommendation;
    }

    interface ConditionData {
      symptoms: string[];
      severity: string;
      treatment: string[];
      whenToSeekHelp: string;
    }

    interface MedicalKnowledge {
      symptoms: Record<string, SymptomData>;
      conditions: Record<string, ConditionData>;
    }

    interface DetectedSymptom {
      name: string;
      description: string;
      severity: string;
      possibleConditions: string[];
      recommendations: string[];
    }

    interface PossibleCondition extends ConditionData {
      name: string;
      confidence: string;
    }

    const detectedSymptoms: DetectedSymptom[] = [];
    for (const symptom in MEDICAL_KNOWLEDGE.symptoms) {
      if (text.toLowerCase().includes(symptom)) {
        const symptomData = MEDICAL_KNOWLEDGE.symptoms[symptom];
        detectedSymptoms.push({
          name: symptom,
          description: symptomData.description,
          severity,
          possibleConditions: symptomData.possibleConditions,
          recommendations: symptomData.recommendations[severity] || symptomData.recommendations.mild
        });
      }
    }

    // 5. Condition prediction
    const possibleConditions = [];
    for (const condition in MEDICAL_KNOWLEDGE.conditions) {
      const requiredSymptoms = MEDICAL_KNOWLEDGE.conditions[condition].symptoms;
      const matchingSymptoms = requiredSymptoms.filter(symptom => 
        detectedSymptoms.some(ds => ds.name === symptom)
      );
      
      if (matchingSymptoms.length >= requiredSymptoms.length * 0.7) { // 70% match
        possibleConditions.push({
          name: condition,
          confidence: (matchingSymptoms.length / requiredSymptoms.length).toFixed(2),
          ...MEDICAL_KNOWLEDGE.conditions[condition]
        });
      }
    }

    // 6. Store analysis in Supabase
    const { data, error } = await supabase
      .from('symptom_logs')
      .insert([{
        user_id: userId,
        input_text: text,
        symptoms: detectedSymptoms,
        possible_conditions: possibleConditions,
        severity,
        nlp_response: nlpResponse
      }]);

    if (error) {
      console.error('Supabase error:', error);
    }

    // 7. Generate response
    const response = {
      analysis: {
        detectedSymptoms,
        possibleConditions,
        severityAssessment: severity,
        recommendedActions: [
          ...new Set(detectedSymptoms.flatMap(s => s.recommendations))
        ],
        whenToSeekHelp: possibleConditions.flatMap(c => c.whenToSeekHelp)
      },
      nlpInsights: nlpResponse
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Analysis error:', error);
    let errorMessage = 'Unknown error';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json(
      { error: 'Failed to analyze symptoms', details: errorMessage },
      { status: 500 }
    );
  }
}