
'use client';

import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Copy } from 'lucide-react';

interface CustomCodeBlockProps {
    code: string;
    language?: string;
}

/**
 * A UI component for displaying blocks of code with a copy-to-clipboard button.
 * @param {CustomCodeBlockProps} props - The component props.
 * @returns {JSX.Element} The code block component.
 */
export const CustomCodeBlock = ({ code, language = 'solidity' }: CustomCodeBlockProps) => {
    const { toast } = useToast();
    
    /**
     * Copies the code to the user's clipboard and shows a toast notification.
     */
    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        toast({
            title: "Copied to clipboard!",
        });
    }

    return (
        <div className="relative group my-4 rounded-md overflow-hidden bg-card border">
            <pre className={`language-${language} p-4 text-sm font-mono overflow-x-auto`}>
                <code className='text-foreground'>{code.trim()}</code>
            </pre>
            <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={handleCopy}
            >
                <Copy className="w-4 h-4 text-muted-foreground"/>
            </Button>
        </div>
    )
}
