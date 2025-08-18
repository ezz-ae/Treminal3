import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import InteractiveHero from '@/components/payments/interactive-hero';

export default function PaymentsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <InteractiveHero />
      </main>
      <Footer />
    </div>
  );
}