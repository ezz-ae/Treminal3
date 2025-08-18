import RecommendationForm from './recommendation-form';

export default function RecommendationEngine() {
  return (
    <section id="recommendations" className="py-12 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">Find the Perfect Tools with AI</h2>
          <p className="max-w-2xl mx-auto mt-4 text-muted-foreground">
            Not sure where to start? Answer a few questions, and our AI will recommend the best tools for your specific business needs.
          </p>
        </div>
        <RecommendationForm />
      </div>
    </section>
  );
}
