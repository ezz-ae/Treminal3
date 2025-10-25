
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, User, Loader2, Wand2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { recommendBusinessTools } from '@/ai/actions';
import type { BusinessToolRecommendationOutput } from '@/ai/schemas/business-tool-recommendation';
import { iconMap } from '@/lib/icon-map';
import Link from 'next/link';

const toolLinks: Record<string, string> = {
    'AI Business Architect': '/dashboard/dapp-builder',
    'Bot Creator': '/dashboard/bot-creator',
    'Solana Command Center': '/dashboard/solana',
    'Security Audits': '/dashboard/security-audits',
    'Token Launcher': '/dashboard/token-launcher',
    'On-chain Analytics': '/dashboard/finance',
    'Staking': '/dashboard/stake',
    'Developer Tools': '/dashboard/tools',
    'Documentation': '/dashboard/docs',
    'Web3 Actions': '/dashboard/actions'
}

type Message = {
  type: 'bot' | 'user';
  text: string;
};

const questions = [
  "What industry does your project operate in? (e.g., DeFi, Gaming, NFTs)",
  "What is the current stage of your business? (e.g., Idea, Prototype, MVP)",
  "What are your primary goals for this project?",
  "Can you briefly describe your project?",
];

export function ConversationalDappBuilder() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [recommendations, setRecommendations] = useState<BusinessToolRecommendationOutput | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([{ type: 'bot', text: questions[0] }]);
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const newMessages: Message[] = [...messages, { type: 'user', text: userInput }];
    setMessages(newMessages);
    setUserInput('');

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setMessages(prev => [...prev, { type: 'bot', text: questions[currentQuestion + 1] }]);
        setCurrentQuestion(prev => prev + 1);
      }, 500);
    } else {
      setIsGenerating(true);
      const userResponses = newMessages.filter(m => m.type === 'user').map(m => m.text);
      const formattedData = {
        industry: userResponses[0],
        stage: userResponses[1],
        goals: userResponses[2].split(','),
        description: userResponses[3],
      };

      try {
        const result = await recommendBusinessTools(formattedData);
        setRecommendations(result);
      } catch (error) {
        console.error("Failed to get recommendations", error);
        setMessages(prev => [...prev, { type: 'bot', text: "I'm sorry, I was unable to generate recommendations. Please try again later." }]);
      } finally {
        setIsGenerating(false);
      }
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div ref={chatContainerRef} className="flex-1 space-y-4 p-4 overflow-y-auto">
        <AnimatePresence>
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex items-start gap-3 max-w-lg ${msg.type === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
              {msg.type === 'bot' ? <Bot className="w-6 h-6 text-primary flex-shrink-0" /> : <User className="w-6 h-6 flex-shrink-0" />}
              <div className={`p-3 rounded-lg ${msg.type === 'bot' ? 'bg-card-foreground/5' : 'bg-primary text-primary-foreground'}`}>
                <p className="text-sm">{msg.text}</p>
              </div>
            </motion.div>
          ))}
          {isGenerating && (
             <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3">
                <Bot className="w-6 h-6 text-primary flex-shrink-0" />
                <div className="p-3 rounded-lg bg-card-foreground/5 flex items-center gap-2">
                    <Loader2 className="animate-spin w-5 h-5" />
                    <p className="text-sm">Generating your strategic plan...</p>
                </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {recommendations ? (
        <div className="p-4 border-t">
            <h3 className="text-lg font-bold font-headline mb-4">Your Strategic Plan</h3>
            <div className="space-y-4 max-h-64 overflow-y-auto">
                {recommendations.recommendations.map((rec, index) => {
                    const LucideIcon = iconMap[rec.icon] || iconMap['AppWindow'];
                    const toolLink = toolLinks[rec.name] || '/dashboard';
                    return (
                        <div key={index} className="border-l-4 border-primary pl-4 py-2 bg-card-foreground/5 rounded-r-lg">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h4 className="font-bold text-base flex items-center gap-2"><LucideIcon className="w-5 h-5"/> {rec.name}</h4>
                                    <p className="text-sm text-muted-foreground mt-1">{rec.description}</p>
                                </div>
                                <Button asChild variant="secondary" size="sm">
                                    <Link href={toolLink}>Go to Tool <ArrowRight className="w-4 h-4 ml-2" /></Link>
                                </Button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
      ) : (
        <div className="p-4 border-t flex items-center gap-2">
            <Input
            type="text"
            placeholder="Type your answer..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            disabled={isGenerating}
            className="h-11"
            />
            <Button size="lg" onClick={handleSendMessage} disabled={isGenerating}>
                <Wand2 className="h-4 w-4" />
            </Button>
        </div>
      )}
    </div>
  );
}
