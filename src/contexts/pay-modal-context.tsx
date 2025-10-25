
'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { PayModalV2 } from '@/components/PayModalV2';

interface PayModalContextType {
  showPayModal: (usageTag: 'SEC_AUDIT' | 'TOKEN_LAUNCH' | 'SOLANA_TOOL' | 'SOLANA_CLOSE_ACCOUNT') => void;
  hidePayModal: () => void;
}

const PayModalContext = createContext<PayModalContextType | undefined>(
  undefined
);

export function usePayModal() {
  const context = useContext(PayModalContext);
  if (!context) {
    throw new Error('usePayModal must be used within a PayModalProvider');
  }
  return context;
}

export function PayModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [usageTag, setUsageTag] = useState<'SEC_AUDIT' | 'TOKEN_LAUNCH' | 'SOLANA_TOOL' | 'SOLANA_CLOSE_ACCOUNT'>('SEC_AUDIT');

  const showPayModal = (tag: 'SEC_AUDIT' | 'TOKEN_LAUNCH' | 'SOLANA_TOOL' | 'SOLANA_CLOSE_ACCOUNT') => {
    setUsageTag(tag);
    setIsOpen(true);
  };

  const hidePayModal = () => setIsOpen(false);

  return (
    <PayModalContext.Provider value={{ showPayModal, hidePayModal }}>
      {children}
      {isOpen && <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
        <PayModalV2 usageTag={usageTag} />
      </div>}
    </PayModalContext.Provider>
  );
}
