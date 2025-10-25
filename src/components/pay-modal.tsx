
'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface PayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PayModal({ isOpen, onClose }: PayModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Insufficient Credits</DialogTitle>
          <DialogDescription>
            You do not have enough credits to perform this action. Please
            purchase more credits to continue.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end">
          <Button onClick={() => {
            // TODO: Implement purchase logic
            console.log('Navigate to purchase page');
            onClose();
          }}>
            Purchase Credits
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
