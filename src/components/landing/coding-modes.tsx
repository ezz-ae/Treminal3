
'use client';

import { motion } from 'framer-motion';
import { Bot, Zap, Code, SlidersHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

const skills = [
  {
    icon: Code,
    name: 'AI Code Skill',
    description: 'Adjust the AI\'s proficiency and complexity in code generation.',
    defaultValue: [80]
  },
  {
    icon: Bot,
    name: 'Decision Making',
    description: 'Control the level of autonomy the AI has in making development choices.',
    defaultValue: [60]
  },
  {
    icon: Zap,
    name: 'Explanation',
    description: 'Set how verbose the AI is in explaining its actions and code.',
    defaultValue: [90]
  },
]

export default function CodingModes() {
  return (
    <section id="coding-modes" className="py-12 md:py-24 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">Modify your smart assistant as you like</h2>
          <p className="max-w-2xl mx-auto mt-4 text-muted-foreground">
            Fine-tune the behavior of your AI assistant to perfectly match your workflow and preferences.
          </p>
        </div>
        <div className="max-w-3xl mx-auto bg-card p-8 rounded-lg border">
            <div className="space-y-8">
                {skills.map((skill, index) => (
                    <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.15 }}
                    >
                        <div className="grid gap-4">
                             <div className="flex items-center gap-4">
                                <skill.icon className="w-6 h-6 text-primary" />
                                <div>
                                    <Label htmlFor={skill.name} className="text-lg font-headline font-semibold">{skill.name}</Label>
                                    <p className="text-sm text-muted-foreground">{skill.description}</p>
                                </div>
                            </div>
                            <Slider
                                id={skill.name}
                                defaultValue={skill.defaultValue}
                                max={100}
                                step={1}
                            />
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
}
