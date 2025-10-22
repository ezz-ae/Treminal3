'use client';

import { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { PlusCircle, Edit2, Trash2, MoreVertical, RefreshCw, Zap, Clock, Shield, CheckCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

type Flow = {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'inProgress' | 'done';
  trigger: string;
  tags: string[];
};

const initialFlows: Flow[] = [
  { id: 'flow-1', title: 'Solana "First Mover" Token Launch', description: 'Complete A-to-Z flow for new SPL token launches on Raydium.', status: 'todo', trigger: 'Manual', tags: ['Solana', 'DeFi', 'High Risk'] },
  { id: 'flow-2', title: 'ETH/Stablecoin Arbitrage Bot', description: 'Deploy a bot to capitalize on price differences between Uniswap and Sushiswap.', status: 'todo', trigger: 'Manual', tags: ['DeFi', 'Trading', 'Medium Risk'] },
  { id: 'flow-3', title: 'NFT Collection Floor Sweeper', description: 'Automatically buy the cheapest NFTs in a collection when the floor price drops.', status: 'inProgress', trigger: 'Price Alert', tags: ['NFT', 'Trading', 'High Risk'] },
  { id: 'flow-4', title: 'Portfolio Rebalancer', description: 'Maintain a desired portfolio allocation (e.g., 50% BTC, 30% ETH, 20% SOL).', status: 'inProgress', trigger: 'Hourly', tags: ['DeFi', 'Portfolio'] },
  { id: 'flow-5', title: 'DAO Proposal Automation', description: 'Automatically create and submit a recurring DAO treasury request proposal.', status: 'done', trigger: 'Monthly', tags: ['DAO', 'Governance'] },
  { id: 'flow-6', title: 'Gas Price Arbitrage', description: 'Execute non-urgent transactions only when network gas fees fall below a threshold.', status: 'done', trigger: 'Gas Price', tags: ['DeFi', 'Utility'] },
];

const statusConfig = {
    todo: { name: 'To Do', icon: PlusCircle, color: 'bg-muted-foreground' },
    inProgress: { name: 'In Progress', icon: RefreshCw, color: 'bg-blue-500' },
    done: { name: 'Done', icon: CheckCircle, color: 'bg-green-500' },
}

const tagStyles: Record<string, string> = {
    'Solana': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    'DeFi': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    'Trading': 'bg-orange-500/20 text-orange-300 border-orange-500/30',
    'High Risk': 'bg-red-500/20 text-red-300 border-red-500/30',
    'Medium Risk': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    'NFT': 'bg-pink-500/20 text-pink-300 border-pink-500/30',
    'Portfolio': 'bg-green-500/20 text-green-300 border-green-500/30',
    'DAO': 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
    'Governance': 'bg-gray-500/20 text-gray-300 border-gray-500/30',
    'Utility': 'bg-teal-500/20 text-teal-300 border-teal-500/30',
};

type Columns = {
    [key: string]: {
        name: string;
        items: Flow[];
    }
}

export default function ExecutionPlanPage() {
    const [columns, setColumns] = useState<Columns>({
        todo: { name: 'To Do', items: initialFlows.filter(f => f.status === 'todo') },
        inProgress: { name: 'In Progress', items: initialFlows.filter(f => f.status === 'inProgress') },
        done: { name: 'Done', items: initialFlows.filter(f => f.status === 'done') }
    });

    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;
        if (!destination) return;

        if (source.droppableId === destination.droppableId) {
            // Reorder within the same column
            const column = columns[source.droppableId];
            const copiedItems = [...column.items];
            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...column,
                    items: copiedItems
                }
            });
        } else {
            // Move between columns
            const sourceColumn = columns[source.droppableId];
            const destColumn = columns[destination.droppableId];
            const sourceItems = [...sourceColumn.items];
            const destItems = [...destColumn.items];
            const [removed] = sourceItems.splice(source.index, 1);
            
            // Update status of moved item
            removed.status = destination.droppableId as 'todo' | 'inProgress' | 'done';

            destItems.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: { ...sourceColumn, items: sourceItems },
                [destination.droppableId]: { ...destColumn, items: destItems }
            });
        }
    };
    
    return (
        <div className="flex-1 p-4 md:p-8 container mx-auto">
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
                    {Object.entries(columns).map(([columnId, column]) => {
                        const Icon = statusConfig[columnId as keyof typeof statusConfig].icon;
                        const color = statusConfig[columnId as keyof typeof statusConfig].color;
                        return (
                            <div key={columnId}>
                                <div className="flex items-center gap-2 mb-4">
                                     <span className={cn("h-3 w-3 rounded-full", color)} />
                                     <h2 className="text-lg font-bold font-headline">{column.name} ({column.items.length})</h2>
                                </div>
                                <Droppable droppableId={columnId}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                            className={cn("bg-card/50 border-2 border-dashed rounded-lg p-4 min-h-[500px] transition-colors", snapshot.isDraggingOver ? 'border-primary bg-primary/10' : 'border-border/20')}
                                        >
                                            {column.items.map((item, index) => (
                                                <Draggable key={item.id} draggableId={item.id} index={index}>
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                        >
                                                            <Card className={cn("mb-4 bg-card hover:bg-card/90", snapshot.isDragging && "ring-2 ring-primary shadow-lg")}>
                                                                <CardHeader>
                                                                    <div className="flex justify-between items-start">
                                                                        <CardTitle className="text-base font-bold pr-4">{item.title}</CardTitle>
                                                                        <FlowActions />
                                                                    </div>
                                                                    <div className="flex flex-wrap gap-2 pt-2">
                                                                        {item.tags.map(tag => <Badge key={tag} variant="outline" className={cn("text-xs", tagStyles[tag])}>{tag}</Badge>)}
                                                                    </div>
                                                                </CardHeader>
                                                                <CardContent className="space-y-4 text-sm">
                                                                    <p className="text-muted-foreground">{item.description}</p>
                                                                    <div className="flex items-center text-xs text-muted-foreground gap-4">
                                                                        <span className="flex items-center gap-1"><Zap className="w-3 h-3 text-primary"/> Trigger: {item.trigger}</span>
                                                                    </div>
                                                                </CardContent>
                                                            </Card>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </div>
                        );
                    })}
                </div>
            </DragDropContext>
        </div>
    );
}

const FlowActions = () => (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-6 w-6">
                <MoreVertical className="h-4 w-4" />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            <DropdownMenuItem><Edit2 className="mr-2 h-4 w-4" />Edit Flow</DropdownMenuItem>
            <DropdownMenuItem><RefreshCw className="mr-2 h-4 w-4" />Re-run Flow</DropdownMenuItem>
            <DropdownMenuItem className="text-red-500"><Trash2 className="mr-2 h-4 w-4" />Delete Flow</DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
);
