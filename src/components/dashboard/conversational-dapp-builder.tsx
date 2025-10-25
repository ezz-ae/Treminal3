
'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, User, Loader2, ArrowRight, ArrowLeft, Wand2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
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

const questions = [
  {
    id: 'description',
    text: "Let's start with your vision. What does your Web3 project do?",
    placeholder: "e.g., A decentralized lending protocol for NFTs..."
  },
  {
    id: 'industry',
    text: "Which sector of Web3 does this fall into?",
    placeholder: "e.g., DeFi, GameFi, ReFi, DePIN...",
    suggestions: ["DeFi", "GameFi", "NFTs", "SocialFi", "ReFi", "DePIN"]
  },
  {
    id: 'stage',
    text: "What's the current stage of your project?",
    placeholder: "e.g., Back-of-the-napkin idea...",
    suggestions: ["Idea", "Prototype", "MVP", "Pre-seed", "Post-launch"]
  },
  {
    id: 'goals',
    text: "What are your primary goals right now?",
    placeholder: "e.g., Acquire first 1000 users...",
    suggestions: ["Launch MVP", "Secure funding", "Build community", "Generate revenue"]

  },
];

const StepHeader = ({ currentStep }: { currentStep: number }) => (
    <div className="mb-8 flex items-center justify-center space-x-4">
        {questions.map((q, index) => (
            <div key={q.id} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep > index ? 'bg-primary text-primary-foreground' : currentStep === index ? 'border-2 border-primary text-primary' : 'bg-card-foreground/10 text-muted-foreground'}`}>
                    {currentStep > index ? <Check className="w-5 h-5" /> : index + 1}
                </div>
                {index < questions.length - 1 && <div className="w-16 h-0.5 bg-card-foreground/10" />} 
            </div>
        ))}
    </div>
);

export function ConversationalDappBuilder() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [userInput, setUserInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [recommendations, setRecommendations] = useState<BusinessToolRecommendationOutput | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
      inputRef.current?.focus();
  }, [currentStep]);

  const handleNext = () => {
    if (userInput.trim() === '') return;
    setAnswers(prev => ({ ...prev, [questions[currentStep].id]: userInput }));
    setUserInput('');
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
      if (currentStep > 0) {
          setCurrentStep(prev => prev - 1);
          setUserInput(answers[questions[currentStep - 1].id] || '');
      }
  };

  const handleSuggestionClick = (suggestion: string) => {
      setUserInput(suggestion);
  }

  const handleSubmit = async () => {
    setIsGenerating(true);
    const finalAnswers = { ...answers, [questions[currentStep].id]: userInput };
    const formattedData = {
        industry: finalAnswers.industry,
        stage: finalAnswers.stage,
        goals: finalAnswers.goals.split(','),
        description: finalAnswers.description,
    };
    
    try {
        const result = await recommendBusinessTools(formattedData);
        setRecommendations(result);
      } catch (error) {
        console.error("Failed to get recommendations", error);
      } finally {
        setIsGenerating(false);
      }
  }

  if (isGenerating) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 p-4 bg-card-foreground/5 rounded-lg">
                <Bot className="w-8 h-8 text-primary flex-shrink-0" />
                <Loader2 className="animate-spin w-6 h-6 mr-2" />
                <p className="text-lg">Our AI is analyzing your project and crafting a personalized strategic plan to help you succeed...</p>
            </motion.div>
        </div>
      )
  }

  if (recommendations) {
      return (
        <div className="p-8 h-full overflow-y-auto">
             <div className="text-center mb-8">
                <h2 className="text-2xl font-bold font-headline">Your AI-Generated Strategic Plan</h2>
                <p className="text-muted-foreground">Based on your input, here are the recommended tools and next steps.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendations.recommendations.map((rec, index) => {
                    const LucideIcon = iconMap[rec.icon] || iconMap['AppWindow'];
                    const toolLink = toolLinks[rec.name] || '/dashboard';
                    return (
                        <motion.div 
                            key={index} 
                            className="border-l-4 border-primary pl-4 py-4 pr-4 bg-card-foreground/5 rounded-r-lg flex flex-col justify-between"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div>
                                <h3 className="font-bold text-lg flex items-center gap-3 mb-2"><LucideIcon className="w-6 h-6 text-primary"/> {rec.name}</h3>
                                <p className="text-sm text-muted-foreground mb-4">{rec.description}</p>
                            </div>
                            <Button asChild variant="secondary" className="mt-auto w-full">
                                <Link href={toolLink}>Go to Tool <ArrowRight className="w-4 h-4 ml-2" /></Link>
                            </Button>
                        </motion.div>
                    )
                })}
            </div>
            <div className="text-center mt-8">
                <Button onClick={() => { setRecommendations(null); setCurrentStep(0); setAnswers({}); }}>Start Over</Button>
            </div>
        </div>
      )
  }

  return (
    <div className="h-full flex flex-col justify-center items-center p-8">
      <StepHeader currentStep={currentStep} />
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-xl text-center"
        >
          <div className="flex items-start gap-3">
            <Bot className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
            <div className="p-4 rounded-lg bg-card-foreground/5 text-left">
                <p className="text-lg font-medium">{questions[currentStep].text}</p>
            </div>
          </div>
        
          <div className="mt-6 flex items-center gap-2">
            <User className="w-6 h-6 flex-shrink-0 text-muted-foreground" />
            <Input
              ref={inputRef}
              type="text"
              placeholder={questions[currentStep].placeholder}
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleNext()}
              className="h-12 text-base flex-1"
            />
          </div>
          
          {questions[currentStep].suggestions && (
              <div className="mt-4 flex flex-wrap gap-2 justify-center">
                  {questions[currentStep].suggestions?.map(s => (
                      <Badge key={s} variant="outline" onClick={() => handleSuggestionClick(s)} className="cursor-pointer hover:bg-primary/10">
                          {s}
                      </Badge>
                  ))}
              </div>
          )}

        </motion.div>
      </AnimatePresence>

      <div className="mt-8 flex gap-4 w-full max-w-xl">
        <Button variant="outline" onClick={handleBack} disabled={currentStep === 0} className="w-32">
            <ArrowLeft className="w-4 h-4 mr-2"/>
            Back
        </Button>
        <Button onClick={handleNext} className="w-full">
            {currentStep === questions.length - 1 ? 'Generate Plan' : 'Next'}
            <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
