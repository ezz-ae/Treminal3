import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">Welcome to Your Project</h1>
      <p className="text-lg mb-8">
        The landing page content has been moved.
      </p>
      <Link href="/web3" className="text-primary hover:underline text-xl">
        View the new Web3 Landing Page
      </Link>
    </div>
  );
}
