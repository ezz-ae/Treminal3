
'use client';

import { useState, useCallback, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Lightbulb, BrainCircuit } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// --- Mock Data & AI Functions ---
interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string; // For mock validation
  aiFeedback: string; // AI's explanation after answering
}

const aiKnowledgeQuestions: Question[] = [
  {
    id: 1,
    question: "What is the primary role of an AI agent in decentralized finance (DeFi)?",
    options: [
      "Manually approving every transaction for security.",
      "Autonomously executing strategies and optimizing assets.",
      "Providing customer support for blockchain issues.",
      "Writing smart contracts without any human input."
    ],
    correctAnswer: "Autonomously executing strategies and optimizing assets.",
    aiFeedback: "Correct! AI agents in DeFi excel at autonomous execution and optimization, leveraging real-time data for superior performance."
  },
  {
    id: 2,
    question: "Which of these best describes 'liquidity provisioning' in Web3?",
    options: [
      "Buying NFTs from a marketplace.",
      "Supplying assets to a decentralized exchange for trading.",
      "Minting new tokens on a blockchain.",
      "Sending tokens to another wallet."
    ],
    correctAnswer: "Supplying assets to a decentralized exchange for trading.",
    aiFeedback: "Exactly! Providing liquidity involves depositing asset pairs into a DEX, earning fees from trades, and supporting market efficiency."
  },
  {
    id: 3,
    question: "What is 'slippage' in cryptocurrency trading, and how can AI help mitigate it?",
    options: [
      "The total fees charged for a transaction; AI minimizes it by finding cheaper networks.",
      "The difference between expected and executed trade price; AI uses predictive analytics to optimize execution.",
      "A type of blockchain error; AI fixes it automatically.",
      "The speed of a transaction; AI accelerates it for faster trades."
    ],
    correctAnswer: "The difference between expected and executed trade price; AI uses predictive analytics to optimize execution.",
    aiFeedback: "That's right! Slippage is crucial, and our AI proactively analyzes market depth and volatility to minimize its impact on your trades, ensuring better execution prices."
  },
];

const cashflowActions = [
  { value: "trading_bots", label: "AI Automated Trading", description: "Deploy AI agents for precision trading and market arbitrage." },
  { value: "yield_farming", label: "AI Yield & Liquidity Optimization", description: "Maximize returns by optimizing asset allocation across various DeFi protocols." },
  { value: "token_launch_mgmt", label: "AI Token Launch & Management", description: "From creation to market, AI guides your token's journey and initial liquidity." },
  { value: "staking_rewards", label: "AI Staking & Airdrop Amplification", description: "Optimize staking rewards and discover high-value airdrop opportunities with AI."}, 
];

export function CashflowSetupPage() {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [feedback, setFeedback] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [allQuestionsCorrect, setAllQuestionsCorrect] = useState(false);
  const [selectedCashflowAction, setSelectedCashflowAction] = useState<string | null>(null);
  const [tcAccepted, setTcAccepted] = useState(false);
  const [setupComplete, setSetupComplete] = useState(false);

  // Check if setup is already complete (mock localStorage check)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedSetup = localStorage.getItem('isCashflowSetupComplete');
      if (storedSetup === 'true') {
        setSetupComplete(true);
        router.push('/dashboard'); // Redirect if already set up
      }
    }
  }, [router]);

  if (setupComplete) {
    return null; // Don't render if already complete and redirecting
  }

  const handleAnswer = (questionId: number, selectedOption: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: selectedOption }));
    setFeedback(null); // Clear previous feedback
  };

  const handleSubmitQuestion = useCallback(() => {
    const currentQuestion = aiKnowledgeQuestions[currentQuestionIndex];
    const userAnswer = answers[currentQuestion.id];

    if (!userAnswer) {
      setFeedback("Please select an answer before proceeding.");
      return;
    }

    if (userAnswer === currentQuestion.correctAnswer) {
      setFeedback(currentQuestion.aiFeedback);
      // Move to next question or show results
      if (currentQuestionIndex < aiKnowledgeQuestions.length - 1) {
        setTimeout(() => {
          setCurrentQuestionIndex(prev => prev + 1);
          setFeedback(null);
        }, 2000); // Short delay for user to read feedback
      } else {
        // Last question answered
        const allCorrect = aiKnowledgeQuestions.every(q => answers[q.id] === q.correctAnswer);
        setAllQuestionsCorrect(allCorrect);
        setShowResults(true);
      }
    } else {
      setFeedback("AI Suggestion: That's not quite right. Our AI recommends reviewing the basics to fully leverage our advanced tools.");
      // Optionally, allow retrying or provide hints
    }
  }, [currentQuestionIndex, answers]);

  const handleCompleteSetup = useCallback(() => {
    if (!allQuestionsCorrect) {
      setFeedback("Please ensure all AI knowledge questions are answered correctly.");
      return;
    }
    if (!selectedCashflowAction) {
      setFeedback("Please select your primary AI Cashflow Action.");
      return;
    }
    if (!tcAccepted) {
      setFeedback("Please accept the Terms & Conditions to proceed.");
      return;
    }
    // Mock completion - set localStorage item
    if (typeof window !== 'undefined') {
      localStorage.setItem('isCashflowSetupComplete', 'true');
      // Optionally store selected action for personalized experience
      localStorage.setItem('userCashflowAction', selectedCashflowAction);
    }
    setSetupComplete(true);
    router.push('/dashboard'); // Redirect to dashboard after setup
  }, [allQuestionsCorrect, selectedCashflowAction, tcAccepted, router]);

  const currentQuestion = aiKnowledgeQuestions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4 font-body">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-4xl p-8 rounded-xl bg-card/60 backdrop-blur-sm border border-primary/10 shadow-xl space-y-8"
      >
        <h1 className="text-4xl font-extrabold font-headline text-center bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text leading-tight mb-6">
          AI Cashflow Onboarding: Prepare for Autonomous Wealth
        </h1>

        {!showResults ? (
          <motion.div
            key={currentQuestion.id} // Key for re-animating on question change
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-headline text-foreground flex items-center gap-3">
                  <BrainCircuit className="w-6 h-6 text-primary" /> AI Knowledge Check ({currentQuestionIndex + 1}/{aiKnowledgeQuestions.length})
                </CardTitle>
                <CardContent className="pt-4">
                  <p className="text-lg text-muted-foreground mb-6 leading-relaxed">{currentQuestion.question}</p>
                  <RadioGroup 
                    value={answers[currentQuestion.id] || ''}
                    onValueChange={(value) => handleAnswer(currentQuestion.id, value)}
                    className="space-y-3"
                  >
                    {currentQuestion.options.map((option, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <RadioGroupItem value={option} id={`q${currentQuestion.id}-option${idx}`} />
                        <Label htmlFor={`q${currentQuestion.id}-option${idx}`} className="text-base text-foreground cursor-pointer">{option}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </CardContent>
              </CardHeader>
            </Card>
            
            {feedback && (
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`text-sm p-3 rounded-md flex items-center gap-2 
                  ${feedback.startsWith("Correct") ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-destructive-foreground'}
                `}
              >
                <Lightbulb className="w-4 h-4"/> {feedback}
              </motion.p>
            )}
            <div className="text-center">
              <Button 
                onClick={handleSubmitQuestion} 
                className="text-base py-6 px-9 group"
                disabled={!answers[currentQuestion.id]}
              >
                {currentQuestionIndex < aiKnowledgeQuestions.length - 1 ? 'Submit Answer' : 'See Results'}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <h2 className="text-3xl font-extrabold font-headline text-center bg-gradient-to-r from-green-400 to-blue-400 text-transparent bg-clip-text leading-tight">
              {allQuestionsCorrect ? 'Setup Complete: Welcome to Autonomous Web3!' : 'Review Your AI Foundation'}
            </h2>
            <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto leading-relaxed">
              {allQuestionsCorrect 
                ? "You've demonstrated a strong understanding of core AI-Web3 principles. Now, let's configure your AI Cashflow path." 
                : "To fully leverage Terminal3's AI capabilities, we recommend understanding the fundamentals. Please review the questions and try again."
              }
            </p>

            {allQuestionsCorrect && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold font-headline text-foreground text-center mb-4">Choose Your Primary AI Cashflow Action</h3>
                <RadioGroup 
                  value={selectedCashflowAction || ''}
                  onValueChange={setSelectedCashflowAction}
                  className="grid md:grid-cols-2 gap-4"
                >
                  {cashflowActions.map((action) => (
                    <motion.div
                        key={action.value}
                        whileHover={{ scale: 1.02, boxShadow: "0 8px 16px rgba(0,0,0,0.2)" }}
                        className="p-4 border border-primary/20 rounded-lg flex flex-col items-start space-y-2 bg-card/70 hover:bg-card/90 transition-all cursor-pointer"
                    >
                        <div className="flex items-center space-x-2 w-full">
                            <RadioGroupItem value={action.value} id={action.value} className="peer" />
                            <Label htmlFor={action.value} className="text-xl font-semibold text-foreground cursor-pointer flex-grow">
                                {action.label}
                            </Label>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed pl-6">{action.description}</p>
                    </motion.div>
                  ))}
                </RadioGroup>

                <div className="flex items-center space-x-2 justify-center mt-8">
                  <input 
                    type="checkbox" 
                    id="tc-accept" 
                    checked={tcAccepted} 
                    onChange={(e) => setTcAccepted(e.target.checked)}
                    className="form-checkbox h-5 w-5 text-primary rounded border-gray-300 focus:ring-primary"
                  />
                  <Label htmlFor="tc-accept" className="text-base text-muted-foreground cursor-pointer">
                    I accept the <Link href="/terms" className="text-primary hover:underline">Terms & Conditions</Link> and acknowledge this is for education only.
                  </Label>
                </div>
              </div>
            )}

            {feedback && (
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`text-sm p-3 rounded-md flex items-center gap-2 
                  ${feedback.startsWith("Please") ? 'bg-red-500/10 text-destructive-foreground' : 'bg-yellow-500/10 text-yellow-400'}
                `}
              >
                <Lightbulb className="w-4 h-4"/> {feedback}
              </motion.p>
            )}

            <div className="text-center mt-10">
              <Button 
                onClick={handleCompleteSetup} 
                className="text-base py-6 px-9 group"
                disabled={!allQuestionsCorrect || !selectedCashflowAction || !tcAccepted}
              >
                Complete AI Setup & Access Dashboard
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
