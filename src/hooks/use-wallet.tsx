
'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useLocalStorage } from './use-local-storage';
import { useRouter } from 'next/navigation';

type Wallet = {
    address: string;
};

type WalletContextType = {
    wallet: Wallet | null;
    connectWallet: () => Promise<void>;
    disconnectWallet: () => Promise<void>;
};

const WalletContext = createContext<WalletContextType | undefined>(undefined);

/**
 * A provider component that manages wallet state and actions.
 * It uses local storage to persist the connected wallet address.
 * @param {object} props - The component props.
 * @param {ReactNode} props.children - The child components to render.
 * @returns {JSX.Element} The WalletProvider component.
 */
export const WalletProvider = ({ children }: { children: ReactNode }) => {
    const [wallet, setWallet] = useState<Wallet | null>(null);
    const [storedWallet, setStoredWallet] = useLocalStorage<Wallet | null>('wallet', null);
    const router = useRouter();

    useEffect(() => {
        if (storedWallet) {
            setWallet(storedWallet);
        }
    }, [storedWallet]);
    

    const connectWallet = async () => {
        // This is a mock connection. In a real app, you would use a library
        // like ethers.js, viem, or web3-react to connect to a browser wallet.
        const mockAddress = `0x${[...Array(40)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`;
        const newWallet = { address: mockAddress };
        setWallet(newWallet);
        setStoredWallet(newWallet);
    };

    const disconnectWallet = async () => {
        setWallet(null);
        setStoredWallet(null);
        router.push('/');
    };

    return (
        <WalletContext.Provider value={{ wallet, connectWallet, disconnectWallet }}>
            {children}
        </WalletContext.Provider>
    );
};

/**
 * Custom hook to access the wallet context.
 * @returns {WalletContextType} The wallet context.
 */
export const useWallet = () => {
    const context = useContext(WalletContext);
    if (context === undefined) {
        throw new Error('useWallet must be used within a WalletProvider');
    }
    return context;
};
