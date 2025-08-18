import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Hero from '@/components/landing/hero';
import MotionTerminal from '@/components/landing/motion-terminal';
import Services from '@/components/landing/services';
import FinancialSolutions from '@/components/landing/financial-solutions';
import Web3DevTools from '@/components/landing/web3-dev-tools';
import InteractiveGuides from '@/components/landing/interactive-guides';

export default function Web3Page() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <MotionTerminal />
        <div className="flex-grow">
          <Services />
          <FinancialSolutions />
          <Web3DevTools />
          <InteractiveGuides />
        </div>
      </main>
      <Footer />
    </div>
  );
}
