
'use client';

import { ConversationalDappBuilder } from '@/components/dashboard/conversational-dapp-builder';
import { AppWindow } from 'lucide-react';

export default function DappBuilderPage() {
  return (
    <div className="container mx-auto py-12 flex-1 flex flex-col">
        <div className="text-center">
            <h1 className="text-4xl font-bold font-headline flex items-center justify-center gap-3"><AppWindow className="w-10 h-10 text-primary" /> AI Business Architect</h1>
            <p className="text-muted-foreground text-lg mt-4 max-w-3xl mx-auto">
                Answer a few simple questions about your project, and our AI will generate a personalized strategic plan with tool recommendations to accelerate your journey from idea to launch.
            </p>
        </div>
        
        <div className="mt-8 flex-1 flex flex-col">
            <ConversationalDappBuilder />
        </div>
   </div>
  );
}
