'use client';
import { ReactNode } from 'react';
import { Workflow } from 'lucide-react';
import GridPattern from '@/components/landing/grid-pattern';

export default function ExecutionPlanLayout({ children }: { children: ReactNode }) {

  return (
      <div className="flex-1 flex flex-col">
          <div className="relative isolate overflow-hidden border-b">
              <GridPattern
                  width={60}
                  height={60}
                  x={-1}
                  y={-1}
                  className="[mask-image:radial-gradient(ellipse_at_center,white_10%,transparent_80%)] opacity-20 "
               />
               <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background z-0"></div>
              <div className="container mx-auto py-8 z-10 relative">
                  <h1 className="text-4xl md:text-5xl font-bold font-headline flex items-center gap-3">
                      <Workflow className="w-12 h-12 text-primary" />
                      AI Execution Planner
                  </h1>
                  <p className="text-muted-foreground text-lg max-w-3xl mt-4">
                      Design, manage, and monitor your automated AI workflows. This is your command center for all AI operations on the Terminal3 platform.
                  </p>
              </div>
          </div>
          <div className="flex-1 flex flex-col bg-background/95">
            {children}
          </div>
      </div>
  );
}
