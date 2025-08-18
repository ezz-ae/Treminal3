import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Hero from '@/components/landing/hero';
import Services from '@/components/landing/services';
import Web3DevTools from '@/components/landing/web3-dev-tools';
import FinancialSolutions from '@/components/landing/financial-solutions';
import RecommendationEngine from '@/components/landing/recommendation-engine';
import InteractiveGuides from '@/components/landing/interactive-guides';
import Feedback from '@/components/landing/feedback';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Services />
        <Web3DevTools />
        <FinancialSolutions />
        <RecommendationEngine />
        <InteractiveGuides />
        <Feedback />
      </main>
      <Footer />
    </div>
  );
}
