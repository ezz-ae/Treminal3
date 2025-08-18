import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Hero from '@/components/landing/hero';
import ForBusiness from '@/components/landing/for-business';
import Platform from '@/components/landing/platform';
import ForDevelopers from '@/components/landing/for-developers';
import Start from '@/components/landing/start';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <Hero />
        <ForBusiness />
        <Platform />
        <ForDevelopers />
        <Start />
      </main>
      <Footer />
    </div>
  );
}
