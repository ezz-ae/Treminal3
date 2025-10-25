
'use client';

import { ConversationalDappBuilder } from '@/components/dashboard/conversational-dapp-builder';
import { Card, CardContent } from '@/components/ui/card';
import { Terminal } from 'lucide-react';

export default function DappBuilderPage() {
  return (
    <div className="container mx-auto py-12 h-[calc(100vh-10rem)]">
        <div className="text-center">
            <h1 className="text-3xl font-bold font-headline flex items-center justify-center gap-3"><Terminal className="w-8 h-8 text-primary" /> AI Command Center</h1>
            <p className="text-muted-foreground text-lg mt-2">
                Describe your goal, and our AI will generate a strategic plan, recommend tools, and guide you through execution.
            </p>
        </div>
        
        <Card className="mt-8 h-full flex flex-col">
            <CardContent className="p-0 h-full">
                <ConversationalDappBuilder />
            </CardContent>
        </Card>
   </div>
  );
}
