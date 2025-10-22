
'use client';

import { useState, useEffect } from 'react';
import { Wind, Rocket, Terminal, Sprout, Gem, AreaChart } from 'lucide-react';
import { Card, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useMousePosition } from '@/hooks/use-mouse-position';
import GridPattern from '@/components/landing/grid-pattern';


const services = [
    { href: "/solana/launch", title: "Launchpad", description: "Create and launch a new SPL token from scratch.", icon: Rocket },
    { href: "/solana/terminal", title: "AI Terminal", description: "Interact with the network using natural language.", icon: Terminal },
    { href: "/solana/tokens", title: "Token Hub", description: "Explore and analyze tokens on the network.", icon: Gem },
    { href: "/solana/trading", title: "DEX Terminal", description: "Trade assets on Solana's decentralized exchanges.", icon: AreaChart },
    { href: "/solana/staking", title: "Staking", description: "Stake SOL and other assets to earn rewards.", icon: Sprout },
]

/**
 * A futuristic, interactive "Holo-Deck" for the Solana ecosystem.
 * Visualizes live network stats and provides access to key services through animated,
 * interactive cards that react to the user's mouse position.
 * @returns {JSX.Element} The Solana Holo-Deck page component.
 */
export default function SolanaHoloDeckPage() {
  const [networkStats, setNetworkStats] = useState({ tps: 0, slotTime: 0, epoch: 0 });
  const { x, y } = useMousePosition();

  useEffect(() => {
    // Mock real-time data fetching
    const interval = setInterval(() => {
      setNetworkStats({
        tps: Math.floor(2500 + Math.random() * 1500),
        slotTime: Math.floor(400 + Math.random() * 100),
        epoch: 512,
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const cardVariants = {
    initial: { opacity: 0, scale: 0.9, y: 20 },
    animate: (i: number) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: 'easeOut',
      },
    }),
  };

  return (
      <div className="relative w-full h-full flex flex-col items-center justify-center p-4 py-24 overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 z-0">
               <GridPattern
                  width={60}
                  height={60}
                  x={-1}
                  y={-1}
                  className="[mask-image:radial-gradient(ellipse_at_center,white_30%,transparent_100%)] opacity-30 animate-pulse"
               />
               <motion.div 
                  className="absolute inset-0 bg-primary/10 [mask-image:radial-gradient(350px_at_50%_50%,white,transparent)]"
                  style={{
                      left: x - 350,
                      top: y - 350,
                  }}
                  transition={{ type: 'tween', ease: 'backOut', duration: 0 }}
               />
          </div>
          {/* Header Content */}
          <div className="relative z-10 text-center mb-16">
              <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="flex items-center justify-center gap-4"
              >
                  <Wind className="w-12 h-12 text-primary" />
                  <h1 className="text-5xl font-bold font-headline tracking-tight">Solana Holo-Deck</h1>
              </motion.div>
              <motion.p 
                  className="text-muted-foreground text-lg mt-4 max-w-2xl mx-auto"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
              >
                  Your command center for the Solana universe. Visualize the network, execute strategies, and build the future.
              </motion.p>
          </div>
          {/* Live Stats & Service Links */}
          <div className="relative z-10 w-full max-w-7xl mx-auto space-y-16">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <motion.div variants={cardVariants} initial="initial" animate="animate" custom={0}>
                     <HoloCard title="Transactions / Sec" value={networkStats.tps.toLocaleString()} />
                 </motion.div>
                 <motion.div variants={cardVariants} initial="initial" animate="animate" custom={1}>
                     <HoloCard title="Slot Time (ms)" value={`${networkStats.slotTime}ms`} />
                 </motion.div>
                 <motion.div variants={cardVariants} initial="initial" animate="animate" custom={2}>
                     <HoloCard title="Current Epoch" value={networkStats.epoch.toString()} />
                 </motion.div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                 {services.map((service, i) => {
                     const Icon = service.icon;
                     return (
                         <motion.div key={service.title} variants={cardVariants} initial="initial" animate="animate" custom={3 + i}>
                             <Link href={service.href} className="block h-full">
                                 <Card className="h-full bg-card/60 backdrop-blur-sm border-primary/20 hover:border-primary/50 hover:bg-card/80 transition-colors duration-300 group flex flex-col justify-between text-center items-center p-6">
                                     <Icon className="w-10 h-10 text-primary mb-4"/>
                                     <CardTitle className="font-headline text-lg mb-2">{service.title}</CardTitle>
                                     <p className="text-sm text-muted-foreground flex-grow">{service.description}</p>
                                 </Card>
                             </Link>
                         </motion.div>
                     );
                 })}
             </div>
          </div>
      </div>
  );
}


const HoloCard = ({ title, value }: { title: string, value: string }) => {
    return (
        <div className="bg-card/60 backdrop-blur-sm border border-primary/20 p-6 rounded-lg text-center flex flex-col justify-center items-center h-full">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">{title}</h3>
            <p className="text-4xl font-bold font-mono text-primary mt-2">{value}</p>
        </div>
    )
}
