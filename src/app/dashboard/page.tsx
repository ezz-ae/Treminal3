
import { PersonalizedRecommendations } from '@/components/dashboard/personalized-recommendations';

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold font-headline mb-8">Welcome to your Dashboard</h1>
      <PersonalizedRecommendations />
    </div>
  );
}
