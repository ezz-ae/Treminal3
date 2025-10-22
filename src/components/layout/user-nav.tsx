
'use client';

import {
  LogOut,
  Wallet,
  Settings,
  History,
  Repeat,
  Activity,
  ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { useWallet } from '@/hooks/use-wallet';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';

const portfolio = [
  { token: 'ETH', amount: 2.5, value: 8750 },
  { token: 'SOL', amount: 120, value: 18000 },
  { token: 'T3', amount: 5000, value: 500 },
];

const transactionHistory = [
  {
    type: 'Swap',
    details: 'ETH to USDC',
    amount: '-0.5 ETH',
    status: 'Completed',
  },
  {
    type: 'Stake',
    details: '100 SOL',
    amount: '+100 sSOL',
    status: 'Completed',
  },
  {
    type: 'Airdrop',
    details: 'Claimed 1000 T3',
    amount: '+1000 T3',
    status: 'Completed',
  },
];

const platformActivity = [
  { action: 'Deployed Bot', details: 'Momentum Master (BTC)', time: '2h ago' },
  { action: 'Ran Audit', details: 'SimpleAuction.sol', time: '1d ago' },
  { action: 'Launched Token', details: 'Galaxy Dust (GLXY)', time: '3d ago' },
];

function PortfolioTab() {
  const totalValue = portfolio.reduce((acc, item) => acc + item.value, 0);
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">Total Portfolio Value</p>
          <p className="text-2xl font-bold">
            ${totalValue.toLocaleString('en-US')}
          </p>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Asset</TableHead>
              <TableHead>Balance</TableHead>
              <TableHead className="text-right">Value (USD)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {portfolio.map((item) => (
              <TableRow key={item.token}>
                <TableCell className="font-medium">{item.token}</TableCell>
                <TableCell>{item.amount}</TableCell>
                <TableCell className="text-right">
                  ${item.value.toLocaleString('en-US')}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function HistoryTab() {
  return (
    <Card>
      <CardContent className="pt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Details</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactionHistory.map((tx, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Badge variant="outline">{tx.type}</Badge>
                </TableCell>
                <TableCell>{tx.details}</TableCell>
                <TableCell>{tx.amount}</TableCell>
                <TableCell className="text-right text-green-400">
                  {tx.status}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function SwapTab() {
  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div>
          <label className="text-sm font-medium">You sell</label>
          <Input type="number" placeholder="0.1" className="mt-1" />
        </div>
        <div>
          <label className="text-sm font-medium">You buy</label>
          <Input type="number" placeholder="345.67" className="mt-1" />
        </div>
        <Button className="w-full">Swap</Button>
      </CardContent>
    </Card>
  );
}

function ActivityTab() {
  return (
    <Card>
      <CardContent className="pt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Action</TableHead>
              <TableHead>Details</TableHead>
              <TableHead className="text-right">Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {platformActivity.map((act, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">{act.action}</TableCell>
                <TableCell>{act.details}</TableCell>
                <TableCell className="text-right text-muted-foreground">
                  {act.time}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export function UserNav() {
  const { wallet, connectWallet, disconnectWallet } = useWallet();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!wallet) {
    return (
      <Button onClick={connectWallet}>
        <Wallet className="mr-2 h-4 w-4" />
        Connect Wallet
      </Button>
    );
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">
            <Wallet className="mr-2 h-4 w-4" />
            {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">My Wallet</p>
              <p className="text-xs leading-none text-muted-foreground">
                {wallet.address}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onSelect={() => setIsModalOpen(true)}>
              <Settings className="mr-2" />
              <span>Account Center</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={disconnectWallet}>
            <LogOut className="mr-2" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Account Center</DialogTitle>
            <DialogDescription>
              Manage your portfolio, view history, and swap assets across your
              connected wallet.
            </DialogDescription>
          </DialogHeader>
          <Tabs defaultValue="portfolio" className="mt-4">
            <TabsList>
              <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="swap">Swap</TabsTrigger>
              <TabsTrigger value="activity">Platform Activity</TabsTrigger>
            </TabsList>
            <TabsContent value="portfolio" className="mt-4">
              <PortfolioTab />
            </TabsContent>
            <TabsContent value="history" className="mt-4">
              <HistoryTab />
            </TabsContent>
            <TabsContent value="swap" className="mt-4">
              <SwapTab />
            </TabsContent>
            <TabsContent value="activity" className="mt-4">
              <ActivityTab />
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  );
}
