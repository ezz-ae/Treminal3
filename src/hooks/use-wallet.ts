
// src/hooks/use-wallet.ts

import { useAccount } from "wagmi";
import { useWallet as useSolanaWallet } from '@solana/wallet-adapter-react';
import { createContext, useContext, useMemo } from "react";

interface WalletContextType {
  wallet: any; // Replace with a more specific type
  connectWallet: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  const { address: ethAddress, connector: ethConnector, isConnected: ethConnected, connect: connectEth } = useAccount();
  const solanaWallet = useSolanaWallet();

  const wallet = useMemo(() => {
    console.log("Ethereum wallet state:", ethAddress, ethConnector, ethConnected);
    console.log("Solana wallet state:", solanaWallet.publicKey, solanaWallet.connected);
    return {
      ethereum: ethConnected ? { address: ethAddress, connector: ethConnector } : null,
      solana: solanaWallet.connected ? { address: solanaWallet.publicKey?.toString() } : null,
    };
  }, [ethAddress, ethConnector, ethConnected, solanaWallet]);

  const connectWallet = async () => {
    console.log("connectWallet called");
    if (!ethConnected) {
      console.log("Connecting Ethereum wallet");
      connectEth();
    }
    if (!solanaWallet.connected) {
      console.log("Connecting Solana wallet");
      solanaWallet.connect();
    }
  };

  const value: WalletContextType = {
    wallet,
    connectWallet: async () => {
        if (!ethConnected) {
          connectEth();
        }
        if (!solanaWallet.connected) {
          await solanaWallet.connect();
        }
      },
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};
