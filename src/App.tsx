import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { WelcomeStep } from './components/WelcomeStep';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { SuggestionButton } from './components/SuggestionButton';
import { ResultStep } from './components/ResultStep';
import { ChartSuggestion } from './components/ChartSuggestion';
import { ParticleBackground } from './components/ParticleBackground';
import { AccessOverlay } from './components/AccessOverlay';
import { Footer } from './components/Footer';
import { SuggestedReports } from './components/SuggestedReports';
import { Step, Message, Deliverable, ChartType } from './types';
import { openAIService } from './services/openai';
import { VisualizationService } from './services/visualizationService';
import { BarChart2, LineChart, PieChart, TrendingUp } from 'lucide-react';

const EXAMPLE_QUERIES = [
  { icon: BarChart2, text: "How are our sales this week?" },
  { icon: PieChart, text: "Which target segment is better?" },
  { icon: TrendingUp, text: "Make sales projections: Tostones" },
  { icon: LineChart, text: "How are we on social media?" }
];

function App() {
  const [currentStep, setCurrentStep] = useState<Step>('welcome');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [deliverable, setDeliverable] = useState<Deliverable | null>(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [aiResponse, setAiResponse] = useState<string>('');

  const handleAccess = (code: string) => {
    if (code.toLowerCase() === 'admin') {
      setIsAuthorized(true);
    }
  };

  const handleStart = () => {
    setCurrentStep('query');
    setMessages([{
      text: "How can I help you with data today?",
      isBot: true
    }]);
  };

  const handleSendMessage = async (text: string) => {
    if (isLoading) return;

    setMessages(prev => [...prev, { text, isBot: false }]);
    setIsLoading(true);

    try {
      setMessages(prev => [...prev, { 
        text: "Analyzing your data...", 
        isBot: true, 
        isLoading: true 
      }]);

      const response = await openAIService.sendMessage(text);
      setAiResponse(response);
      setCurrentStep('suggestion');
      
    } catch (error: any) {
      setMessages(prev => prev.slice(0, -1));
      setMessages(prev => [...prev, {
        text: error.message || "An unexpected error occurred. Please try again.",
        isBot: true,
        isError: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChartConfirm = (chartType: ChartType) => {
    const visualData = VisualizationService.parseOpenAIResponse(aiResponse);
    
    setMessages(prev => prev.slice(0, -1));
    setMessages(prev => [...prev, { 
      text: visualData.description || "Here's your data visualization", 
      isBot: true,
      chart: (
        <DemoChart type={chartType} />
      )
    }]);

    const newDeliverable: Deliverable = {
      title: visualData.title,
      description: aiResponse,
      timestamp: new Date().toLocaleString(),
      visualizationType: visualData.type,
      visualizationData: visualData.data,
      isDummy: visualData.isDummy,
      chartType
    };

    setDeliverable(newDeliverable);
    setCurrentStep('result');
  };

  const handleReset = () => {
    setCurrentStep('query');
    setMessages([{
      text: "How can I help you with data today?",
      isBot: true
    }]);
    setDeliverable(null);
    setAiResponse('');
  };

  if (!isAuthorized) {
    return <AccessOverlay onAccess={handleAccess} />;
  }

  return (
    <div className="min-h-screen bg-white relative flex flex-col">
      <ParticleBackground />
      
      <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl relative">
        <AnimatePresence mode="wait">
          {currentStep === 'welcome' && (
            <WelcomeStep onStart={handleStart} />
          )}

          {currentStep === 'query' && (
            <div className="space-y-6">
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <ChatMessage
                    key={index}
                    message={message.text}
                    isBot={message.isBot}
                    chart={message.chart}
                    isLoading={message.isLoading}
                    isError={message.isError}
                  />
                ))}
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {EXAMPLE_QUERIES.map((query, index) => (
                  <SuggestionButton
                    key={index}
                    icon={query.icon}
                    text={query.text}
                    onClick={() => handleSendMessage(query.text)}
                    disabled={isLoading}
                  />
                ))}
              </div>

              <ChatInput
                onSubmit={handleSendMessage}
                disabled={isLoading}
              />

              <SuggestedReports 
                onSelect={handleSendMessage}
                disabled={isLoading}
              />
            </div>
          )}

          {currentStep === 'suggestion' && (
            <ChartSuggestion
              data={aiResponse}
              onConfirm={handleChartConfirm}
              onBack={handleReset}
            />
          )}

          {currentStep === 'result' && deliverable && (
            <ResultStep
              deliverable={deliverable}
              onReset={handleReset}
            />
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

export default App;