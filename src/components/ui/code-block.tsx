
'use client';

import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Copy } from 'lucide-react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-solidity';
import { useEffect } from 'react';

export const CustomCodeBlock = ({ code, language = 'solidity' }: { code: string; language?: string }) => {
    const { toast } = useToast();
    
    useEffect(() => {
        Prism.highlightAll();
    }, [code, language]);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        toast({
            title: "Copied to clipboard!",
        });
    }

    return (
        <div className="relative group my-4 rounded-md overflow-hidden bg-[#2d2d2d]">
            <pre className={`language-${language} p-4 text-sm font-mono`}>
                <code>{code.trim()}</code>
            </pre>
            <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={handleCopy}
            >
                <Copy className="w-4 h-4 text-white"/>
            </Button>
        </div>
    )
}
