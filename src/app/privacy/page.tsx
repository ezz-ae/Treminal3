
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 py-12 md:py-24">
        <div className="container mx-auto px-4">
          <div className="prose prose-invert max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold font-headline mb-8">Privacy Policy</h1>
            <p>Last updated: July 26, 2024</p>
            
            <h2 className="font-headline">1. Introduction</h2>
            <p>Welcome to Treminal3 ("we," "our," "us"). We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services (the "Services"). Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.</p>

            <h2 className="font-headline">2. Information We Collect</h2>
            <p>We may collect information about you in a variety of ways. The information we may collect on the Site includes:</p>
            <ul>
              <li><strong>Personal Data:</strong> Personally identifiable information, such as your email address, that you voluntarily give to us when you register with the Site or when you choose to participate in various activities related to the Site. You are under no obligation to provide us with personal information of any kind, however your refusal to do so may prevent you from using certain features of the Site.</li>
              <li><strong>Derivative Data:</strong> Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.</li>
              <li><strong>Wallet Information:</strong> We may collect information about your cryptocurrency wallet, such as your public wallet address, when you connect your wallet to our Services. We do not collect or store your private keys. All transactions initiated through our Services are processed on the respective blockchain and are not controlled by us.</li>
              <li><strong>Data from AI Services:</strong> When you use our AI-powered services (like the dApp Builder or Token Launcher), we collect the descriptions and prompts you provide. This data is used to provide the service and to improve our AI models. We do not use this data to personally identify you.</li>
            </ul>

            <h2 className="font-headline">3. Use of Your Information</h2>
            <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:</p>
            <ul>
              <li>Create and manage your account.</li>
              <li>Provide, operate, and maintain our Services.</li>
              <li>Improve, personalize, and expand our Services.</li>
              <li>Understand and analyze how you use our Services.</li>
              <li>Develop new products, services, features, and functionality.</li>
              <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes.</li>
              <li>Monitor and analyze usage and trends to improve your experience with the Site.</li>
            </ul>

            <h2 className="font-headline">4. Disclosure of Your Information</h2>
            <p>We may share information we have collected about you in certain situations. Your information may be disclosed as follows:</p>
            <ul>
              <li><strong>By Law or to Protect Rights:</strong> If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.</li>
              <li><strong>Third-Party Service Providers:</strong> We may share your information with third parties that perform services for us or on our behalf, including data analysis, email delivery, hosting services, customer service, and AI model hosting (e.g., Google's Vertex AI). We ensure these third parties are bound by confidentiality obligations.</li>
            </ul>

            <h2 className="font-headline">5. Security of Your Information</h2>
            <p>We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.</p>

            <h2 className="font-headline">6. Contact Us</h2>
            <p>If you have questions or comments about this Privacy Policy, please contact us at: support@treminal3.com</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
